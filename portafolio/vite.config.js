import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const gitRev = (() => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
})()

export default defineConfig({
  plugins: [
    {
      name: 'inject-git-rev',
      transform(code) {
        if (!code.includes('__GIT_REV__')) return null
        return code.replaceAll('__GIT_REV__', JSON.stringify(gitRev))
      },
    },
    react(),
    tailwindcss(),
  ],
})
