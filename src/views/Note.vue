<script setup lang="ts">
import { onMounted, ref } from "vue";
import { winHide } from "../tray";
import { upsertNote } from "../api/notes";

const textarea = ref<HTMLTextAreaElement | null>(null);
const content = ref<string>("");

onMounted(() => {
  textarea.value?.focus();
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && e.ctrlKey) {
    upsertNote(content.value);
    winHide();
  }
};
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
        v-model="content"
        ref="textarea"
        @keydown="handleKeydown"
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows="6"
        placeholder="在这里输入内容..."
      ></textarea>
    </div>
  </div>
</template>
