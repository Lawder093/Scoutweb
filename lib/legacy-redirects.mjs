export function legacyBlogRedirects(posts) {
  const redirects = new Map();
  for (const post of posts) {
    if (!post.sourceUrl || !/^[a-z0-9_-]+$/i.test(post.slug ?? "")) continue;
    try {
      const source = new URL(post.sourceUrl);
      const path = source.pathname.replace(/\/$/, "");
      if (!["escultista.org", "www.escultista.org"].includes(source.hostname)) continue;
      if (!/^\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9%-]+$/i.test(path)) continue;
      redirects.set(path, { source: path, destination: `/blog/${post.slug}`, permanent: true });
    } catch { /* Ignore invalid historical metadata, never redirect to a third party. */ }
  }
  return [...redirects.values()];
}
