module.exports = {
  publicPath: "",
  outputDir: "../app",
  indexPath: "dashboard.html",
  devServer: {
    proxy: {
      "/todayQuiz": {
        target: "http://13.209.69.224:5000/todayQuiz",
        changeOrigin: true,
        pathRewrite: {
          "^/todayQuiz": ""
        }
      },
      "/lastBread": {
        target: "http://13.209.69.224:5000/lastBread",
        changeOrigin: true,
        pathRewrite: {
          "^/lastBread": ""
        }
      }
    }
  }
};
