import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@view": path.resolve(__dirname, "src/view"),
      "@router": path.resolve(__dirname, "/src/Router/"),
      "@assets": path.resolve(__dirname, "/src/assets/"),
    },
  },
});
