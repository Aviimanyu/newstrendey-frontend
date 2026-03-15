import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

const API = process.env.NEXT_PUBLIC_WP_API

async function getPost(slug: string) {
  const res = await fetch(`${API}/posts?slug=${slug}`, {
    cache: "no-store"
  })

  const data = await res.json()
  return data[0]
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) return notFound()

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  )
}
