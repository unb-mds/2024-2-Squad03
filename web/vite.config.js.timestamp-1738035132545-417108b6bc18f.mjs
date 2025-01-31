// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///mnt/c/Users/camil/OneDrive/%C3%81rea%20de%20Trabalho/Projeto%20de%20MDS%20(AcheiUnB)/2024-2-AcheiUnB/web/node_modules/vite/dist/node/index.js";
import vue from "file:///mnt/c/Users/camil/OneDrive/%C3%81rea%20de%20Trabalho/Projeto%20de%20MDS%20(AcheiUnB)/2024-2-AcheiUnB/web/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///mnt/c/Users/camil/OneDrive/%C3%81rea%20de%20Trabalho/Projeto%20de%20MDS%20(AcheiUnB)/2024-2-AcheiUnB/web/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path from "path";
var __vite_injected_original_dirname = "/mnt/c/Users/camil/OneDrive/\xC1rea de Trabalho/Projeto de MDS (AcheiUnB)/2024-2-AcheiUnB/web";
var __vite_injected_original_import_meta_url = "file:///mnt/c/Users/camil/OneDrive/%C3%81rea%20de%20Trabalho/Projeto%20de%20MDS%20(AcheiUnB)/2024-2-AcheiUnB/web/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue(), vueDevTools()],
  css: {
    postcss: "./postcss.config.cjs"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  base: "static/dist/",
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "../API/AcheiUnB/static/dist"),
    manifest: true,
    emptyOutDir: true,
    assetsDir: "static/dist/assets",
    // Pasta onde as imagens e outros arquivos estáticos serão armazenados
    rollupOptions: {
      output: {
        // Define o nome dos arquivos JS
        entryFileNames: "js/[name]-[hash].js",
        // Define o nome dos arquivos de assets (imagens, fontes)
        assetFileNames: "assets/[name]-[hash][extname]"
        // As imagens serão armazenadas em 'static/dist/assets/'
      }
    }
  },
  // Adicionando uma configuração global para que o Vite processe as imagens corretamente
  assetsInclude: [
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.gif",
    "**/*.svg",
    "**/*.webp"
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvY2FtaWwvT25lRHJpdmUvXHUwMEMxcmVhIGRlIFRyYWJhbGhvL1Byb2pldG8gZGUgTURTIChBY2hlaVVuQikvMjAyNC0yLUFjaGVpVW5CL3dlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL21udC9jL1VzZXJzL2NhbWlsL09uZURyaXZlL1x1MDBDMXJlYSBkZSBUcmFiYWxoby9Qcm9qZXRvIGRlIE1EUyAoQWNoZWlVbkIpLzIwMjQtMi1BY2hlaVVuQi93ZWIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL21udC9jL1VzZXJzL2NhbWlsL09uZURyaXZlLyVDMyU4MXJlYSUyMGRlJTIwVHJhYmFsaG8vUHJvamV0byUyMGRlJTIwTURTJTIwKEFjaGVpVW5CKS8yMDI0LTItQWNoZWlVbkIvd2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgdnVlRGV2VG9vbHMoKV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IFwiLi9wb3N0Y3NzLmNvbmZpZy5janNcIixcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYmFzZTogXCJzdGF0aWMvZGlzdC9cIixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vQVBJL0FjaGVpVW5CL3N0YXRpYy9kaXN0XCIpLFxuICAgIG1hbmlmZXN0OiB0cnVlLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIGFzc2V0c0RpcjogXCJzdGF0aWMvZGlzdC9hc3NldHNcIiwgLy8gUGFzdGEgb25kZSBhcyBpbWFnZW5zIGUgb3V0cm9zIGFycXVpdm9zIGVzdFx1MDBFMXRpY29zIHNlclx1MDBFM28gYXJtYXplbmFkb3NcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBEZWZpbmUgbyBub21lIGRvcyBhcnF1aXZvcyBKU1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJqcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG5cbiAgICAgICAgLy8gRGVmaW5lIG8gbm9tZSBkb3MgYXJxdWl2b3MgZGUgYXNzZXRzIChpbWFnZW5zLCBmb250ZXMpXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdXCIsIC8vIEFzIGltYWdlbnMgc2VyXHUwMEUzbyBhcm1hemVuYWRhcyBlbSAnc3RhdGljL2Rpc3QvYXNzZXRzLydcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICAvLyBBZGljaW9uYW5kbyB1bWEgY29uZmlndXJhXHUwMEU3XHUwMEUzbyBnbG9iYWwgcGFyYSBxdWUgbyBWaXRlIHByb2Nlc3NlIGFzIGltYWdlbnMgY29ycmV0YW1lbnRlXG4gIGFzc2V0c0luY2x1ZGU6IFtcbiAgICBcIioqLyoucG5nXCIsXG4gICAgXCIqKi8qLmpwZ1wiLFxuICAgIFwiKiovKi5qcGVnXCIsXG4gICAgXCIqKi8qLmdpZlwiLFxuICAgIFwiKiovKi5zdmdcIixcbiAgICBcIioqLyoud2VicFwiLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStjLFNBQVMsZUFBZSxXQUFXO0FBRWxmLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFMakIsSUFBTSxtQ0FBbUM7QUFBbVAsSUFBTSwyQ0FBMkM7QUFRN1UsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7QUFBQSxFQUM5QixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVEsS0FBSyxRQUFRLGtDQUFXLDZCQUE2QjtBQUFBLElBQzdELFVBQVU7QUFBQSxJQUNWLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQTtBQUFBLElBRVgsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixnQkFBZ0I7QUFBQTtBQUFBLFFBR2hCLGdCQUFnQjtBQUFBO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxlQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
