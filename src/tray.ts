import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";

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
        winShowFocus();
      }
    },
  };

  const tray = await TrayIcon.new(options);
  return tray;
}

async function winShowFocus() {
  // 获取窗体实例
  const win = getCurrentWindow();
  // 检查窗口是否见，如果不可见则显示出来
  if (!(await win.isVisible())) {
    win.show();
  } else {
    // 检查是否处于最小化状态，如果处于最小化状态则解除最小化
    if (await win.isMinimized()) {
      await win.unminimize();
    }
    // 窗口置顶
    await win.setFocus();
  }
}

export async function winHide() {
  const win = getCurrentWindow();
  await win.hide();
}
