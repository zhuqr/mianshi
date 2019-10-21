"use strict";
module.exports = {

  lintOnSave: false,
  productionSourceMap: false,
  assetsDir: "static",
  devServer: {
    publicPath: "/",
    host: "0.0.0.0",
    port: 9000,
    useLocalIp: true,
    proxy: {
      "^/demo": {
        target: "http://localhost:3000/",
        changeOrigin: true
      },
    },
    open: "chrome",
    hotOnly: true
  },

};