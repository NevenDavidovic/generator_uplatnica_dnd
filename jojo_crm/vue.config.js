const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // Add any Less configuration here
        javascriptEnabled: true, // Example option
      },
    },
  },
});
