const WP_API = "https://yadavnews.in/wp-json/wp/v2";

export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&hellip;/g, "…")
    .trim();
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function estimateReadTime(htmlContent: string): number {
  if (!htmlContent) return 1;
  const words = stripHtml(htmlContent).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getFeaturedImage(post: any): string | null {
  if (!post) return null;
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url ??
    null
  );
}

export function getAuthor(post: any): string {
  if (!post) return "Newstrendey Staff";
  return post._embedded?.author?.[0]?.name ?? "Newstrendey Staff";
}

export function getPrimaryCategory(post: any): string | null {
  if (!post || !post._embedded?.["wp:term"]) return null;
  const terms = post._embedded["wp:term"] ?? [];
  const category = terms
    .flat()
    .find((t: any) => t.taxonomy === "category" && t.slug !== "uncategorized");
  return category ? stripHtml(category.name) : null;
}

export function getCategorySlug(post: any): string {
  if (!post || !post._embedded?.["wp:term"]) return "news";
  const terms = post._embedded["wp:term"] ?? [];
  const category = terms
    .flat()
    .find((t: any) => t.taxonomy === "category" && t.slug !== "uncategorized");
  const slug = category?.slug || "news";
  return slug === "automobile" ? "autos" : slug;
}

export async function getPosts({
  page = 1,
  categoryId,
  perPage = 10,
  search,
}: {
  page?: number;
  categoryId?: number;
  perPage?: number;
  search?: string;
} = {}) {
  let url = `${WP_API}/posts?per_page=${perPage}&page=${page}&_embed=1&status=publish`;
  
  if (categoryId) {
    url += `&categories=${categoryId}`;
  }

  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  let posts = await res.json();
  posts = posts.filter((p: any) => !p.slug.includes("hello-world"));
  
  const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);

  return { posts, total, totalPages: totalPages === 0 ? 1 : totalPages };
}
