<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-800">
    <div class="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-6">
        <v-icon icon="mdi-rocket-launch" size="32" />
      </div>
      <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Nuxt 4 + Prisma Starter</h1>
      <p class="text-gray-500 mb-8">
        Full-stack template with Tailwind CSS v4, Vuetify 3, nuxt-auth-utils and OpenSpec.
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-left">
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div class="text-xs font-bold text-green-700 uppercase">Framework</div>
          <div class="font-semibold text-gray-800 mt-1">Nuxt 4 / Vue 3</div>
        </div>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div class="text-xs font-bold text-green-700 uppercase">Database</div>
          <div class="font-semibold text-gray-800 mt-1">Prisma ORM</div>
        </div>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div class="text-xs font-bold text-green-700 uppercase">Styling</div>
          <div class="font-semibold text-gray-800 mt-1">Tailwind + Vuetify</div>
        </div>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div class="text-xs font-bold text-green-700 uppercase">AI Ready</div>
          <div class="font-semibold text-gray-800 mt-1">OpenSpec (SDD)</div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          to="/login"
          class="px-5 py-2.5 rounded-xl font-bold bg-green-700 text-white hover:bg-green-800 transition-colors shadow-sm"
        >
          {{ user ? 'Fiók kezelése' : 'Bejelentkezés' }}
        </NuxtLink>
        <a
          href="https://nuxt.com/docs"
          target="_blank"
          rel="noopener"
          class="px-5 py-2.5 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Nuxt Dokumentáció
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession()
</script>
