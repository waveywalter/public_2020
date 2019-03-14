console.log("VUE CONFIGGGGGGGGGGGGG")

module.exports = {
    devServer: {
      overlay: {
        warnings: true,
        errors: true,
        
      },
      port:9000,
      disableHostCheck: true
    },
    runtimeCompiler: true,
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
      }
  }