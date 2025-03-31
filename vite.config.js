import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Для тестирования React
    globals: true, // Чтобы не импортировать describe/test/expect в каждом файле
  },
});
