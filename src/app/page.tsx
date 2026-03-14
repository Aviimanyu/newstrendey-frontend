import Link from "next/link";
import {
  getLatestPosts,
  getFeaturedImage,
  getAuthorName,
  getCategories,
  getCategorySlug,
  stripHtml,
  formatDate,
  readingTime,
} from "@/lib/wordpress";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// ─── Static Stitch-design hero cards (unchanged) ──────────────────────────────
const heroCards = [
  {
    position: "main",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmyKnq1o9dK0E5d5PyqI7W1YV__920IIWo1oC8MsiKHthKccrag_G4SEogCoZ6HgygaxzGkkJvJzG226wLbaXcuhIIsFDKBQWp7pY_wmW9kDmU72aSxnFOu1-OJJybDTlu-dPuQax7FDLcQgem_b1EV-mWaNd5QahbIwjYYrrr9yRkXiTo5-VMJqgV_FUPqOkGHLJJ5dMtJf7DsZXPwFj3ed6aUm-SDJBFpZfG6F4_KuRcUDc4KTwazwXxR11GufG4A_k6PCBf31M8",
    tag: "Technology",
    tagColor: "bg-[#1a1a1a]",
    title: "The Quantum Leap: Why Silicon Valley is Betting on Atoms",
    excerpt: "How the next generation of computing is reshaping global encryption and pharmaceuticals.",
    author: "Sarah Chen",
    readTime: "8 min read",
  },
];

export default async function HomePage() {
  // Fetch live WordPress posts — fetching more to supply hero and sidebar
  const rawPosts = await getLatestPosts(15);
  // Filter out the default "Hello world!" post
  const wpPosts = rawPosts.filter((p) => p.slug !== "hello-world" && p.slug !== "hello-world-2");
  const hasWpPosts = wpPosts.length > 0;

  // Distribute posts
  const heroPosts = wpPosts.slice(0, 4);
  const feedPosts = wpPosts.slice(4, 10);
  const sidebarPosts = wpPosts.slice(10, 15);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
      {/* WordPress Connection Notice */}
      {!hasWpPosts && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg text-sm text-amber-800 dark:text-amber-200">
          <strong>No WordPress posts found.</strong> Make sure your site has published posts other than "Hello world!".
        </div>
      )}

      {/* Hero Bento Grid - Only show if we have at least 1 post for it */}
      {heroPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] mb-12">
          {/* Main Feature */}
          {heroPosts[0] && (() => {
            const p = heroPosts[0];
            const image = getFeaturedImage(p) || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop";
            const categorySlug = getCategorySlug(p);
            return (
              <Link href={`/${categorySlug}/${p.slug}`} className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-xl block">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%), url('${image}')`,
                  }}
                />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#1a1a1a] px-3 py-1 mb-4 inline-block">
                    {getCategories(p)[0] || "Featured"}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                    {stripHtml(p.title.rendered)}
                  </h2>
                  <p className="text-slate-200 text-sm md:text-base max-w-lg mb-4 line-clamp-2">
                    {stripHtml(p.excerpt.rendered)}
                  </p>
                  <div className="flex items-center gap-3 text-slate-300 text-xs">
                    <span className="font-bold">By {getAuthorName(p)}</span>
                    <span>•</span>
                    <span>{readingTime(p.content.rendered)}</span>
                  </div>
                </div>
              </Link>
            );
          })()}

          {/* Secondary Story */}
          {heroPosts[1] && (() => {
            const p = heroPosts[1];
            const image = getFeaturedImage(p) || "https://images.unsplash.com/photo-1495020632541-8defc80ce528?q=80&w=2071&auto=format&fit=crop";
            const categorySlug = getCategorySlug(p);
            return (
              <Link href={`/${categorySlug}/${p.slug}`} className="md:col-span-2 relative group cursor-pointer overflow-hidden rounded-xl block">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url('${image}')`,
                  }}
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white bg-blue-600 px-3 py-1 mb-3 inline-block">
                    {getCategories(p)[0] || "News"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                    {stripHtml(p.title.rendered)}
                  </h3>
                </div>
              </Link>
            );
          })()}

          {/* Tertiary 1 */}
          {heroPosts[2] && (() => {
            const p = heroPosts[2];
            const image = getFeaturedImage(p) || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop";
            const categorySlug = getCategorySlug(p);
            return (
              <Link href={`/${categorySlug}/${p.slug}`} className="md:col-span-1 relative group cursor-pointer overflow-hidden rounded-xl block">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url('${image}')`,
                  }}
                />
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-lg font-bold text-white leading-tight">{stripHtml(p.title.rendered)}</h4>
                </div>
              </Link>
            );
          })()}

          {/* Tertiary 2 */}
          {heroPosts[3] && (() => {
            const p = heroPosts[3];
            const image = getFeaturedImage(p) || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop";
            const categorySlug = getCategorySlug(p);
            return (
              <Link href={`/${categorySlug}/${p.slug}`} className="md:col-span-1 relative group cursor-pointer overflow-hidden rounded-xl block">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url('${image}')`,
                  }}
                />
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-lg font-bold text-white leading-tight">{stripHtml(p.title.rendered)}</h4>
                </div>
              </Link>
            );
          })()}
        </div>
      )}

      {/* Content + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Latest News Feed */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] dark:border-white pb-2 mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Latest News
            </h2>
            <Link href="/news" className="text-sm font-bold flex items-center gap-1 hover:underline">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-10">
            {feedPosts.length > 0 ? (
              feedPosts.map((post) => {
                const image = getFeaturedImage(post);
                const author = getAuthorName(post);
                const cats = getCategories(post);
                const excerpt = stripHtml(post.excerpt.rendered);
                const title = stripHtml(post.title.rendered);
                const catLabel = cats[0] ?? "News";
                const time = formatDate(post.date);
                const readTime = readingTime(post.content.rendered);

                const categorySlug = getCategorySlug(post);
                return (
                  <article key={post.id} className="flex flex-col md:flex-row gap-6 group">
                    <Link href={`/${categorySlug}/${post.slug}`} className="md:w-1/3 overflow-hidden rounded-lg bg-slate-200 shrink-0 block">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="w-full aspect-[4/3] object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                          <span className="material-symbols-outlined text-3xl text-slate-400">newspaper</span>
                        </div>
                      )}
                    </Link>
                    <div className="md:w-2/3">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                        {catLabel}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        <Link href={`/${categorySlug}/${post.slug}`}>{title}</Link>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                        {excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <span>{author}</span>
                        <span>•</span>
                        <span>{time}</span>
                        <span>•</span>
                        <span>{readTime}</span>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="text-slate-500 italic">No more recent articles to show.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-12">
          {/* Trending Now (Auto-populated from older posts) */}
          {sidebarPosts.length > 0 && (
            <div className="bg-[#1a1a1a] text-white p-6 rounded-xl">
              <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">trending_up</span> More Stories
              </h2>
              <div className="space-y-6">
                {sidebarPosts.map((item, idx) => (
                  <div key={item.id} className="flex gap-4 group">
                    <span className="text-3xl font-black text-white/30 italic">0{idx + 1}</span>
                    <div>
                      <Link href={`/${getCategorySlug(item)}/${item.slug}`}>
                        <h4 className="font-bold leading-tight group-hover:text-white/80 cursor-pointer line-clamp-2">
                          {stripHtml(item.title.rendered)}
                        </h4>
                      </Link>
                      <span className="text-[10px] uppercase font-bold text-white/50 block mt-1">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-black mb-2">The Weekly Insight</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Get our curated selection of top stories delivered to your inbox every Sunday.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white dark:bg-[#191919] border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              />
              <button
                type="submit"
                className="w-full bg-[#1a1a1a] text-white font-bold py-3 rounded-lg hover:bg-[#333] transition-all"
              >
                Sign Up
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
