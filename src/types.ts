// Shared domain types for the Gale frontend.

export type Language = 'tr' | 'en' | 'ru';

export type VpnProtocol = 'udp' | 'tcp';

export type VpnTier = 'free' | 'plus';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

/** One browsable OpenVPN endpoint. Configs stay embedded — no file downloads. */
export interface VpnServer {
  id: string;
  country_code: string; // ISO-3166 alpha-2, e.g. "DE"
  country: string; // English display name (localized names land with the backend)
  city: string;
  host: string; // remote hostname from the embedded .ovpn
  port: number;
  protocol: VpnProtocol;
  ping_ms: number; // last measured round-trip, refreshed by the client
  sessions: number; // active user sessions reported by the gate
  uptime_pct: number; // 30-day availability, 0-100
  speed_mbps: number; // median measured throughput
  tier: VpnTier;
  last_checked: string; // ISO timestamp of the last health probe
}

export interface ConnectionInfo {
  server_id: string;
  exit_ip: string;
  started_at: number; // unix seconds
}
