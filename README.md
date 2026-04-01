# Mobius – Personal Blogging Theme for Astro

Mobius is a super fast and clean blogging theme for Astro. One of the main features of this theme is video post support. You can easily add your favorite video from services like Youtube or Vimeo. This theme has a light and dark mode for easy reading. If you want to start a creative personal blog and you create video content this theme is perfect for you.

* * *

### Demo

Check the theme in action [Live Demo](https://mobius-blog.netlify.app) |
[Anvod Studio](https://anvodstudio.com)

* * *

### Theme features

- Dark and light mode user can select themself
- 100% responsive design
- Super fast performance ⚡⚡⚡
- Clean and modern code
- Optimized for mobile devices
- Social sharing buttons
- Scroll to top button
- Copy code button
- Syntax highlighting
- Compatible with modern browsers
- Medium style image zoom
- Image lazy loading
- Image gallery
- Tags page
- Custom logo support
- Supports video posts
- Supports contact form (Formspree)
- Supports MailChimp newsletter
- Supports Disqus comments
- Supports Google Analytics
- Font Awesome icons
- Google Fonts
- Free Updates & Support

* * *

### Deployment

To run the theme locally, navigate to the theme directory and run `npm install` to install the dependencies, then run `npm run dev` to start the server.

I would recommend checking the [Deployment Methods](https://docs.astro.build/en/guides/deploy/) page on Astro website.

* * *

### Documentation

Before using the Menca theme, please read the attached documentation.

# Menca – Personal Blogging Theme for Astro

## Theme Information
- Name: **Menca** – Modern Personal Blogging theme for Astro
- Menca is a beautiful and modern personal blogging theme designed for content creators, writers, and bloggers. With its clean design, smooth animations, and rich features, Menca provides an exceptional platform for sharing your stories and ideas with the world.
- Current Version: 1.1.0
- Released: 11/03/2026
- Creator: [Anvod Studio](https://anvodstudio.com)

## Table of Contents
- [Getting Started](#getting-started)
- [Theme Configurations](#configurations)
- [Color Scheme (Dark/Light Mode)](#color-scheme)
- [Hero Section](#hero)
- [Navigation](#navigation)
- [Posts & Pagination](#posts)
- [Pages](#pages)
- [Footer Gallery](#gallery)
- [Search Functionality](#search)
- [Newsletter](#newsletter)
- [Contact Form](#contact)
- [Social Links](#social)
- [Comments (Disqus)](#comments)
- [Google Analytics](#analytics)
- [Advanced Features](#advanced)
- [Deployment](#deployment)
- [Update Favicon](#UpdateFavicon)
- [Credits](#Credits)
- [Support](#Support)

## Getting Started
To run the theme locally, navigate to the theme directory and follow these steps:

> **Prerequisites:** Make sure you have Node.js (v18 or higher) and npm installed on your system.

**1. Install dependencies:**
```bash
npm install
```

**2. Start the development server:**
```bash
npm run dev
```

**3. Build for production:**
```bash
npm run build
```

**4. Preview production build:**
```bash
npm run preview
```

The development server will typically start at `http://localhost:4321`

---

## Theme Configurations
All theme settings are centralized in the `src/data/settings.ts` file. This TypeScript file provides type-safe configuration for your entire blog.

### Site Settings
Configure your basic site information:
```typescript
site: {
  title: 'Menca',
  description: 'Menca personal blogging theme for Astro.',
  logo: '', // Optional: '/images/logo.png'
  logoDark: '', // Optional: dark mode logo
  colorScheme: 'auto' as 'auto' | 'light' | 'dark',
  url: 'https://menca-astro.netlify.app',
  image: '/images/og-image.jpg',
  language: 'en',
}
```
- **title:** Your site name
- **description:** Site description for SEO
- **logo:** Path to your logo (optional)
- **logoDark:** Separate logo for dark mode (optional)
- **colorScheme:** Choose 'auto', 'light', or 'dark' mode
- **url:** Your site's full URL
- **image:** Default Open Graph image

### SEO & Social Settings
Configure SEO metadata and social media cards:
```typescript
seo: {
  twitter: {
    handle: '@yourusername',
    site: '@yourusername',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
  },
}
```

---

## Color Scheme (Dark/Light Mode) ⭐NEW⭐
Menca features a powerful color scheme system that allows users to choose their preferred viewing mode:

```typescript
colorScheme: 'auto' // Options: 'auto', 'light', 'dark'
```

**Available Modes:**
- **auto:** Users can toggle between light and dark modes. The theme remembers their preference using localStorage
- **light:** Forces light mode for all users
- **dark:** Forces dark mode for all users

> **How it works:** When set to 'auto', a theme toggle button appears in the header, allowing users to switch between light and dark modes. Their preference is saved and persists across sessions.

The theme switcher is implemented in `scripts/common.ts` and automatically manages the `dark-mode` and `light-mode` classes on the HTML element.

---

## Hero Section
Create a stunning first impression with the customizable hero section:

```typescript
hero: {
  enabled: true,
  title: 'Hey, I'm Camelia Mendes',
  description: 'Designs, talks, and writes about web, ethics, privacy, and dev.',
  src: heroImage, // Imported image
}
```

**Hero Properties:**
- **enabled:** Set to `true` to show hero section on homepage
- **title:** Your main headline
- **description:** Brief introduction or tagline
- **src:** Background image (imported at top of file)

Import your hero image at the top of `settings.ts`:
```typescript
import heroImage from '../images/01.jpg';
```

---

## Navigation
Configure your site navigation menu in `src/data/settings.ts`:

```typescript
navigation: {
  items: [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about/' },
    { title: 'Contact', url: '/contact/' },
    { title: 'Elements', url: '/elements/' },
  ],
}
```

> ⚠️ **Important:** Always include a trailing slash (`/`) at the end of internal links for proper routing in Astro.

---

## Posts & Pagination
Create blog posts in the `src/content/posts/` directory using Markdown or MDX files.

### Post Frontmatter
```markdown
---
title: "Your Post Title"
description: "Brief post description"
image: "../../images/post-image.jpg"
tags: [web-design, astro]
date: 2025-01-15
---
```

**Frontmatter Fields:**
- **title:** Post title (required)
- **description:** Post description for SEO and previews
- **image:** Featured image path
- **tags:** Array of tags (use dashes for multi-word tags)
- **date:** Publication date (YYYY-MM-DD)

### Pagination Settings
Control how many posts are displayed on the homepage:
```typescript
pagination: {
  initial: 9, // Number of posts to show initially
}
```

### Content Features
**Wide Images:** Create full-width images using the `:::wide` directive:
```markdown
:::wide
![Beach](../../images/12-1.jpg)
*Photo by Photographer Name*
:::
```

**Image Galleries:** Create beautiful galleries using the `:::gallery` directive:
```markdown
:::gallery
  ![Image 1](../../images/100.jpg)
  ![Image 2](../../images/101.jpg)
  ![Image 3](../../images/102.jpg)
  *Gallery / Unsplash*
:::
```

**Callouts:** Add attention-grabbing callout boxes:
```markdown
:::note
  Useful information for readers
:::

:::tip
  Helpful advice or pro tips
:::

:::warning
  Important warnings or alerts
:::
```

---

## Pages
Create custom pages in `src/content/pages/` or `src/pages/`.

**Content Collection Pages:**
```markdown
---
title: "About"
image: "../../images/page-image.jpg"
---

Your page content here...
```

Pages support all the same markdown features as posts, including galleries, wide images, and callouts.

---

## Footer Gallery 🆒UNIQUE🆒
Menca includes a unique footer gallery feature to showcase your best images:

```typescript
gallery: {
  enabled: true,
  title: 'Gallery',
  columns: 3,
  images: [
    { src: gal01, alt: 'Rest' },
    { src: gal02, alt: 'Lifestyle' },
    { src: gal03, alt: 'Hobby' },
    // ... more images
  ],
}
```

**Gallery Properties:**
- **enabled:** Set to `true` to display footer gallery
- **title:** Gallery section title
- **columns:** Number of columns (1-4)
- **images:** Array of image objects with src and alt text

Import gallery images at the top of `settings.ts`:
```typescript
import gal01 from '../images/100.jpg';
import gal02 from '../images/101.jpg';
// ... more imports
```

> 💡 **Pro Tip:** The footer gallery is perfect for photographers, designers, or anyone who wants to showcase visual work. Images automatically adapt to different screen sizes.

---

## Search Functionality
Menca includes a powerful built-in search feature using Astro Fuse:

**Search Features:**
- Fast, client-side search with no backend required
- Fuzzy matching for better results
- Searches through titles, descriptions, and content
- Beautiful overlay interface with smooth animations
- Keyboard shortcuts (ESC to close)
- Real-time results as you type
- Displays up to 9 matching posts with images

The search is automatically enabled and configured in `scripts/common.ts`. It reads from a generated `search.json` file that indexes all your posts.

> **How to use:** Click the search icon in the header or use the keyboard shortcut. Start typing to see instant results. Press ESC to close.

---

## Newsletter
Grow your audience with the integrated newsletter subscription form:

```typescript
newsletter: {
  enabled: true,
  mailchimpIdentifier: 'gmail.us21.list-manage.com/subscribe/post?u=...',
  inputText: 'Subscribe here',
  buttonText: 'Get a new tip',
}
```

**Newsletter Properties:**
- **enabled:** Set to `true` to display newsletter form
- **mailchimpIdentifier:** Your Mailchimp form action URL
- **inputText:** Placeholder text for email input
- **buttonText:** Submit button text

**Setup Instructions:**
1. Create a Mailchimp account (free tier available)
2. Create an audience/list
3. Generate an embedded form
4. Copy the form action URL from the generated code
5. Paste it into the `mailchimpIdentifier` field

---

## Contact Form
Enable visitors to reach you with the Formspree-powered contact form:

```typescript
contact: {
  formId: 'your_formspree_form_id', // Example: 'mbjebqko'
  description: 'Menca comes with a built-in contact form...'
}
```

**Setup Steps:**
1. Visit [Formspree.io](https://formspree.io) and create a free account
2. Create a new form project
3. Copy your form ID
4. Add it to the `formId` field

Formspree's free plan includes up to 50 submissions per month, perfect for personal blogs.

---

## Social Links
Add your social media profiles to display throughout the site:

```typescript
socialLinks: [
  {
    icon: 'fa7-brands:x-twitter',
    name: 'X',
    link: 'https://x.com/',
  },
  {
    icon: 'fa7-brands:facebook-square',
    name: 'Facebook',
    link: 'https://facebook.com',
  },
  // Add more...
]
```

**Social Link Properties:**
- **icon:** Font Awesome 7 icon identifier from Iconify
- **name:** Platform name (for accessibility)
- **link:** Your profile URL

> The theme uses Font Awesome Free 7 icons via Iconify. Browse available icons at [Iconify Icon Sets](https://icon-sets.iconify.design/fa7-brands/).

---

## Comments (Disqus)
Enable discussions on your blog posts with Disqus comments:

```typescript
comments: {
  enabled: true,
  disqusIdentifier: 'demo-menca',
}
```

**Setup Instructions:**
1. Create a Disqus account at [disqus.com](https://disqus.com)
2. Register your website and get your shortname
3. Replace `demo-menca` with your Disqus shortname
4. Set `enabled: true`

---

## Google Analytics
Track your blog's performance with Google Analytics 4:

```typescript
analytics: {
  google: '', // GA4 Measurement ID (G-XXXXXXXXXX)
}
```

**Setup:**
1. Create a Google Analytics 4 property
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add it to the `google` field

---

## Advanced Features
Menca includes several advanced features implemented in `scripts/common.ts`:

### Image Zoom
Click any image in post content to zoom in for a detailed view. The zoom feature includes:
- Smooth zoom animations
- Click or scroll to zoom out
- Overlay darkens background for focus
- Respects image natural size
- Mobile-friendly touch interactions

### Copy Code Button
Every code block automatically gets a "Copy" button that allows readers to easily copy code snippets with one click. Features include:
- Automatic detection of all code blocks
- Visual feedback ("Copied!" message)
- Positioned in top-right corner
- Styled to match theme

### Back to Top Button
A smooth scroll-to-top button appears when users scroll down the page, making navigation easier on long posts.

### View Transitions
Astro's View Transitions API provides smooth, app-like navigation between pages without full page reloads.

> 💻 **Developer Note:** All interactive features are implemented using vanilla JavaScript with proper cleanup functions to prevent memory leaks during page transitions.

---

## Deployment
Deploy your Menca blog to any modern hosting platform:

### Netlify Deployment
1. Push your project to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Vercel Deployment
1. Push your project to GitHub
2. Import repository to Vercel
3. Vercel auto-detects Astro settings
4. Deploy!

### GitHub Pages
1. Update `data/settings.ts` with your site URL
2. Configure GitHub Actions workflow
3. Push to deploy automatically

> For detailed deployment guides, visit the [Astro Deployment Documentation](https://docs.astro.build/en/guides/deploy/).

---

## Update Favicon
Replace the favicon files in the `public/` directory:
- `public/favicon.ico` – Main favicon

The theme automatically references favicons from the public directory.

---

## Credits
This theme uses the following resources and libraries:
- [Astro](https://astro.build) – Static Site Generator
- [Astro Fuse](https://github.com/johnny-mh/devlog/tree/main/packages/astro-fuse) – Lightweight search library
- [Google Fonts](https://fonts.google.com/specimen/Jost) (Jost)
- [Font Awesome 7](https://fontawesome.com) (via Iconify) – Icon library
- [Formspree](https://formspree.io) – Contact form service
- [Mailchimp](https://mailchimp.com) – Newsletter service
- [Disqus](https://disqus.com) – Comment system
- Preview images from [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/)

---

## Support
If you have any questions that are not answered here, please feel free to contact me by mail.

📧 [Contact Support](mailto:anvodstudio@gmail.com)

---

© 2026 Anvod Studio • Menca Theme Documentation