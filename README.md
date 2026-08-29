# Mobius — Astro 个人博客主题

[简体中文](#简体中文) · [English](#english)

<a id="简体中文"></a>

## 简体中文

Mobius 是一个快速、简洁的 Astro 个人博客主题，适合记录文章、照片和视频。主题支持响应式布局、明暗模式、内容搜索、图片画廊、图片缩放、视频文章、评论、订阅和联系表单等功能。本项目还增加了独立照片模块，并支持纸质书风格的交互式翻页相册。

---

### 演示

- [主题在线演示](https://www.mobius.cool/)
- [Anvod Studio](https://anvodstudio.com)

---

### 主题功能

- 用户可切换明暗模式
- 完整响应式设计
- 快速的静态站点性能
- 针对移动设备优化
- 社交分享按钮
- 返回顶部按钮
- 代码一键复制
- 代码语法高亮
- 兼容现代浏览器
- Medium 风格图片缩放
- 图片懒加载
- 图片画廊
- 独立照片相册模块
- 交互式翻页相册
- 标签页面
- 自定义 Logo
- 视频文章及独立视频模块
- Formspree 联系表单
- Mailchimp 邮件订阅
- Disqus 评论
- Google Analytics
- Font Awesome 图标
- Google Fonts

---

### 目录

- [开始使用](#开始使用)
- [主题配置](#主题配置)
- [明暗模式](#明暗模式)
- [首页 Hero 区域](#首页-hero-区域)
- [导航菜单](#导航菜单)
- [文章与分页](#文章与分页)
- [独立页面](#独立页面)
- [照片相册](#照片相册)
- [新增翻页相册](#新增翻页相册)
- [页脚画廊](#页脚画廊)
- [搜索功能](#搜索功能)
- [邮件订阅](#邮件订阅)
- [联系表单](#联系表单)
- [社交链接](#社交链接)
- [Disqus 评论](#disqus-评论)
- [Google Analytics](#google-analytics-中文)
- [高级功能](#高级功能)
- [部署](#部署-中文)
- [更新网站图标](#更新网站图标)
- [依赖与鸣谢](#依赖与鸣谢)
- [支持](#支持-中文)

---

### 开始使用

运行本项目之前，请先安装 Node.js 18 或更高版本以及 npm。

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm run dev
   ```

3. 构建生产版本：

   ```bash
   npm run build
   ```

4. 本地预览生产版本：

   ```bash
   npm run preview
   ```

开发服务器通常运行在 `http://localhost:4321`。如果该端口已被占用，Astro 会自动使用其他可用端口，请以终端输出为准。

---

### 主题配置

全站设置集中在 `src/data/settings.ts`。该 TypeScript 文件为站点配置提供类型检查。

#### 站点设置

```typescript
site: {
  title: 'Mobius',
  description: 'Mobius personal blogging theme for Astro.',
  logo: '',
  logoDark: '',
  colorScheme: 'auto' as 'auto' | 'light' | 'dark',
  url: 'https://mobius.cool',
  image: '/images/og-image.jpg',
  language: 'en',
}
```

- `title`：站点名称。
- `description`：用于 SEO 的站点说明。
- `logo`：浅色模式 Logo，可以留空。
- `logoDark`：深色模式 Logo，可以留空。
- `colorScheme`：可设置为 `auto`、`light` 或 `dark`。
- `url`：站点正式域名。
- `image`：默认 Open Graph 分享图片。
- `language`：站点语言代码。

#### SEO 与社交分享

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

这里可以配置 X/Twitter 卡片和 Open Graph 元数据。

---

### 明暗模式

在 `src/data/settings.ts` 中设置：

```typescript
colorScheme: 'auto'
```

支持三种模式：

- `auto`：显示主题切换按钮，并使用 `localStorage` 记住访问者的选择。
- `light`：固定使用浅色模式。
- `dark`：固定使用深色模式。

主题切换逻辑位于 `src/scripts/common.ts`，它会管理 HTML 元素上的 `dark-mode` 和 `light-mode` 类名。

---

### 首页 Hero 区域

```typescript
hero: {
  enabled: true,
  title: 'Hey, I’m Sunniberg',
  description: '个人简介或首页引导文字',
  src: heroImage,
}
```

- `enabled`：是否显示 Hero 区域。
- `title`：首页主标题。
- `description`：简短介绍。
- `src`：背景图片或主视觉图片。

图片需要先在 `settings.ts` 顶部导入：

```typescript
import heroImage from '../images/01.jpg';
```

---

### 导航菜单

在 `src/data/settings.ts` 中配置：

```typescript
navigation: {
  items: [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about/' },
    { title: 'Photos', url: '/photos/' },
    { title: 'Videos', url: '/videos/' },
  ],
}
```

站内链接建议始终以 `/` 结尾，避免 Astro 路由行为不一致。

---

### 文章与分页

文章文件存放在 `src/content/posts/`，支持 Markdown 和 MDX。

#### 文章 Frontmatter

```markdown
---
title: "文章标题"
description: "文章摘要"
image: "../../images/post-image.jpg"
tags: [web-design, astro]
pubDate: 2026-08-29
draft: false
---
```

- `title`：文章标题，必填。
- `description`：文章摘要和 SEO 描述。
- `image`：文章封面图。
- `tags`：标签数组。
- `pubDate`：发布日期。
- `updatedDate`：可选的更新日期。
- `videoEmbed`：可选的视频嵌入代码或地址。
- `externalLink`：可选的外部文章链接。
- `draft`：设置为 `true` 时隐藏文章。

#### 分页数量

```typescript
pagination: {
  initial: 9,
}
```

`initial` 控制首页初始显示的文章数量。

#### 宽幅图片

```markdown
:::wide
![海滩](../../images/12-1.jpg)
*摄影师署名*
:::
```

#### 图片画廊

```markdown
:::gallery
  ![图片 1](../../images/100.jpg)
  ![图片 2](../../images/101.jpg)
  ![图片 3](../../images/102.jpg)
  *画廊说明*
:::
```

#### 提示框

```markdown
:::note
  补充说明
:::

:::tip
  实用建议
:::

:::warning
  重要警告
:::
```

---

### 独立页面

独立页面可以放在 `src/content/pages/` 或 `src/pages/`。

```markdown
---
title: "关于我"
description: "页面说明"
image: "../../images/page-image.jpg"
---

这里填写页面正文……
```

内容集合页面同样支持文章中的画廊、宽幅图片和提示框等 Markdown 功能。

---

### 照片相册

照片相册保存在 `src/content/photos/`。每个 `.md` 或 `.mdx` 文件代表一个相册，文件名会成为相册详情页路径。

例如：

```text
src/content/photos/hangzhou-autumn.md
```

对应访问地址：

```text
/photos/hangzhou-autumn/
```

文件名建议只使用小写英文字母、数字和连字符。

相册支持两种展示形式：

- `presentation: grid`：传统网格和灯箱浏览，也是默认形式。
- `presentation: flipbook`：纸质书风格的交互式翻页相册。

---

### 新增翻页相册

最快的方法是复制 `src/content/photos/china-travel-map.md`，重命名后替换内容。以后新增相册不需要修改 Astro 页面、组件或脚本。

#### 完整模板

```yaml
---
title: 杭州秋日漫游
description: 西湖、山林与城市街巷之间的一次秋日散步。
location: 中国・杭州
date: 2026-10

# 启用翻页相册
presentation: flipbook

# 照片列表页显示的相册缩略图
cover: "https://你的图片地址/cover.jpg"

# 当前相册的独立配色，所有字段均可省略
theme:
  paper: "#f2eee4"
  cover: "#173f39"
  ink: "#242c28"
  muted: "#696b63"

# 这里的排列顺序就是翻页顺序
images:
  - src: "https://你的图片地址/01.jpg"
    alt: 西湖清晨的薄雾

  - src: "https://你的图片地址/02.jpg"
    alt: 秋日梧桐树下的街道

  - src: "https://你的图片地址/03.jpg"
    alt: 山间石径与落叶

  - src: "https://你的图片地址/04.jpg"
    alt: 傍晚的城市灯光

draft: false
---
```

#### 相册字段

- `title`：相册标题，同时用于详情页标题和书籍封面。
- `description`：显示在相册列表和详情页的简介。
- `location`：拍摄地点，也会显示在书籍封面信息中。
- `date`：拍摄或整理日期。
- `presentation`：设置为 `flipbook` 启用翻页效果；设置为 `grid` 或省略时使用传统网格相册。
- `cover`：照片列表页的相册缩略图，不是翻页相册内部书封的背景图片。
- `images`：照片数组，排列顺序就是翻页顺序。
- `src`：远程图片 URL。
- `alt`：图片内容说明，用于无障碍访问和图片无法加载时的替代文字。
- `draft`：`false` 表示公开；`true` 表示暂时隐藏。

#### 独立定制相册颜色

每个相册都可以通过 `theme` 设置不同的视觉风格：

- `paper`：内页纸张颜色。
- `cover`：书籍封面颜色。
- `ink`：主要文字颜色。
- `muted`：辅助文字和操作提示颜色。

四个颜色均为可选项，也可以只覆盖其中一个：

```yaml
theme:
  cover: "#6a3028"
```

颜色必须使用十六进制 CSS 格式，例如 `#f2eee4`、`#fff` 或带透明度的八位格式。YAML 中的 `#` 会被识别为注释，因此颜色值必须加引号。

#### 照片选择和排序建议

- 优先保留构图、清晰度和叙事性最强的照片。
- 推荐使用 8、10、12 等偶数张照片，使桌面端双页展开更加完整。
- 桌面端通常按照第 1、2 张，第 3、4 张依次组成跨页；移动端使用单页浏览。
- 建议让开场、过程、高潮和结尾形成连贯的视觉顺序。
- 图片可以使用对象存储或 CDN 的 HTTPS 地址。

#### 翻页操作

- 点击左右按钮或页面角落翻页。
- 使用键盘左、右方向键翻页。
- 空格键进入下一页。
- `Home` 跳到开头，`End` 跳到结尾。
- 触屏设备支持手势操作。

#### 本地检查和发布

新增相册后启动开发服务器：

```bash
npm run dev
```

访问 `/photos/`，找到新相册并进入详情页。确认图片顺序、封面信息、配色以及桌面端和移动端布局均符合预期。

发布前运行：

```bash
npm run build
```

构建成功后即可按照项目原有方式部署。

---

### 页脚画廊

在 `src/data/settings.ts` 中配置页脚图片画廊：

```typescript
gallery: {
  enabled: true,
  title: 'Gallery',
  columns: 3,
  images: [
    { src: gal01, alt: 'Rest' },
    { src: gal02, alt: 'Lifestyle' },
    { src: gal03, alt: 'Hobby' },
  ],
}
```

- `enabled`：是否显示页脚画廊。
- `title`：画廊标题。
- `columns`：列数，支持 1–4 列。
- `images`：包含图片和替代文字的数组。

图片需要先在 `settings.ts` 顶部导入：

```typescript
import gal01 from '../images/100.jpg';
import gal02 from '../images/101.jpg';
```

画廊会自动适配不同屏幕尺寸，适合展示摄影、设计和其他视觉作品。

---

### 搜索功能

项目使用 Astro Fuse 提供客户端搜索：

- 不需要后端服务。
- 支持模糊匹配。
- 搜索标题、描述和正文。
- 输入时实时显示结果。
- 最多显示 9 条带图片的匹配文章。
- 按 `Esc` 关闭搜索界面。

搜索逻辑位于 `src/scripts/common.ts`，数据来自构建时生成的 `search.json`。

---

### 邮件订阅

```typescript
newsletter: {
  enabled: true,
  mailchimpIdentifier: 'gmail.us21.list-manage.com/subscribe/post?u=...',
  inputText: 'Subscribe here',
  buttonText: 'Get a new tip',
}
```

- `enabled`：是否显示订阅表单。
- `mailchimpIdentifier`：Mailchimp 表单的 Action URL。
- `inputText`：邮箱输入框提示文字。
- `buttonText`：提交按钮文字。

配置步骤：

1. 创建 Mailchimp 账号和受众列表。
2. 生成嵌入式订阅表单。
3. 从生成的代码中复制表单 Action URL。
4. 将地址填入 `mailchimpIdentifier`。

---

### 联系表单

项目默认使用 Formspree 处理联系表单：

```typescript
contact: {
  formId: 'your_formspree_form_id',
  description: '联系页面说明',
}
```

配置步骤：

1. 在 [Formspree](https://formspree.io) 创建账号。
2. 创建一个表单项目。
3. 复制表单 ID。
4. 将 ID 填入 `formId`。

Formspree 免费方案通常适合低频使用的个人博客，具体额度以其官网为准。

---

### 社交链接

```typescript
socialLinks: [
  {
    icon: 'fa7-brands:github-square',
    name: 'GitHub',
    link: 'https://github.com/your-name',
  },
]
```

- `icon`：Iconify 中的 Font Awesome 7 图标标识。
- `name`：平台名称，也用于无障碍标签。
- `link`：个人主页地址。

可在 [Iconify Font Awesome Brands](https://icon-sets.iconify.design/fa7-brands/) 查询图标名称。

---

### Disqus 评论

```typescript
comments: {
  enabled: true,
  disqusIdentifier: 'demo-mobius',
}
```

配置步骤：

1. 在 [Disqus](https://disqus.com) 注册网站。
2. 获取站点 Shortname。
3. 将 Shortname 填入 `disqusIdentifier`。
4. 将 `enabled` 设置为 `true`。

---

<a id="google-analytics-中文"></a>

### Google Analytics

```typescript
analytics: {
  google: '',
}
```

在 Google Analytics 4 中创建媒体资源并获取 `G-XXXXXXXXXX` 格式的衡量 ID，然后填入 `google` 字段。

---

### 高级功能

#### 图片缩放

点击文章正文中的图片可以放大查看。该功能包含平滑动画、遮罩背景、自然尺寸处理和移动端触摸支持。

#### 复制代码按钮

页面会自动为代码块添加“复制”按钮，并在复制成功后显示反馈。

#### 返回顶部

页面滚动到一定距离后会显示返回顶部按钮，适合阅读长文章。

#### 页面过渡

项目使用 Astro View Transitions 提供类似单页应用的平滑导航。相关交互使用原生 JavaScript 实现，并在页面切换时执行清理逻辑。

---

<a id="部署-中文"></a>

### 部署

#### Netlify

1. 将项目推送到 GitHub。
2. 在 Netlify 中连接仓库。
3. 构建命令填写 `npm run build`。
4. 发布目录填写 `dist`。
5. 执行部署。

#### Vercel

1. 将项目推送到 GitHub。
2. 在 Vercel 中导入仓库。
3. Vercel 通常会自动识别 Astro 配置。
4. 确认构建并部署。

#### GitHub Pages

1. 在 `src/data/settings.ts` 中设置正式站点 URL。
2. 配置 GitHub Actions 工作流。
3. 推送代码并触发自动部署。

更多方式请参考 [Astro 部署文档](https://docs.astro.build/en/guides/deploy/)。

---

### 更新网站图标

替换 `public/` 目录中的网站图标：

```text
public/favicon.ico
```

主题会自动引用 `public` 目录中的图标文件。

---

### 依赖与鸣谢

- [Astro](https://astro.build)：静态站点生成器。
- [Astro Fuse](https://github.com/johnny-mh/devlog/tree/main/packages/astro-fuse)：轻量客户端搜索。
- [Google Fonts — Jost](https://fonts.google.com/specimen/Jost)：英文字体。
- [Font Awesome 7](https://fontawesome.com)：通过 Iconify 使用的图标库。
- [Formspree](https://formspree.io)：联系表单服务。
- [Mailchimp](https://mailchimp.com)：邮件订阅服务。
- [Disqus](https://disqus.com)：评论系统。
- [Unsplash](https://unsplash.com/) 和 [Pexels](https://www.pexels.com/)：主题演示图片来源。

---

<a id="支持-中文"></a>

### 支持

如果文档没有解决你的问题，可以通过邮件联系原主题作者：

[联系支持](mailto:anvodstudio@gmail.com)

---

<a id="english"></a>

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

Before using the Mobius theme, please read the documentation below.

# Mobius – Personal Blogging Theme for Astro

## Theme Information
- Name: **Mobius** – Modern Personal Blogging theme for Astro
- Mobius is a beautiful and modern personal blogging theme designed for content creators, writers, and bloggers. With its clean design, smooth animations, and rich features, Mobius provides an exceptional platform for sharing your stories and ideas with the world.
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
  title: 'Mobius',
  description: 'Mobius personal blogging theme for Astro.',
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
Mobius features a powerful color scheme system that allows users to choose their preferred viewing mode:

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
Mobius includes a unique footer gallery feature to showcase your best images:

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
Mobius includes a powerful built-in search feature using Astro Fuse:

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
  description: 'Mobius comes with a built-in contact form...'
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
Mobius includes several advanced features implemented in `scripts/common.ts`:

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
Deploy your Mobius blog to any modern hosting platform:

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

© 2026 Anvod Studio • Mobius Theme Documentation
