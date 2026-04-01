import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { settings } from '../data/settings';

export async function GET(context) {
  const posts = await getCollection('posts');

  const sortedPosts = posts.sort((a, b) =>
    b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: settings.site.title,
    description: settings.site.description,
    site: context.site || settings.site.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    }))
  });
}