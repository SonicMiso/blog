const path = require('path')
const pinyin = require('chinese-to-pinyin')
const figlet = require('figlet')

const sidebar = require('./sidebar')
const configureWebpack = require('./webpack.config.js')
const { chainMarkdown, extendMarkdown } = require('./extendMarkdown')

const isDEV = process.env.NODE_ENV === 'development'

const valineID = require('./private/valine-id').default
const valineKey = require('./private/valine-key').default

const HOST = 'https://blog.SonicMiso.zone'

console.log(figlet.textSync("Welcome!"))

module.exports = {
  /** develop config */

  base: '/',
  dest: './dist',

  /** page config */

  title: 'SonicMiso Blog',
  description:
    'SonicMiso Blog 是SonicMiso的个人专栏。其中有技术文章、杂文散文，或是个人动态。他是全栈工程师，他对设计、音乐和写作都颇感兴趣。如果你也热爱技术，相信你能在这找到一些乐趣。',
  keywords: 'SonicMiso,Guirotar,SonicMiso,博客,写作,后端,前端,设计,写作,游戏,指弹',
  robots: 'index,archive',
  author: 'SonicMiso',
  copyright: '转载请标明来源 blog.SonicMiso.zone',

  shouldPrefetch: false,

  /** theme config */

  theme: path.join(__dirname, './components/Theme/Enhance'),
  themeConfig: {
    lastUpdated: '本文最后更新于',
    smoothScroll: true,
    search: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/articles/' },
      { text: 'Links', link: '/friends/' }
    ].concat(isDEV ? [
      { text: 'Maps', link: '/maps/' },
      { text: 'Ideas', link: '/ideas/' },
      { text: 'HireMe', link: '/hire-me/' },
    ] : []),
    sidebar: {
      '/': sidebar.getSidebar(),
      // '/flows/': sidebar.getSidebar(),
      // '/articles/': sidebar.getSidebar(),
      // '/awesome/': sidebar.getSidebar(),
      // '/gists/': sidebar.getSidebar(),
      // '/music/': sidebar.getSidebar(),
      // '/secrets/': sidebar.getSidebar(),
      '/ideas/': [],
      '/friends/': []
    },
    nextLinks: false,
    prevLinks: false
  },
  locales: {
    '/': {
      lang: 'zh-cmn-Hans'
    }
  },

  /** markdown config */

  markdown: {
    anchor: {
      permalink: false
    },
    toc: false,
    extendMarkdown
  },
  chainMarkdown,

  /** plugins */

  plugins: {
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        // TODO dayjs
        const moment = require('moment')
        moment.locale(lang)
        return moment(timestamp).format('MMMM DD YYYY HH:mm')
      }
    },
    'named-chunks': {
      pageChunkName: page => {
        const defaultName = page.key.slice(1)
        const pinyinName = pinyin(page.title || defaultName, { removeTone: true }).replace(/[^a-zA-Z0-9]/g, '')
        return pinyinName
      },
      layoutChunkName: layout => `layout-${layout.componentName}`
    },
    'vuepress-plugin-medium-zoom': {
      selector:
        '.theme-default-content > img,' +
        '.theme-default-content > p > img,' +
        '.theme-default-content > ul > li > img,' +
        '.theme-default-content > ol > li > img,' +
        '.theme-default-content > figure > img,' +
        '.theme-default-content > p > figure > img,' +
        '.theme-default-content > ul > li > figure > img,' +
        '.theme-default-content > ol > li > figure > img',
      delay: 1000,
      options: {
        margin: 24,
        background: 'var(--color-background)',
        scrollOffset: 0
      }
    },
    'vuepress-plugin-comment': {
      choosen: 'valine',
      options: {
        el: '#valine-vuepress-comment',
        appId: valineID,
        appKey: valineKey,
        placeholder: '保持学习、保持怀疑、保持批判',
        avatar: 'robohash',
        pageSize: '50',
        highlight: false,
        visitor: true
      }
    },
    'rss-feed': {
      username: 'SonicMiso',
      hostname: HOST,
      selector: '.content__default',
      count: 10,
      filter: page => {
        const shouldConvert = /^articles\/([^\/]*\.md$)/.test(page.relativePath)
        if (/image-format/.test(page.relativePath)) {
          return false
        }
        if (/error-handling/.test(page.relativePath)) {
          return false
        }
        return shouldConvert
      }
    },
    sitemap: {
      hostname: HOST,
      changefreq: 'weekly'
    },
    robots: {
      host: HOST,
      disallowAll: false,
      sitemap: '/sitemap.xml',
      policies: [
        {
          userAgent: '*',
          disallow: ['/gists/', '/hire-me/', '/maps/']
        }
      ]
    },
    'vuepress-plugin-mathjax': {
      target: 'chtml',
      macros: {
        '*': '\\times'
      }
    }
  },

  /** Configuration */

  chainWebpack: config => {
    config.module.rules.delete('images')
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        // You options here, default options:
        limit: 8192,
        // name: `assets/img/[name].[hash:8].[ext]`
      })
  },
  configureWebpack,
  extraWatchFiles: ['./styles/*']
}
