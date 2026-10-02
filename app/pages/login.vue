<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">Bejelentkezés</h2>
      
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">E-mail cím</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Jelszó</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50"
        >
          {{ loading ? 'Bejelentkezés...' : 'Belépés' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-sm font-semibold text-green-700 hover:underline">
          ← Vissza a kezdőlapra
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await navigateTo('/')
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Sikertelen bejelentkezés'
  } finally {
    loading.value = false
  }
}
</script>
