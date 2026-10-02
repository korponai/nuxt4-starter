import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Disable sourcemaps in production
  sourcemap: false,

  // Enable Nuxt 4 directory structure and features
  future: {
    compatibilityVersion: 4,
  },

  // Modules list
  modules: ["nuxt-auth-utils"],

  // Vite build configurations
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["vuetify"],
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "vuetify",
        "vuetify/components",
        "vuetify/directives",
        "vuetify/iconsets/mdi",
      ],
    },
    build: {
      sourcemap: false,
    },
  },

  hooks: {
    "vite:extendConfig"(config) {
      if (config.esbuild && config.oxc !== false) {
        delete config.esbuild;
      }
    },
  },

  // PostCSS configuration to silence warnings from dependencies (e.g. cssnano calc division in Vuetify)
  postcss: {
    plugins: {
      cssnano: {
        preset: [
          "default",
          {
            calc: false,
          },
        ],
      },
    },
  },

  // Global styles registration
  css: ["~/assets/css/main.css"],

  // Runtime environment variables configuration
  runtimeConfig: {
    session: {
      password:
        process.env.NUXT_SESSION_PASSWORD ||
        process.env.SESSION_PASSWORD ||
        (process.env.NODE_ENV === "production"
          ? ""
          : "development-only-session-secret-key-min-32-chars-long!"),
    },
    adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
    public: {
      appName: process.env.APP_NAME || "Nuxt 4 Starter",
    },
  },
});
