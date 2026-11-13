import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { safeNextPath } from "../lib/auth/redirect.ts";
import { sanitizeHtml } from "../lib/content/sanitize.ts";
import { legacyBlogRedirects } from "../lib/legacy-redirects.mjs";

test("all migrated WordPress article URLs redirect to their matching local article", () => {
  const posts = JSON.parse(readFileSync("content/blog/posts-summary.json", "utf8"));
  const redirects = legacyBlogRedirects(posts);
  assert.equal(redirects.length, posts.length);
  for (const post of posts) {
    assert.equal(redirects.find((redirect) => redirect.source === new URL(post.sourceUrl).pathname.replace(/\/$/, ""))?.destination, `/blog/${post.slug}`);
  }
  assert.deepEqual(legacyBlogRedirects([{ sourceUrl: "https://example.org/2026/01/01/test", slug: "test" }]), []);
});

test("WordPress article bodies cannot add a second H1 or executable markup", () => {
  const html = sanitizeHtml('<h1 class="wp-title">Título</h1><script>alert(1)</script><img src="https://example.org/photo.jpg" onerror="alert(1)">');
  assert.ok(!/<h1|<script|onerror/i.test(html));
  assert.match(html, /<h2 class="wp-title">Título<\/h2>/);
  assert.ok(html.includes('src="https://example.org/photo.jpg"'));
});

test("login preserves internal destinations and rejects external redirects", () => {
  assert.equal(safeNextPath("/admin/blog?draft=123#editor"), "/admin/blog?draft=123#editor");
  for (const value of [null, "", "https://example.org", "//example.org", "/\\example.org", "/\n/example.org", "javascript:alert(1)"]) {
    assert.equal(safeNextPath(value), "/admin/blog");
    assert.equal(safeNextPath(value, "/admin"), "/admin");
  }
});

test("production CSP allows only our public PDF bucket and retains protections", async () => {
  process.env.NODE_ENV = "production";
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://qa-project.supabase.co";
  const { default: config } = await import("../next.config.mjs?qa-valid");
  const [{ headers }] = await config.headers();
  const csp = headers.find((header) => header.key === "Content-Security-Policy").value;
  assert.ok(csp.includes("https://qa-project.supabase.co/storage/v1/object/public/content-assets/"));
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.ok(csp.includes("object-src 'none'"));
  assert.ok(!csp.includes("'unsafe-eval'"));
  assert.equal(headers.find((header) => header.key === "X-Frame-Options").value, "DENY");
  const redirects = await config.redirects();
  assert.equal(redirects.find((entry) => entry.source === "/asociacion").destination, "/#proposito");
  assert.equal(redirects.find((entry) => entry.source === "/historia").destination, "/#historia");
  assert.equal(redirects.find((entry) => entry.source === "/escultismo").destination, "/cde/mexico");
  process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:54321";
  const invalid = await import("../next.config.mjs?qa-invalid");
  assert.ok(!(await invalid.default.headers())[0].headers.some((header) => header.value.includes("localhost")));
});

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(join(dir, entry.name)) : entry.name.endsWith(".tsx") ? [join(dir, entry.name)] : []);
}

test("every main landmark can receive the skip-link focus", () => {
  let count = 0;
  for (const file of [...files("app"), ...files("components")]) {
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node) => {
      if (ts.isJsxOpeningElement(node) && node.tagName.getText(source) === "main") {
        count++;
        const attributes = node.attributes.getText(source);
        assert.match(attributes, /id="contenido-principal"/, file);
        assert.match(attributes, /tabIndex=\{-1\}/, file);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  assert.ok(count > 20);
});

test("homepage preserves requested order and excludes the removed Instagram section", () => {
  const home = readFileSync("app/page.tsx", "utf8");
  assert.match(home, /<Hero\s*\/>\s*<CoroEsperanza\s*\/>\s*<FoundationOverview\s*\/>/);
  assert.ok(home.includes("<PostcardSection"));
  assert.ok(!home.includes("InstagramSection"));
  assert.ok(home.includes("<FoundationContent />"));
});

test("previous homepage presentation keeps current content without the removed captions", () => {
  const hero = readFileSync("components/hero.tsx", "utf8");
  const choir = readFileSync("components/coro-esperanza.tsx", "utf8");
  for (const caption of [
    "Asociación civil sin fines de lucro · Puebla, México",
    "El acompañamiento empieza por estar presentes",
    "Educación que abre oportunidades",
    "Cultura que nos reúne",
    "Solidaridad que se convierte en acción",
    "Voces, guitarras y un espacio para encontrarnos",
  ]) assert.ok(!(hero + choir).includes(caption), caption);
  assert.ok(hero.includes("Acompañamos a niños, jóvenes y comunidades a través de la educación, la cultura y la solidaridad. Porque crecer también significa tener oportunidades, participar y contar con los demás."));
  assert.ok(choir.includes("Beneficiando a las juventudes a través de la música, la expresión y el encuentro."));
  assert.ok(choir.includes("El coro es un espacio para aprender a escucharnos, compartir lo que sentimos y construir confianza. Cada ensayo reúne voces distintas y nos recuerda que podemos crear algo juntos."));
  assert.ok(hero.includes('href="/donacion"') && hero.includes('href="#asociacion"'));
  assert.ok(choir.includes('href="/contacto"'));
  assert.ok(hero.includes('data-glass-tone="dark"') && hero.includes('sizes="100vw"'));
  assert.ok(choir.includes("bg-secondary") && choir.includes("object-contain"));
});

test("association work areas expose one semantic icon without changing their copy", () => {
  const page = readFileSync("components/foundation-page.tsx", "utf8");
  for (const icon of ["BookOpen", "HeartHandshake", "HeartPulse", "Music2", "ShieldCheck", "Leaf"]) {
    assert.match(page, new RegExp(`\\b${icon}\\b`));
  }
  for (const title of ["Educación y desarrollo", "Asistencia social", "Salud y bienestar", "Cultura y comunidad", "Derechos y protección", "Territorio y ambiente"]) {
    assert.match(page, new RegExp(title));
  }
});
