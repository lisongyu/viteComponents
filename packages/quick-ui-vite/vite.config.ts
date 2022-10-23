/// <reference types="vitest" />
import { defineConfig, Plugin, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCss from "./config/unocss";
const rollupOptions = {
  external: ["vue"],
  output: {
    assetFileNames: `style.css`,
    globals: {
      vue: "Vue",
    },
  },
};

export const config = {
  plugins: [
    vue() as Plugin,
    // 添加JSX插件
    vueJsx() as Plugin,

    UnoCss() as Plugin[],
  ],
  build: {
    rollupOptions,
    minify: `terser`, // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    brotliSize: true, // 生成压缩大小报告
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "QuickUI",
      fileName: "quick-ui",
      formats: ["esm", "umd", "iife"], // 导出模块类型
    },
    outDir: "./dist",
  },

  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    // environment: 'happy-dom',
    environment: "happy-dom",
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/],
    },
    coverage: {
      provider: "istanbul", // or 'c8',
      reporter: ["text", "json", "html"],
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(config as UserConfig);
