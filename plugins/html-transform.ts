import type { HtmlTransform } from './plugins-types'
import type { Plugin } from 'vite'
import ejs from 'ejs'
import minifierTerser from 'html-minifier-terser'

//html渲染，基于 https://ejs.bootcss.com/
const htmlRender = function (options?: {}): Plugin {
  return {
    name: 'html-render',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string) {
        return ejs.render(html, options)
      },
    },
  }
}

//html压缩，基于 https://github.com/terser/html-minifier-terser
const htmlMinify = function (options?: {}): Plugin {
  return {
    name: 'html-minify',
    transformIndexHtml: {
      enforce: 'post',
      transform(html: string) {
        const defaultMinifyOptions = {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
        }

        return minifierTerser.minify(html, Object.assign({}, defaultMinifyOptions, options || {}))
      },
    },
  }
}

/** index.html处理 */
export default function (options: HtmlTransform): Plugin[] {
  return [htmlRender(options.render), htmlMinify(options.minify)]
}
