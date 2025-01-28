import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { envDir, sourceDir, manualChunks } from "./scripts/build";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir);
  const base = "/";

  return {
    base,
    envDir,
    mode,
    resolve: {
      alias: {
        "@": sourceDir,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        },
      },
    },
    plugins: [vue()],
    server: {
      host: true,
      port: Number(env.VITE_APP_PORT),
      proxy: {
        "/openstreetmap": {
          target: "https://a.tile.openstreetmap.org/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/openstreetmap/, ""),
          bypass(req, res, options) {
            if (options.rewrite && req.url) {
              const proxyUrl = new URL(
                options.rewrite(req.url),
                options.target as string
              ).href;
              res.setHeader("x-req-proxyUrl", proxyUrl);
              console.info(proxyUrl); // 服务器打印访问代理地址
            }
          },
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks,
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          // drop_console: true,
          drop_debugger: true,
        },
      },
      chunkSizeWarningLimit: 600,
    },
  };
});
