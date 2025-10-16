import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),       // your React app entry
        tracker: path.resolve(__dirname, "src/tracker.ts") // standalone tracker
      },
      output: {
        // keep names separate for multiple outputs
        entryFileNames: (chunk) => chunk.name === "tracker" ? "tracker.js" : "[name].js",
      }
    },
    outDir: "public", // output to public so it can be loaded externally
    emptyOutDir: false, // don't delete React build output
    lib: {
      entry: path.resolve(__dirname, "src/tracker.ts"),
      name: "OnflowTracker",
      formats: ["iife"], // standalone script for embedding
      fileName: "tracker",
    },
  },
  define: {
    "process.env": process.env, // if needed
  },
}));
