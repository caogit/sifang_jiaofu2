// 根据环境引入不同配置 process.env.NODE_ENV
// 暂时没有用到
const config = require('./env.' + process.env.VUE_APP_ENV);
module.exports = config;
