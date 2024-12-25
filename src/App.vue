<script setup lang="ts">
import { onMounted, ref } from "vue";
import { winHide, winShowFocus } from "./tray";
import { register } from "@tauri-apps/plugin-global-shortcut";
import { invoke } from "@tauri-apps/api/core";

register("Alt+B", async (event) => {
  if (event.state === "Pressed") {
    const [x, y] = await invoke<number[]>("get_mouse_coordinates");
    winShowFocus(x, y);
  }
});

const textarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  textarea.value?.focus();
});
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
        ref="textarea"
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows="6"
        placeholder="在这里输入内容..."
      ></textarea>
    </div>
  </div>
</template>
