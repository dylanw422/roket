// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::api::shell::open;
use tauri::{Window, Manager};  // Import the Manager trait for shell_scope

// Mark the function as a Tauri command
#[tauri::command]
fn open_in_browser(window: Window, url: String) {
    // Use the shell_scope method from the Manager trait
    open(&window.shell_scope(), url, None).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_in_browser])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

