import path from "path"
import { VueLoaderPlugin } from "vue-loader"
import HtmlPlugin from "html-webpack-plugin"
import ExtraCssChunksPlugin from "extract-css-chunks-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import OptimizeCssPlugin from "optimize-css-assets-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import CopyPlugin from "copy-webpack-plugin"

const mode = process.env.NODE_ENV
const isBundleAnalyzer = process.env.npm_config_report ? true : false

const sourceDir = "./client"

const webpackConfig = {
  entry: { main: sourceDir + "/main.js" },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  },
  mode: mode,
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader", include: path.resolve(sourceDir) },
      {
        test: /\.svg$/,
        loader: "vue-svg-loader",
        options: {
          svgo: {
            plugins: [{ removeDimensions: true }, { removeViewBox: false }]
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: path.resolve(sourceDir),
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.css$/,
        use: [
          ExtraCssChunksPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          ExtraCssChunksPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" },
          { loader: "stylus-loader" }
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to <template lang="pug"> in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"]
          },
          // this applies to pug imports inside JavaScript
          {
            use: ["pug-loader"]
          }
        ]
      }
    ]
  },
  output: { path: path.resolve("dist"), publicPath: "./", filename: "js/[name].[chunkhash:7].js" },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssPlugin()],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all", enforce: true },
        styles: {
          name: "common",
          test: /\.styl(us)?$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CopyPlugin([{ from: "client/public", to: "../dist" }]),
    new VueLoaderPlugin(),
    new ExtraCssChunksPlugin({ filename: "css/[name].[chunkhash:7].css" }),
    new HtmlPlugin({ template: path.resolve(sourceDir + "/index.pug"), chunksSortMode: "dependency", inject: false })
  ]
}

if (isBundleAnalyzer == true) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackConfig
