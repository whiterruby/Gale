// Binary entry point — the real setup lives in lib.rs (Tauri mobile support).
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  gale_lib::run()
}
