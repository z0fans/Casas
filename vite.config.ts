import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Vite options tailored for Tauri development
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },

  build: {
    // 显式指定 rollup 的输入文件，避免 Windows 路径问题
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
    // 确保输出目录正确
    outDir: "dist",
    // 清空输出目录
    emptyOutDir: true,
  },
});
