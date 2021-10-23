import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@/": `${path.resolve(__dirname, "src")}/`,
        },
    },
    plugins: [reactRefresh()],
    server: {
        host: true,
    },
});
