import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getFeaturedImage, getAuthor, getPrimaryCategory, getCategorySlug, stripHtml, formatDate, estimateReadTime } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Latest Automobile News USA & Industry Trends | Newstrendey",
  description: "Stay updated with the latest in electric cars, Tesla news, and Ford truck developments. Expert analysis on the future of mobility.",
};

export default async function AutomobilePage() {
  const currentPage = 1;

  let posts: any[] = [];
  let total = 0;
  let totalPages = 1;
  let error = null;

  try {
    // 28 is the Automobile category ID
    ({ posts, total, totalPages } = await getPosts({ page: currentPage, categoryId: 28, perPage: 10 }));
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div>
      {/* Hero */}
      <section>
        <div className="p-0 md:p-6 lg:px-10">
          <div
            className="flex min-h-[500px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-none md:rounded-xl items-start justify-end px-6 pb-12 md:px-12 relative overflow-hidden group"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMPtJ1jNZJtJwN2-UpAiwLGW61GQIRdwelz8YPML6vVgZQ6YzwciDaJBFcMqwBTBEkk9K0S7QDx-1ksaDsrSiuVst9MyR3txofCEOyu2tJQShwrpvPUXmJLvhyNQ-CZJryKuQDBOfdQu_-RKhYmjC1yWadQvgBGHjxlfNcKS010m8Sq1vv9HnB81EvgTonK2ABhfPLqZndspJOfvO_uODawGXElouSTwz5CNHoqk28vjs4V64VqEXsKYCBXg1yIphpjW1E7WtIECKt')",
            }}
          >
            <div className="flex flex-col gap-4 text-left max-w-3xl relative z-10">
              <span className="bg-[#1a1a1a] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded w-fit">
                Automobile
              </span>
              <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Latest Automobile News USA &amp; Industry Trends
              </h1>
              <p className="text-slate-200 text-lg font-normal leading-relaxed">
                Stay updated with the latest in auto industry news, vehicle developments, and new launches. Expert analysis
                on the future of mobility.
              </p>
              <div className="flex gap-4 mt-2">
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded h-12 px-6 bg-white text-[#1a1a1a] text-base font-bold leading-normal hover:bg-slate-100 transition-all">
                  Read Latest News
                </button>
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded h-12 px-6 bg-transparent border-2 border-white text-white text-base font-bold leading-normal hover:bg-white/10 transition-all">
                  Watch Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="px-4 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center justify-between border-l-4 border-[#1a1a1a] dark:border-white pl-4">
              <h2 className="text-2xl font-black tracking-tight">Automobile News</h2>
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
                directions_car
              </span>
              <p className="text-slate-500 font-medium">No automobile articles found.</p>
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
                             isFeature ? "aspect-[21/9] md:aspect-[3/1]" : "aspect-[4/3]"
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
        <aside className="lg:col-span-4 flex flex-col gap-8">
          {/* Top 5 SUVs */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="mb-6">
              <h2 className="text-xl font-black tracking-tight">Top 5 SUVs of 2026</h2>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">Expert Rankings</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4 px-4 py-3 rounded bg-[#1a1a1a] text-white shadow-lg">
                <span className="text-lg font-black opacity-50 italic">01</span>
                <span className="material-symbols-outlined">car_repair</span>
                <p className="text-sm font-bold flex-1">Range Rover Sport</p>
                <span className="material-symbols-outlined text-sm">stars</span>
              </div>
              {[
                { rank: "02", icon: "directions_car", name: "Porsche Cayenne" },
                { rank: "03", icon: "bolt", name: "Tesla Model X" },
                { rank: "04", icon: "door_front", name: "Ford Expedition" },
                { rank: "05", icon: "commute", name: "Chevrolet Tahoe" },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-4 px-4 py-3 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                >
                  <span className="text-lg font-black text-slate-300 italic group-hover:text-[#1a1a1a] dark:group-hover:text-white transition-colors">
                    {item.rank}
                  </span>
                  <span className="material-symbols-outlined text-slate-400">{item.icon}</span>
                  <p className="text-sm font-medium flex-1">{item.name}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-200 dark:border-slate-700 rounded text-sm font-bold uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              See Full List
            </button>
          </div>

          {/* Newsletter */}
          <div className="bg-[#1a1a1a] p-8 rounded-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-4 block">mail</span>
              <h3 className="text-xl font-bold mb-2">Morning Transmission</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Join 50k+ auto enthusiasts. The day&apos;s most important car news in a 3-minute read.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 h-12 px-4"
                />
                <button className="bg-white text-[#1a1a1a] h-12 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-colors">
                  Join Now
                </button>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-10">
              <span className="material-symbols-outlined text-[160px]">electric_car</span>
            </div>
          </div>

          {/* Ad placeholder */}
          <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Advertisement</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
