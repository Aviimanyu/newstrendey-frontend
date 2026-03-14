/**
 * WordPress REST API utility for Newstrendey
 *
 * How to use:
 *  1. Set NEXT_PUBLIC_WP_API_URL in .env.local to your WordPress site URL.
 *     Example: https://your-site.com/wp-json
 *  2. Enable pretty permalinks in WordPress: Settings → Permalinks → Post name
 *  3. Create categories in WordPress matching the slugs used on this site:
 *     technology, sports, entertainment, automobile
 */

const WP_API = process.env.NEXT_PUBLIC_WP_API_URL ?? "";

// ──────────────────────────────────────────────
// TypeScript interfaces matching the WP REST API
// ──────────────────────────────────────────────

export interface WPPost {
  id: number;
  slug: string;
  status: string;
  link: string;
  date: string;
  date_gmt: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  /** Embedded data (when ?_embed=1 is used) */
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          large?: { source_url: string };
          medium_large?: { source_url: string };
          medium?: { source_url: string };
        };
      };
    }[];
    author?: {
      name: string;
      avatar_urls?: Record<string, string>;
    }[];
    "wp:term"?: {
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }[][];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/** Strip HTML tags from WP rendered content / excerpt */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, (m) => {
    const map: Record<string, string> = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
      "&nbsp;": " ",
      "&rsquo;": "'",
      "&lsquo;": "'",
      "&rdquo;": '"',
      "&ldquo;": '"',
    };
    return map[m] ?? m;
  });
}

/** Get the best available featured image URL from a WP post */
export function getFeaturedImage(post: WPPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return (
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium_large?.source_url ??
    media.media_details?.sizes?.medium?.source_url ??
    media.source_url
  );
}

/** Get the author name from a WP post */
export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? "Newstrendey Staff";
}

/** Get category names from a WP post */
export function getCategories(post: WPPost): string[] {
  const terms = post._embedded?.["wp:term"] ?? [];
  return terms
    .flat()
    .filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized")
    .map((t) => stripHtml(t.name));
}

/** Get the primary category slug from a WP post */
export function getCategorySlug(post: WPPost): string {
  const terms = post._embedded?.["wp:term"] ?? [];
  const category = terms
    .flat()
    .find((t) => t.taxonomy === "category" && t.slug !== "uncategorized");
  const slug = category?.slug || "news";
  return slug === "automobile" ? "autos" : slug;
}

/** Format a WP date string to a readable form */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Estimate reading time from HTML content */
export function readingTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// ──────────────────────────────────────────────
// API fetchers
// ──────────────────────────────────────────────

/**
 * Fetch the latest posts from WordPress.
 * @param count  Number of posts to fetch (default 6)
 */
export async function getLatestPosts(count = 6): Promise<WPPost[]> {
  if (!WP_API) return [];
  try {
    const res = await fetch(
      `${WP_API}/wp/v2/posts?per_page=${count}&_embed=1&status=publish`,
      { next: { revalidate: 60 } } // ISR: revalidate every 60 seconds
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Fetch posts filtered by category slug.
 * Resolves the category slug → ID first, then fetches posts.
 * @param slug  WordPress category slug (e.g. "technology")
 * @param count Number of posts to fetch (default 6)
 */
export async function getPostsByCategory(slug: string, count = 6): Promise<WPPost[]> {
  if (!WP_API) return [];
  try {
    // Step 1: resolve slug to category ID
    const catRes = await fetch(
      `${WP_API}/wp/v2/categories?slug=${slug}&_fields=id`,
      { next: { revalidate: 300 } }
    );
    if (!catRes.ok) return [];
    const cats: { id: number }[] = await catRes.json();
    if (!cats.length) return [];

    // Step 2: fetch posts for that category
    const res = await fetch(
      `${WP_API}/wp/v2/posts?categories=${cats[0].id}&per_page=${count}&_embed=1&status=publish`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Fetch a single post by its slug.
 * @param slug  The URL-friendly slug of the post (e.g. "my-post-title")
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_API) return null;
  try {
    const res = await fetch(
      `${WP_API}/wp/v2/posts?slug=${slug}&_embed=1&status=publish`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch all WordPress categories.
 */
export async function getAllCategories(): Promise<WPCategory[]> {
  if (!WP_API) return [];
  try {
    const res = await fetch(
      `${WP_API}/wp/v2/categories?per_page=100&hide_empty=true`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Fetch all post slugs — used for generateStaticParams in dynamic routes.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!WP_API) return [];
  try {
    const res = await fetch(
      `${WP_API}/wp/v2/posts?per_page=100&_fields=slug&status=publish`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const posts: { slug: string }[] = await res.json();
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}
