export function getVideoEmbedUrl(url: string): string {
  if (url.includes('player.bilibili.com')) return url;

  const bvMatch = url.match(/bilibili\.com\/video\/(BV\w+)/);
  if (bvMatch) return `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}`;

  const avMatch = url.match(/bilibili\.com\/video\/av(\d+)/);
  if (avMatch) return `https://player.bilibili.com/player.html?aid=${avMatch[1]}`;

  return url;
}
