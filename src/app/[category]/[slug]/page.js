import Link from "next/link";
import { notFound } from "next/navigation";

const WP_API = "https://yadavnews.in/wp-json/wp/v2";

// ─── FAQ Section — auto-generated from article headings ───────────────────────

function FaqSection({ html }) {
  if (!html) return null;

  const headingRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
  const paragraphAfterRegex = /<p[^>]*>(.*?)<\/p>/i;

  const faqs = [];
  let match;
  const sections = html.split(/(?=<h[23][^>]*>)/i);

  for (const section of sections) {
    const hMatch = section.match(/<h[23][^>]*>(.*?)<\/h[23]>/i);
    if (!hMatch) continue;

    const question = hMatch[1]
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

    if (
      question.length < 10 ||
      /^faq/i.test(question) ||
      /^frequently asked/i.test(question) ||
      /^conclusion/i.test(question) ||
      /^summary/i.test(question)
    )
      continue;

    const afterHeading = section.replace(/<h[23][^>]*>.*?<\/h[23]>/i, "");
    const pMatch = afterHeading.match(paragraphAfterRegex);
    const answer = pMatch
      ? pMatch[1]
          .replace(/<[^>]*>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, " ")
          .replace(/&rsquo;/g, "'")
          .trim()
      : "";

    if (answer.length > 20) {
      faqs.push({ question, answer });
    }
  }

  if (faqs.length < 3) return null;

  return (
    <div
      className="mt-12 mb-8"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <h2 className="text-2xl font-black tracking-tight mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.slice(0, 8).map((faq, i) => (
          <details
            key={i}
            className="group border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary
              className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-sm select-none"
              itemProp="name"
            >
              <span>{faq.question}</span>
              <span className="material-symbols-outlined text-lg shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                expand_more
              </span>
            </summary>
            <div
              className="px-5 py-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-700"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <span itemProp="text">{faq.answer}</span>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html = "") {
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

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(html = "") {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getPostBySlug(slug) {
  try {
    const res = await fetch(
      `${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const posts = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryIds = [], excludeId) {
  if (!categoryIds.length) return [];
  try {
    const res = await fetch(
      `${WP_API}/posts?categories=${categoryIds[0]}&exclude=${excludeId}&per_page=3&_embed=1&status=publish`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// ─── Static params for ISR pre-rendering ─────────────────────────────────────

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${WP_API}/posts?per_page=100&_fields=slug,categories&_embed=1&status=publish`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const posts = await res.json();
    
    // We need to map categories to their slugs to generate the correct paths
    // For simplicity, we can just fetch common category slugs or assume typical mappings
    // However, to be robust, we'll just return the slugs and let Next.js handle it if possible
    // Or we stick to a more precise mapping if we had category slug data.
    // For now, let's just return slugs and maybe just generate a few known ones
    return posts.map((p) => {
      const categorySlug = p._embedded?.["wp:term"]?.[0]?.find(t => t.taxonomy === "category")?.slug || "news";
      const actualCategorySlug = categorySlug === "automobile" ? "autos" : categorySlug;
      return { 
        category: actualCategorySlug,
        slug: p.slug 
      };
    });
  } catch {
    return [];
  }
}

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found | Newstrendey" };

  const title = stripHtml(post.title?.rendered ?? "");
  const description = stripHtml(post.excerpt?.rendered ?? "").slice(0, 160);
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

  return {
    title: `${title} | Newstrendey`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function ArticlePage({ params }) {
  const { category: categoryParam, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const title = stripHtml(post.title?.rendered ?? "");
  const author = post._embedded?.author?.[0]?.name ?? "Newstrendey Staff";
  const authorAvatar = post._embedded?.author?.[0]?.avatar_urls?.["96"] ?? null;
  const date = formatDate(post.date);
  const modifiedDate = formatDate(post.modified);
  const readTime = estimateReadTime(post.content?.rendered);
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const featuredImageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || title;

  // Categories and tags from wp:term
  const terms = post._embedded?.["wp:term"] ?? [];
  const categories = terms
    .flat()
    .filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized");
  const tags = terms.flat().filter((t) => t.taxonomy === "post_tag");

  // Validate category if possible or just use it in the UI
  const primaryCategory = categories[0] || { name: "News", slug: "news" };
  const displayCategoryName = stripHtml(primaryCategory.name);
  const displayCategorySlug = primaryCategory.slug === "automobile" ? "autos" : primaryCategory.slug;

  // Related posts from the same category
  const relatedPosts = await getRelatedPosts(post.categories, post.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link 
          href={`/${displayCategorySlug}`} 
          className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors whitespace-nowrap"
        >
          {displayCategoryName}
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-bold text-[#1a1a1a] dark:text-white truncate max-w-[200px]">
          {title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article
          className="lg:col-span-8"
          itemScope
          itemType="https://schema.org/NewsArticle"
        >
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="dateModified" content={post.modified} />

          {/* Category badges */}
          {categories.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug === "automobile" ? "autos" : cat.slug}`}
                  className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {stripHtml(cat.name)}
                </Link>
              ))}
            </div>
          )}

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6"
            itemProp="headline"
          >
            {title}
          </h1>

          <div className="flex items-center flex-wrap gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {author.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-bold text-sm" itemProp="name">{author}</p>
                <p className="text-xs text-slate-500">Contributor</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <time dateTime={post.date}>{date}</time>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {readTime} min read
              </span>
            </div>
          </div>

          {featuredImage && (
            <figure className="mb-8 rounded-xl overflow-hidden">
              <img
                src={featuredImage}
                alt={featuredImageAlt}
                className="w-full object-cover max-h-[500px]"
                itemProp="image"
                loading="eager"
              />
            </figure>
          )}

          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:mb-5 prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:my-6
              prose-strong:font-black"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered ?? "" }}
            itemProp="articleBody"
          />

          <FaqSection html={post.content?.rendered ?? ""} />

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4 flex-wrap">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://newstrendey.com/${displayCategorySlug}/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-colors"
            >
              𝕏 Share on X
            </a>
          </div>
        </article>

        <aside className="lg:col-span-4 space-y-8">
          <Link
            href={`/${displayCategorySlug}`}
            className="flex items-center gap-2 text-sm font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to {displayCategoryName}
          </Link>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-black uppercase tracking-tight mb-5 border-b border-slate-100 dark:border-slate-800 pb-3">
                Related Stories
              </h2>
              <div className="flex flex-col gap-5">
                {relatedPosts.map((related) => {
                  const relImage = related._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
                  const relTitle = stripHtml(related.title?.rendered ?? "");
                  const relCategory = related._embedded?.["wp:term"]?.[0]?.find(t => t.taxonomy === "category")?.slug || "news";
                  const relCategorySlug = relCategory === "automobile" ? "autos" : relCategory;

                  return (
                    <Link
                      key={related.id}
                      href={`/${relCategorySlug}/${related.slug}`}
                      className="flex gap-3 group"
                    >
                      {relImage && (
                        <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={relImage}
                            alt={relTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold line-clamp-3 group-hover:text-[#1a1a1a]/70 dark:group-hover:text-white/70 transition-colors leading-tight">
                          {relTitle}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
