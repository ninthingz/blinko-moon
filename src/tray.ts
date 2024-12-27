import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";
import { PhysicalPosition } from "@tauri-apps/api/dpi";
import { router } from "./router";

export default async function tray_init() {
  const menu = await Menu.new({
    items: [
      {
        id: "settings",
        text: "设置",
        action: async () => {
          await winShowFocus(0, 0);
          router.push("/settings");
        },
      },
      {
        id: "quit",
        text: "退出",
        action: async () => {
          await exit();
        },
      },
    ],
  });

  return menu;
}

export async function winShowFocus(x: number, y: number) {
  // 获取窗体实例
  const win = getCurrentWindow();
  // 检查窗口是否见，如果不可见则显示出来
  if (!(await win.isVisible())) {
    if (x && y) {
      await win.setPosition(new PhysicalPosition(x, y));
    }
    win.show();
    await win.setFocus();
  } else {
    // 检查是否处于最小化状态，如果处于最小化状态则解除最小化
    if (await win.isMinimized()) {
      await win.unminimize();
    }
    // 窗口置顶
    if (x && y) {
      await win.setPosition(new PhysicalPosition(x, y));
    }
    await win.setFocus();
  }
}

export async function winHide() {
  const win = getCurrentWindow();
  await win.hide();
}
