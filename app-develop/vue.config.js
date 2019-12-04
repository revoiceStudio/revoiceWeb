module.exports = {
  publicPath: '',
  outputDir: '../app',
  indexPath: 'dashboard.html',
  devServer: {
    proxy: {
      '/todayQuiz': {
        target: 'http://15.164.93.96:5000/todayQuiz',
        changeOrigin: true,
        pathRewrite: {
          '^/todayQuiz': ''
        }
      },
      '/lastBread': {
        target: 'http://15.164.93.96:5000/lastBread',
        changeOrigin: true,
        pathRewrite: {
          '^/lastBread': ''
        }
      }
    }
  }
}