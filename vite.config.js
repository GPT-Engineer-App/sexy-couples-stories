import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import daisyui from "daisyui";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5555ff",
          secondary: "#d946ef",
          accent: "#0000ff",
          neutral: "#ff00ff",
          "base-100": "#fff",
          info: "#0000ff",
          success: "#00ff00",
          warning: "#ff9900",
          error: "#ff0000",
        },
      },
    ],
  },
});
