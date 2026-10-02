import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin(async (nuxtApp) => {
  let activeTheme = "herbaTheme";
  try {
    const fetchFunc = useRequestFetch();
    const settings = await fetchFunc<Record<string, string>>('/api/settings');
    if (settings && settings.active_theme) {
      activeTheme = settings.active_theme;
    }
  } catch (e) {
    console.error("Failed to load active theme in Vuetify plugin:", e);
  }

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: activeTheme,
      themes: {
        herbaTheme: {
          dark: false,
          colors: {
            primary: "#2e7d32", // Organic green
            secondary: "#81c784", // Light green
            accent: "#4caf50",
            background: "#f7fafc",
            surface: "#ffffff",
            info: "#2196f3",
            success: "#4caf50",
            warning: "#fb8c00",
            error: "#ff5252",
          },
        },
        oceanTheme: {
          dark: false,
          colors: {
            primary: "#0a2540", // Deep ocean navy
            secondary: "#00d4b1b6", // Splash cyan
            accent: "#635bff", // Modern indigo accent
            background: "#f4f7fa",
            surface: "#ffffff",
            info: "#0ea5e9",
            success: "#00d4b1b6",
            warning: "#ffb900",
            error: "#ff2e2e",
          },
        },
        fashionTheme: {
          dark: false,
          colors: {
            primary: "#5c2d1b", // Chestnut terracotta brown
            secondary: "#d97706", // Warm amber
            accent: "#854d0e", // Golden harvest mustard
            background: "#fdfaf7",
            surface: "#ffffff",
            info: "#0284c7",
            success: "#15803d",
            warning: "#d97706",
            error: "#b91c1c",
          },
        },
        beachTheme: {
          dark: false,
          colors: {
            primary: "#dd6b20", // Warm solar orange
            secondary: "#ecc94b", // Sunny gold yellow
            accent: "#f6ad55", // Peach sand accent
            background: "#fffaf0",
            surface: "#ffffff",
            info: "#319795",
            success: "#319795",
            warning: "#ecc94b",
            error: "#e53e3e",
          },
        },
        babyTheme: {
          dark: false,
          colors: {
            primary: "#7c83fd", // Pastel periwinkle
            secondary: "#ffb4b4", // Soft rose pink
            accent: "#b5ffb4", // Pastel mint
            background: "#f5f6ff",
            surface: "#ffffff",
            info: "#93c5fd",
            success: "#a7f3d0",
            warning: "#fef3c7",
            error: "#fee2e2",
          },
        },
        cyberTheme: {
          dark: false,
          colors: {
            primary: "#6b21a8", // Cyber deep violet
            secondary: "#ec4899", // Electric neon magenta
            accent: "#06b6d4", // Cyber cyan
            background: "#f8fafc",
            surface: "#ffffff",
            info: "#06b6d4",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
