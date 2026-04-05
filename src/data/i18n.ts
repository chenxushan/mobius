export const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    tags: 'Tags',
    elements: 'Elements',
    photos: 'Photos',
    videos: 'Videos',

    // Search
    search: 'Search',
    searchPlaceholder: 'Search posts...',
    noResults: 'No results found',

    // Post
    readMore: 'Read more',
    share: 'Share',
    relatedPosts: 'Related Posts',

    // Comments
    comments: 'Comments',
    leaveComment: 'Leave a comment',

    // Newsletter
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
    subscribePlaceholder: 'Your email address',

    // Footer
    allRightsReserved: 'All rights reserved',

    // Tags page
    taggedWith: 'Tagged with',

    // Contact
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit',
    sent: 'Sent!',

    // Pagination
    previous: 'Previous',
    next: 'Next',
  },
  zh: {
    // Navigation
    home: '首页',
    about: '关于',
    contact: '联系',
    tags: '标签',
    elements: '元素',
    photos: '照片',
    videos: '视频',

    // Search
    search: '搜索',
    searchPlaceholder: '搜索文章...',
    noResults: '没有找到结果',

    // Post
    readMore: '阅读更多',
    share: '分享',
    relatedPosts: '相关文章',

    // Comments
    comments: '评论',
    leaveComment: '发表评论',

    // Newsletter
    newsletter: 'Newsletter',
    subscribe: '订阅',
    subscribePlaceholder: '你的邮箱地址',

    // Footer
    allRightsReserved: '保留所有权利',

    // Tags page
    taggedWith: '标签',

    // Contact
    name: '姓名',
    email: '邮箱',
    message: '留言',
    submit: '提交',
    sent: '已发送！',

    // Pagination
    previous: '上一页',
    next: '下一页',
  }
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;