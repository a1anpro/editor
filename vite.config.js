import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { viteMockServe } from "vite-plugin-mock"
export default defineConfig({
  plugins: [vue(), viteMockServe()],
  resolve: {
    alias: {
      "@": resolve("src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/styles/theme.less";'
      },
      scss: {
        additionalData: '@import "@/styles/theme.scss";'
      }
    }
  }
})
