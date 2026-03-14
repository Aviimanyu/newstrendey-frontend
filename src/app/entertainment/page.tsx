import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getFeaturedImage, getAuthor, getPrimaryCategory, getCategorySlug, stripHtml, formatDate, estimateReadTime } from "@/lib/wp";
import { CELEBRITIES, Celebrity } from "@/lib/celebs";

export const metadata: Metadata = {
  title: "Entertainment News | Hollywood Updates & Celebrity Trends | Newstrendey",
  description: "Your ultimate source for Hollywood movies, Oscar 2026 insights, and the latest Netflix series.",
};

export default async function EntertainmentPage() {
  const currentPage = 1;

  let posts: any[] = [];
  let total = 0;
  let totalPages = 1;
  let error = null;

  try {
    // 3 is the Entertainment category ID
    ({ posts, total, totalPages } = await getPosts({ page: currentPage, categoryId: 3, perPage: 10 }));
  } catch (err: any) {
    error = err.message;
  }

  // Dynamic Celebrity Detection
  const allContentText = posts.map(p => 
    (p.title?.rendered + " " + p.excerpt?.rendered + " " + p.content?.rendered).toLowerCase()
  ).join(" ");

  const detectedCelebs = CELEBRITIES.filter(celeb => 
    allContentText.includes(celeb.name.toLowerCase())
  );

  // If no specific celebs detected, show default trending ones but prioritize mentions
  const sidebarCelebs = detectedCelebs.length > 0 
    ? [...detectedCelebs, ...CELEBRITIES.filter(c => !detectedCelebs.includes(c))].slice(0, 4)
    : CELEBRITIES.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full">
        <div
          className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_J3U7DC5XtZwblUm3DavPsOcGQi_u4LLo7P-HGAJ3Ym7ZmvYl0fMXsE5SVPtaCRN4lf5mVlEGeJYH97FeYW0gczyCGXxGlCCeTL90x1XU6U_rr_NOlTt7X_mrpyMhHcvySSY60tmbSZOpbpto_pvFHVglVVroaPf17of04Ww56Pw9eiwm_o7JMlzGrZ-AjDzDzyY_21DEX5o5tqhWTvfa3K0SHo6VsSmqnzmmQgwXsApEqSpmlGUdKwWjZVpeKdzpJYyuqqTB8-2')",
          }}
        >
          <div className="max-w-4xl px-4 text-center">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-4">
              Entertainment News, Hollywood Updates &amp; Celebrity Trends
            </h1>
            <p className="text-slate-200 text-lg md:text-xl font-medium mb-8">
              Your ultimate source for Hollywood movies, Oscar 2026 insights, and the latest Netflix series.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] px-8 py-3 rounded-lg font-bold text-base hover:bg-transparent hover:text-white transition-all">
                Trending Now
              </button>
              <button className="bg-white text-[#1a1a1a] px-8 py-3 rounded-lg font-bold text-base hover:bg-slate-100 transition-all">
                Oscar 2026 Tracker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] dark:border-white pb-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">Entertainment</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                {error ? "" : `Page ${currentPage} of ${totalPages}`}
                </p>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="py-12 text-center text-red-500">
                <p>Failed to load articles: {error}</p>
              </div>
            )}

            {/* No Posts */}
            {!error && posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
                <span className="material-symbols-outlined text-5xl text-slate-300">
                  movie
                </span>
                <p className="text-slate-500 font-medium">No entertainment articles found.</p>
              </div>
            )}

            {/* Dynamic Post Feed */}
            {!error && posts.length > 0 && (
               <div className="space-y-0 divide-y divide-slate-200 dark:divide-slate-800">
               {posts.map((post, index) => {
                 const image = getFeaturedImage(post);
                 const author = getAuthor(post);
                 const category = getPrimaryCategory(post);
                 const title = stripHtml(post.title?.rendered ?? "");
                 const excerpt = stripHtml(post.excerpt?.rendered ?? "");
                 const date = formatDate(post.date);
                 const readTime = estimateReadTime(post.content?.rendered);
                 const isFeature = index === 0 && currentPage === 1;

                 return (
                   <article
                     key={post.id}
                     className={`group py-8 ${isFeature ? "pb-10" : ""}`}
                     itemScope
                     itemType="https://schema.org/NewsArticle"
                   >
                     <meta itemProp="datePublished" content={post.date} />
                     <meta itemProp="author" content={author} />

                     <div
                       className={`flex flex-col gap-6 ${
                         isFeature
                           ? "md:flex-col"
                           : "md:flex-row md:items-start"
                       }`}
                     >
                       {/* Featured Image */}
                       {image && (
                         <Link
                           href={`/${getCategorySlug(post)}/${post.slug}`}
                           className={`overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 ${
                             isFeature
                               ? "w-full"
                               : "md:w-64 lg:w-72"
                           }`}
                           aria-label={`Read ${title}`}
                         >
                           <img
                             src={image}
                             alt={title}
                             itemProp="image"
                             className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                               isFeature ? "aspect-video" : "aspect-[4/3]"
                             }`}
                             loading={index < 2 ? "eager" : "lazy"}
                           />
                         </Link>
                       )}

                       {/* Text Content */}
                       <div className="flex-1 min-w-0">
                         {/* Category + Meta */}
                         <div className="flex items-center flex-wrap gap-3 mb-3">
                           {category && (
                             <span className="text-xs font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                               {category}
                             </span>
                           )}
                           <span className="text-xs text-slate-400 font-medium">{date}</span>
                           <span className="text-xs text-slate-400">·</span>
                           <span className="text-xs text-slate-400 font-medium">
                             {readTime} min read
                           </span>
                         </div>

                         {/* Title */}
                         <h2
                           itemProp="headline"
                           className={`font-black leading-tight mb-3 group-hover:text-[#1a1a1a]/70 dark:group-hover:text-white/70 transition-colors ${
                             isFeature
                               ? "text-3xl md:text-4xl"
                               : "text-xl md:text-2xl"
                           }`}
                         >
                           <Link href={`/${getCategorySlug(post)}/${post.slug}`}>{title}</Link>
                         </h2>

                         {/* Excerpt */}
                         <p
                           className={`text-slate-600 dark:text-slate-400 leading-relaxed mb-4 ${
                             isFeature ? "text-base line-clamp-3" : "text-sm line-clamp-2"
                           }`}
                           itemProp="description"
                         >
                           {excerpt}
                         </p>

                         {/* Footer: Author + Read More */}
                         <div className="flex items-center justify-between flex-wrap gap-3">
                           <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                             <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                               <span className="material-symbols-outlined text-xs">person</span>
                             </span>
                             <span itemProp="author">{author}</span>
                           </div>

                           <Link
                             href={`/${getCategorySlug(post)}/${post.slug}`}
                             className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a1a1a] dark:text-white hover:underline"
                           >
                             Read Full Article
                             <span className="material-symbols-outlined text-sm">
                               arrow_forward
                             </span>
                           </Link>
                         </div>
                       </div>
                     </div>
                   </article>
                 );
               })}
             </div>
            )}

{/* Pagination removed for static export compatibility */}

          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8">
            {/* Trending Celebrities */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-[#1a1a1a] dark:text-white">trending_up</span>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  {detectedCelebs.length > 0 ? "Featured in Stories" : "Trending Celebrities"}
                </h3>
              </div>
              <div className="space-y-6">
                {sidebarCelebs.map((celeb, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="size-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-transparent group-hover:border-red-500 transition-all">
                      <img src={celeb.img} alt={celeb.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-none group-hover:text-red-500 transition-colors">{celeb.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{celeb.info}</p>
                    </div>
                    {detectedCelebs.includes(celeb) && (
                      <span className="ms-auto w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" title="Mentioned in article"></span>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-2 border-2 border-slate-100 dark:border-slate-800 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all">
                See More Stars
              </button>
            </div>

            {/* Newsletter */}
            <div className="bg-[#f7f7f7] dark:bg-slate-900 p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <h3 className="font-black text-xl mb-2">The Insider Daily</h3>
              <p className="text-sm text-slate-500 mb-4">Get the latest Hollywood scoops directly in your inbox.</p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full mb-3 rounded border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] bg-white dark:bg-slate-800"
              />
              <button className="w-full bg-[#1a1a1a] text-white py-3 rounded font-bold uppercase tracking-widest text-xs">
                Join 50k+ Insiders
              </button>
            </div>

            {/* Keywords */}
            <div className="p-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Trending Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {["HOLLYWOOD MOVIES", "OSCAR 2026", "NETFLIX SERIES", "BOX OFFICE", "STREAMING NEWS"].map((kw) => (
                  <span key={kw} className="bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded text-[10px] font-bold">{kw}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
