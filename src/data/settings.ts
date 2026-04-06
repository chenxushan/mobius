import avatar from '../images/01-1.jpg';
import heroImage from '../images/01.jpg';

// Gallery Images
import gal01 from '../images/100.jpg';
import gal02 from '../images/101.jpg';
import gal03 from '../images/102.jpg';
import gal04 from '../images/103.jpg';
import gal05 from '../images/104.jpg';
import gal06 from '../images/105.jpg';
import gal07 from '../images/106.jpg';
import gal08 from '../images/107.jpg';
import gal09 from '../images/108.jpg';

export const settings = {
  /* -----------------------------
   * Site
   * ----------------------------- */
  site: {
    title: 'Mobius',
    description: 'Mobius personal blogging theme for Astro.',
    logo: '', // You can add own logo. For example '/images/logo.png'.
    logoDark: '',
    colorScheme: 'auto' as 'auto' | 'light' | 'dark', // You can choose three modes auto, light, and dark. By default, the auto mode is set, which means the user can choose the light or dark mode themself.
    url: 'https://mobius.cool',
    image: '/images/og-image.jpg',
    language: 'en',
  },

  /* -----------------------------
   * SEO & Social
   * ----------------------------- */
  seo: {
    twitter: {
      handle: '@yourusername',
      site: '@yourusername',
      cardType: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
    },
  },

  /* -----------------------------
   * Navigation
   * ----------------------------- */
  navigation: {
    items: [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about/' },
      { title: 'Photos', url: '/photos/' },
      { title: 'Videos', url: '/videos/' },
    ],
  },

  /* ----------------------------------------------------
   * Pagination settings for the homepage
   * Controls how many posts are displayed
   * ------------------------------------------------- */
  pagination: {
    initial: 9, // Number of posts to show initially on the homepage
  },

  /* -----------------------------
   * Hero
   * ----------------------------- */
  hero: {
    enabled: true,
    title: 'Hey, I’m Sunniberg',
    description: '记录生活,影像,思考,阅读,拥抱AI,vibe coding. 我喜欢拿了橘子跑了,因为knowledge is power!',
    src: heroImage,
  },

  /* -----------------------------
   * Newsletter
   * ----------------------------- */
  newsletter: {
    enabled: false,
    mailchimpIdentifier: 'gmail.us21.list-manage.com/subscribe/post?u=8aeb9c31a5c97a3a5f9ff2740&id=0e31fd7793',
    inputText: 'Subscribe here',
    buttonText: 'Get a new tip',
  },

  /* -----------------------------
   * Author
   * ----------------------------- */
  author: {
    name: 'Sunniberg',
    bio: '记录生活,影像,思考,阅读,拥抱AI,vibe coding. 我喜欢拿了橘子跑了,因为knowledge is power!',
    src: avatar,
  },

  /* -----------------------------
   * Social Links
   * ----------------------------- */
  // Uses Font Awesome Free 7 icons via Iconify (SVG, npm-based).
  // Other icons can be found at https://icon-sets.iconify.design/fa7-brands/
  socialLinks: [
    {
      icon: 'fa7-brands:weixin',
      name: 'weixin',
      link: 'https://x.com/',
    },
    {
      icon: 'fa7-brands:github-square',
      name: 'github-square',
      link: 'https://facebook.com',
    },
    {
      icon: 'fa7-brands:bilibili',
      name: 'Bilibili',
      link: 'https://space.bilibili.com/33503442?spm_id_from=333.33.0.0',
    },
    {
      icon: 'fa7-brands:zhihu',
      name: 'zhihu',
      link: 'https://pinterest.com',
    },
    {
      icon: 'xhs',
      name: '小红书',
      link: 'https://www.xiaohongshu.com/user/profile/56e964f4aed7581aceee190e',
    }
  ],

/* -----------------------------
   * Gallery (Footer)
   * ----------------------------- */
  gallery: {
    enabled: true,
    title: 'Gallery',
    columns: 3,
    images: [
      { src: gal01, alt: 'Rest' },
      { src: gal02, alt: 'Lifestyle' },
      { src: gal03, alt: 'Hobby' },
      { src: gal04, alt: 'Notes' },
      { src: gal05, alt: 'Rest' },
      { src: gal06, alt: 'Hobby' },
      { src: gal07, alt: 'Fashion' },
      { src: gal08, alt: 'Notes' },
      { src: gal09, alt: 'Rest' },
    ],
  },

  /* -----------------------------
   * Contact
   * ----------------------------- */
  contact: {
    formId: 'your_formspree_form_id', // Example 'mbjebqko'
    description: 'Mobius comes with a built-in contact form, that you can use with Formspree service to handle up to 50 submissions per month for free. You could also easily switch to another contact form service if you want.'
  },

  /* -----------------------------
   * Comments (Disqus)
   * ----------------------------- */
  comments: {
    enabled: true,
    disqusIdentifier: 'demo-mobius', // Add your shortname for Disqus Comment. For example demo-menca

  },

  /* -----------------------------
   * Analytics
   * ----------------------------- */
  analytics: {
    google: '', // GA4 Measurement ID
  },
} as const