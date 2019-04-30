const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')

const docsMap = {
  basic: '基础用法',
  'dynamic-url': '动态变化url',
  filter: '节点过滤',
  'configure-el-tree': '配置el-tree',
  checkbox: '树节点的选择',
  'memorize-expansion': '保存展开状态',
  'custom-menu': '自定义菜单'
}

const demoSections = Object.entries(docsMap).map(([basename, name]) => ({
  name,
  content: `docs/${basename}.md`
}))

module.exports = {
  require: [path.join(__dirname, 'docs/global.requires.js')],
  styleguideDir: 'docs',
  pagePerSection: true,
  ribbon: {
    url: 'https://github.com/FEMessage/el-data-tree'
  },
  sections: [
    {
      name: 'Components',
      components: 'src/*.vue',
      usageMode: 'expand'
    },
    {
      name: 'Demo',
      sections: demoSections,
      sectionDepth: 2
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.styl(us)?$/,
          loaders: ['vue-style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.(woff2?|eot|[ot]tf)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
}
