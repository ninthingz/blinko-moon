<script setup lang="ts">
import { RouterView } from "vue-router";
import { register } from "@tauri-apps/plugin-global-shortcut";
import { invoke } from "@tauri-apps/api/core";
import { winShowFocus } from "./tray";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import createTray from "./tray";

const router = useRouter();
const route = useRoute();

register("Alt+B", async (event) => {
  if (event.state === "Pressed") {
    const [x, y] = await invoke<number[]>("get_mouse_coordinates");
    winShowFocus(x, y);
    router.push("/");
    if (route.path !== "/") {
    }
  }
});
onMounted(() => {
  createTray();
});
</script>

<template>
  <RouterView />
</template>
