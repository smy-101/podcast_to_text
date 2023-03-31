import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from 'path';

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(),react()],
  resolve: {
    alias: {
      // 将 "@" 设置为路径 "/src"
      '@': _resolve('src'),
    },
    extensions: ['.js', '.ts']
  },
})
