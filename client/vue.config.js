module.exports = {
  devServer: {
    port: "8080",
    proxy: {
      "/": {
        target: "http://0.0.0.0:3000/",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
