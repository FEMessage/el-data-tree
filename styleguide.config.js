const {VueLoaderPlugin} = require('vue-loader')
const path = require('path')

const docs = [
  'basic',
  'dynamic-url',
  'filter-nodes',
  'configure-el-tree',
  'multi-select-nodes',
  'memorize-expansion',
  'custom-menu',
  'slot-node-label'
]

const demoSections = docs.map(name => ({
  name,
  content: `docs/${name}.md`
}))

module.exports = {
  require: [path.join(__dirname, 'styleguide/global.requires.js')],
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
      sections: demoSections
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
