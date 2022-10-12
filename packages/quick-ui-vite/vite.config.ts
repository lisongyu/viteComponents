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
      assetFileNames: `[name].css`,
      globals: {
        vue: "Vue",
      },
    },
  };

export default defineConfig({
  alias: {
    'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
},
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  },

    // 添加库模式配置

    build: {
        rollupOptions,
        minify: 'terser', // boolean | 'terser' | 'esbuild'
        sourcemap: true, // 输出单独 source文件
        brotliSize: true,  // 生成压缩大小报告
       
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