// rollup.config.js
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify-es'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'ElDataTree',
    exports: 'named'
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify())
}

export default config
