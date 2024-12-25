<script setup lang="ts">
import { winHide } from "./tray";
</script>

<template>
  <div
    @keydown="$event.key === 'Escape' && winHide()"
    data-tauri-drag-region
    class="flex items-center justify-center min-h-screen"
    style="background-color: rgba(255, 255, 255, 0.9)"
  >
    <div data-tauri-drag-region class="w-full max-w-md p-4">
      <textarea
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows="6"
        placeholder="在这里输入内容..."
      ></textarea>
    </div>
  </div>
</template>
