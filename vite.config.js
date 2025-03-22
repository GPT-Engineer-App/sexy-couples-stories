
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import daisyui from "daisyui";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), daisyui],
  server: {
    port: 8080
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0c8de4",
          secondary: "#d946ef",
          accent: "#0071c2",
          neutral: "#64748b",
          "base-100": "#fff",
          info: "#0c8de4",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
});
