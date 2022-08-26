// Gale backend stub (UI stage).
// Roadmap: drive a real OpenVPN tunnel here (openvpn3 / management
// interface) and stream status events back to the frontend.
// Until then every command below returns mock data so the UI is clickable.

use serde::Serialize;

#[derive(Serialize)]
struct ConnectReport {
  server_id: String,
  exit_ip: String,
  started_at: u64,
}

fn now_unix() -> u64 {
  std::time::SystemTime::now()
    .duration_since(std::time::UNIX_EPOCH)
    .map(|d| d.as_secs())
    .unwrap_or(0)
}

#[tauri::command]
fn connect_vpn(server_id: String) -> Result<ConnectReport, String> {
  // TODO: write embedded .ovpn to a temp dir and spawn openvpn --config.
  Ok(ConnectReport {
    server_id,
    exit_ip: "203.0.113.10".to_string(),
    started_at: now_unix(),
  })
}

#[tauri::command]
fn disconnect_vpn() -> Result<bool, String> {
  // TODO: kill the openvpn child process and flush routes/DNS.
  Ok(true)
}

#[tauri::command]
fn get_status() -> Result<serde_json::Value, String> {
  // TODO: query the management interface (state + bytecount).
  Ok(serde_json::json!({ "connected": false }))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      connect_vpn,
      disconnect_vpn,
      get_status
    ])
    .run(tauri::generate_context!())
    .expect("error while running Gale");
}
