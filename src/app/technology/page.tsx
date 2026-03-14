import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getFeaturedImage, getAuthor, getPrimaryCategory, getCategorySlug, stripHtml, formatDate, estimateReadTime } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Technology News - Latest AI, Apple & Cybersecurity Updates | Newstrendey",
  description: "Stay ahead with data-driven analysis on ChatGPT developments, iPhone news, and the latest Google AI breakthroughs.",
};

export default async function TechnologyPage() {
  const currentPage = 1;

  let posts: any[] = [];
  let total = 0;
  let totalPages = 1;
  let error = null;

  try {
    // 24 is the technology category ID
    ({ posts, total, totalPages } = await getPosts({ page: currentPage, categoryId: 24, perPage: 10 }));
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
      {/* Hero */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 rounded-xl overflow-hidden shadow-sm">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-block px-3 py-1 bg-[#1a1a1a]/10 text-[#1a1a1a] dark:text-white text-xs font-bold uppercase tracking-widest rounded-full w-fit">
              Technology
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-slate-900 dark:text-white tracking-tight">
              Latest Tech News, AI Updates &amp; Startup Insights
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Stay ahead with data-driven analysis on developments, gadget news, and the latest tech breakthroughs. Our expert insights keep you informed on the tech that matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/20 transition-all"
                />
              </div>
              <button className="bg-[#1a1a1a] text-white font-bold px-8 py-3 rounded hover:bg-slate-800 transition-colors">
                Get Insights
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div
              className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCejDHvhHpftyJ8mkBjdUpvjX87T4TbceCPrbhKLMWxNTHJ056nvd8yWMgzmL4Zz2X8BULfCa5K87NeBgvw6mgTAwglehVOocX_zIujxsqp2L0iXbTnGi4A6UxHug8FnaJ7K9XA169zVByLzrXKJLxo1LzzyFwVzV8KfM61Wcs-5V8b8WEJusuijty7vws57sn9YT5R0PboYFjjU96KtRdFuygCP-RIalNUDSDrARYrZeFpae9EXSOJUKnBPkmH4oUOZgTJLZpo7IbI')",
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Articles */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="flex items-center justify-between mb-6 border-b-2 border-[#1a1a1a] dark:border-white pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 uppercase tracking-tight">
              Technology News
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
             {error ? "" : `Page ${currentPage} of ${totalPages}`}
            </p>
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
                article
              </span>
              <p className="text-slate-500 font-medium">No technology articles found.</p>
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
        <aside className="lg:col-span-4 space-y-8">
          {/* Trending Topics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-bold mb-4 uppercase tracking-widest text-slate-400">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {["#AI", "#Innovation", "#Startups", "#Gadgets", "#Software"].map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium hover:border-[#1a1a1a] transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-[#1a1a1a] text-white rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold mb-4">Stay Ahead of the Curve</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Join enthusiasts receiving our weekly deep dive into the technology shaping our future.
            </p>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-800 border-none rounded mb-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-white px-4 py-3"
            />
            <button className="w-full py-3 bg-white text-[#1a1a1a] font-bold rounded hover:bg-slate-100 transition-colors">
              Join Newsletter
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
