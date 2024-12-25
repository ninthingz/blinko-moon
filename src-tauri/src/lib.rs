// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg(target_os = "windows")]
#[tauri::command]
fn get_mouse_coordinates() -> (i32, i32) {
    use std::mem;
    use winapi::shared::windef::POINT;
    use winapi::um::winuser::GetCursorPos;

    unsafe {
        let mut point: POINT = mem::zeroed();
        GetCursorPos(&mut point);
        (point.x, point.y)
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_mouse_coordinates])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
