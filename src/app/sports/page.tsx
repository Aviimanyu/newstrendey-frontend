import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getFeaturedImage, getAuthor, getPrimaryCategory, getCategorySlug, stripHtml, formatDate, estimateReadTime } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Sports News USA - NFL, NBA & Soccer Highlights | Newstrendey",
  description: "Stay ahead with real-time NBA news, NFL updates, and the most thrilling sports highlights across the globe.",
};

export default async function SportsPage() {
  const currentPage = 1;

  let posts: any[] = [];
  let total = 0;
  let totalPages = 1;
  let error = null;

  try {
    // 15 is the Sports category ID
    ({ posts, total, totalPages } = await getPosts({ page: currentPage, categoryId: 15, perPage: 10 }));
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 px-4 md:px-10 py-8">
      {/* Sidebar: Live Scores */}
      <aside className="w-full lg:w-72 order-2 lg:order-1">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sticky top-24">
          {/* Trending sidebar links */}
          <div className="mt-8">
            <h4 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Trending Now</h4>
            <ul className="flex flex-col gap-3">
              {[
                { icon: "local_fire_department", label: "NBA news" },
                { icon: "trending_up", label: "NFL updates" },
                { icon: "play_circle", label: "Sports highlights" },
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium hover:text-[#1a1a1a] dark:hover:text-white">
                    <span className="material-symbols-outlined text-[#1a1a1a] dark:text-white text-lg">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 order-1 lg:order-2 flex flex-col gap-10">
        {/* Hero */}
        <section
          className="relative h-[450px] w-full rounded-xl overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbEnA_yDx6FHzeB0E2MHYZxj1DUdIXzHyVbyiEiQawNLfOh9nBG7ns-kyLxOF72xcI8l6ncSws3zsvLrVy4zsnorxjlrZ2-FM6v7T-nXvRs0mVBNnHwH0VTk1d0D8wSEEWzANAoOohxWrHhyTHpB9r9u-8S8fgIl5wz9gqJtcdI_QQCgDVPMBJS0Jsmu04KufDtKzMO6fmtFacu2foG2QXPd6g5n2wPwcxa9MU7Jgzt5Wjklol4wljExr80kRWK_LBBjw_oB23Q-MU')",
            }}
          />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
            <span className="inline-block bg-[#1a1a1a] text-white text-[10px] font-black uppercase px-2 py-1 mb-4 tracking-widest">
              Sports
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tighter italic">
              Sports News USA, NFL, NBA &amp; Soccer Highlights
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Stay ahead with real-time NBA news, NFL updates, and the most thrilling sports highlights across the globe.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#1a1a1a] font-bold px-6 py-3 rounded flex items-center gap-2 hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">play_arrow</span>Watch Highlights
              </button>
              <button className="bg-transparent border border-white text-white font-bold px-6 py-3 rounded hover:bg-white/10 transition-colors">
                Read Full Story
              </button>
            </div>
          </div>
        </section>

        
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex items-center justify-between border-l-4 border-[#1a1a1a] dark:border-white pl-4">
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Latest Sports News</h2>
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
              sports_baseball
            </span>
            <p className="text-slate-500 font-medium">No sports articles found.</p>
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

              // Don't style the very first post differently because we already have a massive Hero.
              // We'll just style all posts in the list the same here.
              return (
                <article
                  key={post.id}
                  className="group py-8"
                  itemScope
                  itemType="https://schema.org/NewsArticle"
                >
                  <meta itemProp="datePublished" content={post.date} />
                  <meta itemProp="author" content={author} />

                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Featured Image */}
                    {image && (
                      <Link
                        href={`/${getCategorySlug(post)}/${post.slug}`}
                        className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 md:w-64 lg:w-72"
                        aria-label={`Read ${title}`}
                      >
                        <img
                          src={image}
                          alt={title}
                          itemProp="image"
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-105 aspect-[4/3]"
                          loading={index < 3 ? "eager" : "lazy"}
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
                        className="font-black leading-tight mb-3 group-hover:text-[#1a1a1a]/70 dark:group-hover:text-white/70 transition-colors text-xl md:text-2xl"
                      >
                        <Link href={`/${getCategorySlug(post)}/${post.slug}`}>{title}</Link>
                      </h2>

                      {/* Excerpt */}
                      <p
                        className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 text-sm line-clamp-2"
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
    </div>
  );
}
