import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { cursorPosition, getCurrentWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";
import { LogicalPosition, PhysicalPosition } from "@tauri-apps/api/dpi";

export default async function tray_init() {
  const menu = await Menu.new({
    items: [
      {
        id: "quit",
        text: "退出",
        action: async () => {
          // 退出逻辑
          await exit();
        },
      },
    ],
  });

  const options = {
    icon: "icons/128x128.png",
    menu,
    menuOnLeftClick: false,
    // 托盘行为
    action: (event: any) => {
      if (
        event.type === "Click" &&
        event.button === "Left" &&
        event.buttonState === "Down"
      ) {
        console.log("单击事件");
        // 显示窗口
        winShowFocus(0, 0);
      }
    },
  };

  const tray = await TrayIcon.new(options);
  return tray;
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
