const fs = require('fs')
const path = require('path')

console.log('USE NODE_ENV:', process.env.NODE_ENV)

// let gistsDir = path.join(__dirname, '../gists')
// let awesomeDir = path.join(__dirname, '../awesome')
// let secretsDir = path.join(__dirname, '../secrets')
// let mapsDir = path.join(__dirname, '../maps')

let gistsDir = 'L:\\Workspace\\blog\\blogs\\gists'
let awesomeDir = 'L:\\Workspace\\blog\\blogs\\awesome'
let secretsDir = 'L:\\Workspace\\blog\\blogs\\secrets'
let mapsDir = 'L:\\Workspace\\blog\\blogs\\maps'

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @param {String} prefix 给返回值添加前缀
 * @todo 按照时间排序
 */
const getSRCs = (src, prefix = '') => {
  const filenames = []
  const fileTypes = /\.md$/
  const mainFiles = ['index.md', 'README.md']
  try {
    fs.readdirSync(src).forEach(file => {
      if (fileTypes.test(file) > 0) {
        if (!mainFiles.includes(file)) {
          filenames.push(file.replace('.md', ''))
        }
      }
    })
  } catch (err) {
    // 在 Build 时会碰到这个莫名奇妙的错误，
    // 和 __dirname node 执行路径有关，
    // 可以不用管
    console.error('Error in getSRCs : ', err)
  }
  filenames.sort()
  return filenames.map(x => prefix + x)
}

const sidebars = [
  {
    title: '心流思绪 / Heart Flows',
    label: '心流思绪',
    collapsable: false,
    open: true,
    path: '/flows/',
    children: [
      // 'flows/brain-history',
      'flows/gods-know'
    ],
  },
  {
    title: '技术博客 / Coder',
    label: '技术',
    collapsable: false,
    open: true,
    path: '/articles/',
    children: [
      // 'articales/even-more-modern-error-handling',
      // 'articles/image-format',
      // 'articles/windows'
    ],
  },
  {
    title: '知识骨架',
    collapsable: true,
    open: false,
    path: '/maps/',
    children: getSRCs(mapsDir, 'maps/'),
  },
  {
    title: 'Secrets',
    collapsable: true,
    open: true,
    path: '/secrets/',
    children: getSRCs(secretsDir, 'secrets/'),
  },
]

module.exports = {
  getSidebar() {
    return sidebars
  },
  getRecommends() {
    return {
      心流: {
        url: '/flows/gods-know.html',
        label: 'gods-know',
      },
      // 技术: {
      //   url: '/articles/use-gpt-learn-complex-frontend.html',
      //   label: '如何向 GPT 咨询前端问题',
      // },
    }
  }
}
