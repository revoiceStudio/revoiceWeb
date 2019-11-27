module.exports = {
  publicPath: '',
  outputDir: '../app',
  devServer: {
    proxy: {
      '/todayQuiz': {
        target: 'http://15.164.93.96:5000/todayQuiz',
        changeOrigin: true,
        pathRewrite: {
          '^/todayQuiz': ''
        }
      }
    }
  }
}