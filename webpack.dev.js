const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const postcssCustomProperties = require("postcss-custom-properties");
const autoprefixer = require("autoprefixer");
const tailwindCss = require("tailwindcss");
const tailwindCssNesting = require("tailwindcss/nesting");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  //mode
  mode: "development",
  devtool: 'inline-source-map',
  //entries
  entry: {
    index: "./src/index.js",
  },

  //outputs
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  //Webpack plugins
  plugins: [
    new HtmlWebpackPlugin({
      //This plugin makes a html file that can be configured below
      template: "./src/index.html",
      favicon: "./src/images/favicon-32x32.png"
    }),
    new MiniCssExtractPlugin(), //This plugin makes CSS files if you include them in js
  ],

  //Optimization options
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), //This plugin minimizes CSS in production
      new TerserPlugin({
        //This plugin minimizes JS
        test: /\.js(\?.*)?$/i,
        extractComments: false, //To prevent extracting comments to an external file
      }),
    ],

    runtimeChunk: "single",

    splitChunks: {
      //This is used to cache vendors like react, etc.
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,

          name: "vendors",

          chunks: "all",
        },
      },
    },
  },
  //This is to ensure compatibility with ReactJS while using preact
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat", // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  module: {
    //This section determines how various file types are processed with webpack
    rules: [
      {
        //CSS files
        test: /\.css$/i,
        use: [
          //MiniCssExtractPlugin loader is used instead of style-loader
          //since CSS is no longer being appended with JS
          MiniCssExtractPlugin.loader,

          //CSS Loader
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, //import following loader(s)
            },
          },

          //PostCSS loader to integrate postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                //PostCSS' plugins are imported and configured here
                plugins: [
                  //1. postcss-custom-properties to process CSS custom properties for older browsers
                  //   preserve is set to false; to disallow preserving custom properties after processing them
                  postcssCustomProperties({ preserve: false }),

                  //2. autoprefixer
                  autoprefixer(),

                  //3. tailwind-css
                  //   configured in its own file to avoid extending this one
                  tailwindCssNesting(),
                  tailwindCss(),
                ],
              },
            },
          },
        ],
      },
      {
        //Image files
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        //HTML documents
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        //JS files
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          //Babel loader for browser compatibility and react
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            "plugins": [
              [
                "@babel/plugin-transform-react-jsx",
                {
                  "throwIfNamespace": false, // defaults to true
                  "runtime": "automatic", // defaults to classic
                  "importSource": "preact" // defaults to react
                }
              ]
            ]
          },
        },
      },
    ],
  },
};
