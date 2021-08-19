module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            // 配置使用 autoprefixer
            overrideBrowserslist: ['last 15 versions'],
          }),
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            selectorBlackList: ['ig'],
            propList: ['*'],
            exclude: /node_modules/,
          }),
        ],
      },
    },
  },
  devServer: {
    open: true, // npm run serve后自动打开页面
    port: 9527, // 开发服务器运行端口号
    proxy: {
      '/apis': {
        target: 'https://alex188.cn/h5app',
        changeOrigin: true, // 支持跨域 是否修改请求头中的host
        ws: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/apis': '',
        },
      },
      // 可以跨域多个
      // '/test': {
      //   target: 'https://api.xxxx.cn',
      //   changeOrigin: true, // 支持跨域
      //   pathRewrite: {
      //     '^/test': ''
      //   }
      // }
      // },
    },
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          // 要公用的scss的路径
          resources: './src/sass/index.scss',
        })
        .end();
    });
  },
};
