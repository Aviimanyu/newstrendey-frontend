import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

const API = process.env.NEXT_PUBLIC_WP_API

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API}/posts?slug=${slug}&_embed`, {
      cache: "no-store"
    })

    if (!res.ok) return null

    const data = await res.json()

    if (!data || data.length === 0) return null

    return data[0]

  } catch (error) {
    return null
  }
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
