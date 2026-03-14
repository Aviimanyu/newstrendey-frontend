import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, getFeaturedImage, getAuthor, getPrimaryCategory, getCategorySlug, stripHtml, formatDate, estimateReadTime } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Latest News | Newstrendey",
  description:
    "Read the latest breaking news, top stories, and in-depth analysis from Newstrendey — powered by Yadavnews.",
  openGraph: {
    title: "Latest News | Newstrendey",
    description: "Breaking news, top stories and more.",
    type: "website",
  },
};

export default async function NewsPage() {
  // Fetch up to 4 posts from each major category to build a landing page.
  let sportsPosts: any[] = [];
  let techPosts: any[] = [];
  let entertainmentPosts: any[] = [];
  let autoPosts: any[] = [];
  let error = null;

  try {
    const [sports, tech, entertainment, auto] = await Promise.all([
      getPosts({ page: 1, categoryId: 15, perPage: 4 }),
      getPosts({ page: 1, categoryId: 24, perPage: 4 }),
      getPosts({ page: 1, categoryId: 3, perPage: 4 }),
      getPosts({ page: 1, categoryId: 28, perPage: 4 }),
    ]);

    sportsPosts = sports.posts;
    techPosts = tech.posts;
    entertainmentPosts = entertainment.posts;
    autoPosts = auto.posts;
  } catch (err: any) {
    error = err.message;
  }

  // A helper component to render a section of posts
  const Section = ({ title, posts, href, icon }: { title: string; posts: any[]; href: string; icon: string }) => {
    if (posts.length === 0) return null;

    return (
      <section className="py-10 border-b border-slate-200 dark:border-slate-800 last:border-0">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-red-600">{icon}</span>
            <h2 className="text-3xl font-black uppercase tracking-tight italic">{title}</h2>
          </div>
          <Link
            href={href}
            className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] dark:text-white hover:underline flex items-center gap-1"
          >
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const image = getFeaturedImage(post);
            const category = getPrimaryCategory(post);
            const titleText = stripHtml(post.title?.rendered ?? "");
            const date = formatDate(post.date);

            const categorySlug = getCategorySlug(post);
            return (
              <article key={post.id} className="group cursor-pointer flex flex-col gap-3">
                {image && (
                  <Link
                    href={`/${categorySlug}/${post.slug}`}
                    className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 aspect-[4/3]"
                  >
                    <img
                      src={image}
                      alt={titleText}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div>
                  {category && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2 block">
                      {category}
                    </span>
                  )}
                  <h3 className="font-bold text-lg leading-tight group-hover:text-[#1a1a1a]/70 dark:group-hover:text-white/70 transition-colors line-clamp-2">
                    <Link href={`/${categorySlug}/${post.slug}`}>{titleText}</Link>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium mt-2 block">{date}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      {/* Page Header */}
      <div className="mb-4 text-center py-10">
        <span className="material-symbols-outlined text-5xl mb-4 text-[#1a1a1a] dark:text-white">language</span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
          The Latest Headlines
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Catch up on everything you need to know today. Browse top stories from Technology, Entertainment, Sports, and Automobile.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div
          role="alert"
          className="flex flex-col items-center justify-center py-24 text-center gap-4 border-t border-slate-200 dark:border-slate-800"
        >
          <span className="material-symbols-outlined text-5xl text-red-400">
            wifi_off
          </span>
          <h2 className="text-xl font-bold">Could not load category feeds</h2>
          <p className="text-slate-500 text-sm max-w-md">
            {error}. Please check your internet connection or try again later.
          </p>
          <a
            href="/news"
            className="mt-2 inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Try Again
          </a>
        </div>
      )}

      {!error && (
        <div className="flex flex-col gap-8">
          <Section title="Entertainment" posts={entertainmentPosts} href="/entertainment" icon="movie" />
          <Section title="Technology" posts={techPosts} href="/technology" icon="memory" />
          <Section title="Sports" posts={sportsPosts} href="/sports" icon="sports_baseball" />
          <Section title="Automobile" posts={autoPosts} href="/autos" icon="directions_car" />
        </div>
      )}
    </div>
  );
}
