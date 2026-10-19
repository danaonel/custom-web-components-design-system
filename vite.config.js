import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        register: resolve(
          __dirname,
          "src/core/register-auto.ts",
        ),
        react: resolve(__dirname, "src/react/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
  },
});