import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Execute the actual handlers with isolated service doubles: no network,
// credentials, real users, email, or database writes are involved.
function load(file, imports, globals = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const require = (name) => {
    if (name === "next/server") return { NextResponse: { json: (value, init) => Response.json(value, init) } };
    if (name === "server-only") return {};
    if (name in imports) return imports[name];
    throw new Error(`Unexpected import ${name}`);
  };
  new Function("require", "module", "exports", ...Object.keys(globals), code)(require, module, module.exports, ...Object.values(globals));
  return module.exports;
}

test("both legacy OTP endpoints deny access before reading a phone or database outside prototype", async () => {
  for (const endpoint of ["request-code", "verify-code"]) {
    const route = load(`app/api/conecta/auth/${endpoint}/route.ts`, {
      "@/lib/auth/conecta": { getConectaOtpMode: () => "whatsapp" },
      "@/lib/supabase/admin": { createSupabaseAdminClient: () => { throw new Error("Database must not be accessed"); } },
    });
    const response = await route.POST(new Request("https://qa.invalid", { method: "POST", body: "{}" }));
    assert.equal(response.status, 410);
    assert.ok(!(await response.text()).includes("prototypeCode"));
  }
});

test("email delivery failure is returned as a warning, not an exception", async () => {
  const email = load("lib/email/postcard-notification.ts", {}, {
    process: { env: { RESEND_API_KEY: "test-only", POSTCARD_FROM_EMAIL: "qa@example.invalid" } },
    fetch: async () => { throw new Error("Simulated timeout"); },
    console: { error() {}, warn() {} },
  });
  assert.deepEqual(await email.notifyPostcardSubmission({ id: "test", authorName: "QA", countryName: "QA", groupName: "QA", message: "Test" }), { sent: false, reason: "email_delivery_failed" });
});

test("postcard cover URLs are short-lived and respect the remaining publication time", async () => {
  const calls = [];
  const storage = load("lib/content/conecta-storage.ts", {});
  const client = { storage: { from: (bucket) => ({ createSignedUrl: async (path, ttl) => {
    calls.push({ bucket, path, ttl });
    return { data: { signedUrl: "https://example.invalid/signed" }, error: null };
  } }) } };
  assert.equal(await storage.resolvePostcardAssetUrl(client, "postcards/test.webp", 40), "https://example.invalid/signed");
  await storage.resolvePostcardAssetUrl(client, "postcards/test.webp", 99999);
  assert.deepEqual(calls.map(c => c.ttl), [40, 600]);
  assert.equal(await storage.resolvePostcardAssetUrl(client, "https://example.invalid/public.jpg"), null);
  assert.equal(calls.length, 2);
});

test("creating an existing panel user does not change their password", async () => {
  let changed = false;
  const route = load("app/api/admin/users/route.ts", {
    "@/lib/auth/admin": { getContentOwner: async () => ({ id: "owner" }), isContentAdminEmail: () => false },
    "@/lib/supabase/admin": { createSupabaseAdminClient: () => ({
      from: () => ({ select: () => ({ limit: async () => ({ error: null }) }) }),
      auth: { admin: {
        listUsers: async () => ({ data: { users: [{ id: "existing", email: "qa@example.invalid" }] }, error: null }),
        updateUserById: async () => { changed = true; },
      } },
    }) },
  });
  const response = await route.POST(new Request("https://qa.invalid", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "qa@example.invalid", password: "test-only-password", permissions: { blog: true } }) }));
  assert.equal(response.status, 409);
  assert.equal(changed, false);
});

test("a missing permissions table fails before any Auth account creation", async () => {
  const route = load("app/api/admin/users/route.ts", {
    "@/lib/auth/admin": { getContentOwner: async () => ({ id: "owner" }), isContentAdminEmail: () => false },
    "@/lib/supabase/admin": { createSupabaseAdminClient: () => ({ from: () => ({ select: () => ({ limit: async () => ({ error: { code: "42P01" } }) }) }) }) },
  });
  const response = await route.POST(new Request("https://qa.invalid", { method: "POST", body: JSON.stringify({ email: "qa@example.invalid", password: "test-only-password", permissions: { blog: true } }) }));
  assert.equal(response.status, 503);
});

test("a postcard cannot be approved twice or silently renew its expiry", async () => {
  const filters = [];
  const query = {
    eq(key, value) { filters.push([key, value]); return this; },
    select() { return this; },
    async maybeSingle() { return { data: null, error: null }; },
  };
  const route = load("app/api/admin/conecta-postcards/route.ts", {
    "@/lib/auth/admin": { getContentPermission: async () => ({ id: "moderator" }) },
    "@/lib/content/conecta-storage": {},
    "@/lib/content/repositories/postcards": {},
    "@/lib/supabase/admin": { createSupabaseAdminClient: () => ({ from: () => ({ update: () => query }) }) },
  });
  const response = await route.PATCH(new Request("https://qa.invalid", { method: "PATCH", body: JSON.stringify({ id: "reviewed-postcard", action: "approve" }) }));
  assert.equal(response.status, 409);
  assert.deepEqual(filters, [["id", "reviewed-postcard"], ["status", "pending"]]);
});
