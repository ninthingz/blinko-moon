<template>
  <div class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="space-y-4">
          <div>
            <label
              for="secret-token"
              class="block text-sm font-medium text-gray-700"
            >
              Secret Token
            </label>
            <input
              id="secret-token"
              v-model="secretToken"
              type="password"
              class="mt-1 block p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your secret token"
            />
          </div>

          <button
            @click="saveSettings"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { winHide } from "../tray";

const secretToken = ref("");

onMounted(() => {
  // 加载已保存的token
  const savedToken = localStorage.getItem("SECRET_TOKEN");
  if (savedToken) {
    secretToken.value = savedToken;
  }
});

const saveSettings = () => {
  localStorage.setItem("SECRET_TOKEN", secretToken.value);
  winHide();
};
</script>
