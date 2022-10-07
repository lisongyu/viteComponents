import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'

// import { presetUno, presetAttributify, presetIcons } from "unocss";
// import Unocss from "unocss/vite";
import Unocss from "./config/unocss";


// https://vitejs.dev/config/

const rollupOptions = {

    external: ["vue", "vue-router"],
   
    output: {
      assetFileNames: `assets/[name].css`,
      globals: {
        vue: "Vue",
      },
    },
  };

export default defineConfig({
 
    // 添加库模式配置

    build: {
        rollupOptions,
        minify:false,
       
        cssCodeSplit: true,   // 追加
      
        lib: {
          entry: "./src/entry.ts",
          name: "SmartyUI",
          fileName: "smarty-ui",
          // 导出模块格式
          formats: ["esm", "umd","iife"],
        },
      },
  plugins: [vue(),
      // 添加JSX插件
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      // 添加UnoCSS插件
      Unocss()
],

});
