import Link from "next/link";

const WP_API = "https://yadavnews.in/wp-json/wp/v2";

function stripHtml(html: string) {
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

export default async function BreakingNewsTicker() {
  let articles: any[] = [];
  try {
    const res = await fetch(
      `${WP_API}/posts?per_page=5&_embed=1&status=publish`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) {
      const posts = await res.json();
      articles = posts.filter((p: any) => !p.slug.includes("hello-world"));
    }
  } catch (err) {
    console.error("Error fetching breaking news:", err);
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center gap-4">
        <span className="flex items-center gap-1 text-xs font-black uppercase tracking-widest bg-red-600 text-white px-2 py-0.5 rounded shrink-0 z-10 relative">
          <span className="material-symbols-outlined text-sm">bolt</span>
          Breaking
        </span>
        <div className="flex-1 overflow-hidden relative display-flex">
          <p className="text-sm font-medium whitespace-nowrap animate-[ticker_30s_linear_infinite] flex items-center inline-block">
            {articles.length > 0 ? (
              // Use duplicate elements to ensure sufficient length for the ticker animation if needed or just display the current ones separated by ` | `
              articles.map((post: any, i) => (
                <span key={`${post.id}-${i}`} className="inline-flex items-center">
                  <Link href={`/article/${post.slug}`} className="hover:underline">
                    {stripHtml(post.title?.rendered ?? "")}
                  </Link>
                  {i < articles.length - 1 && <span className="mx-3 opacity-50">|</span>}
                </span>
              ))
            ) : (
              <span>No breaking news available right now.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
