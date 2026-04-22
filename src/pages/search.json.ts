import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const searchIndex = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    image: typeof post.data.image === 'string' ? post.data.image : post.data.image?.src,
    url: `/posts/${post.id}/`,
    content: post.body
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' }
  });
}