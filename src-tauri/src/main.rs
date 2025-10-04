// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod models;

use commands::{clash, multidesk};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            clash::detect_clash_ports,
            clash::find_clash_install_path,
            multidesk::read_multidesk_config,
            multidesk::write_multidesk_config,
            multidesk::auto_configure_proxy,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
