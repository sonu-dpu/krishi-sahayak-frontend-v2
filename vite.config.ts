import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("@tanstack")) {
              return "vendor-tanstack";
            }
            if (id.includes("@clerk")) {
              return "vendor-clerk";
            }
            if (id.includes("firebase")) {
              return "vendor-firebase";
            }
            if (id.includes("@xyflow")) {
              return "vendor-xyflow";
            }
            if (id.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (id.includes("shiki")) {
              return "vendor-shiki";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("motion") || id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("@google") || id.includes("ai")) {
              return "vendor-ai";
            }
            if (id.includes("axios")) {
              return "vendor-axios";
            }
            if (id.includes("date-fns")) {
              return "vendor-date-fns";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
