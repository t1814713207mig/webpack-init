const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

module.exports = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const rewrite = [];
  const fileArr = glob.sync(path.join(__dirname, '../public/*.html'));
  fileArr.forEach((item) => {
    const match = item.match(/public\/(.*)\.html$/);
    const pagename = match && match[1];
    entry[pagename] = `./src/${pagename}.jsx`;
    rewrite.push({ from: new RegExp(`^\/${pagename}`), to: `/${pagename}.html` });
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `../public/${pagename}.html`),
        filename: `${pagename}.html`,
        chunks: [pagename],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
        },
      }),
    );
  });
  rewrite.push({ from: /./, to: '/index.html' });
  return { entry, htmlWebpackPlugins, rewrite };
};
