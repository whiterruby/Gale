// Curated mock catalog (UI stage). The real backend will refresh this
// hourly from public VPN Gate-style mirrors and embedded .ovpn blobs.
import type { VpnServer } from '../types';

export const MOCK_SERVERS: VpnServer[] = [
  { id: 'tr-ist-01', country_code: 'TR', country: 'Turkey', city: 'Istanbul', host: 'tr-ist-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 18, sessions: 412, uptime_pct: 99.2, speed_mbps: 84.5, tier: 'free', last_checked: '2026-01-14T09:20:00Z' },
  { id: 'tr-ank-01', country_code: 'TR', country: 'Turkey', city: 'Ankara', host: 'tr-ank-01.gale.network', port: 443, protocol: 'tcp', ping_ms: 24, sessions: 187, uptime_pct: 98.7, speed_mbps: 61.2, tier: 'free', last_checked: '2026-01-14T09:18:00Z' },
  { id: 'de-fra-01', country_code: 'DE', country: 'Germany', city: 'Frankfurt', host: 'de-fra-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 42, sessions: 1204, uptime_pct: 99.8, speed_mbps: 210.4, tier: 'free', last_checked: '2026-01-14T09:22:00Z' },
  { id: 'de-fra-02', country_code: 'DE', country: 'Germany', city: 'Frankfurt', host: 'de-fra-02.gale.network', port: 443, protocol: 'tcp', ping_ms: 47, sessions: 860, uptime_pct: 99.5, speed_mbps: 178.9, tier: 'plus', last_checked: '2026-01-14T09:21:00Z' },
  { id: 'nl-ams-01', country_code: 'NL', country: 'Netherlands', city: 'Amsterdam', host: 'nl-ams-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 51, sessions: 2310, uptime_pct: 99.9, speed_mbps: 320.1, tier: 'free', last_checked: '2026-01-14T09:23:00Z' },
  { id: 'nl-ams-02', country_code: 'NL', country: 'Netherlands', city: 'Amsterdam', host: 'nl-ams-02.gale.network', port: 1194, protocol: 'udp', ping_ms: 55, sessions: 640, uptime_pct: 99.1, speed_mbps: 190.7, tier: 'plus', last_checked: '2026-01-14T09:19:00Z' },
  { id: 'uk-lon-01', country_code: 'GB', country: 'United Kingdom', city: 'London', host: 'uk-lon-01.gale.network', port: 443, protocol: 'tcp', ping_ms: 58, sessions: 1530, uptime_pct: 99.6, speed_mbps: 165.3, tier: 'free', last_checked: '2026-01-14T09:20:00Z' },
  { id: 'fr-par-01', country_code: 'FR', country: 'France', city: 'Paris', host: 'fr-par-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 60, sessions: 980, uptime_pct: 99.3, speed_mbps: 142.8, tier: 'free', last_checked: '2026-01-14T09:17:00Z' },
  { id: 'ch-zur-01', country_code: 'CH', country: 'Switzerland', city: 'Zurich', host: 'ch-zur-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 63, sessions: 320, uptime_pct: 99.9, speed_mbps: 240.0, tier: 'plus', last_checked: '2026-01-14T09:22:00Z' },
  { id: 'se-sto-01', country_code: 'SE', country: 'Sweden', city: 'Stockholm', host: 'se-sto-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 66, sessions: 410, uptime_pct: 99.4, speed_mbps: 188.2, tier: 'free', last_checked: '2026-01-14T09:16:00Z' },
  { id: 'pl-war-01', country_code: 'PL', country: 'Poland', city: 'Warsaw', host: 'pl-war-01.gale.network', port: 443, protocol: 'tcp', ping_ms: 62, sessions: 275, uptime_pct: 98.9, speed_mbps: 120.5, tier: 'free', last_checked: '2026-01-14T09:15:00Z' },
  { id: 'us-nyc-01', country_code: 'US', country: 'United States', city: 'New York', host: 'us-nyc-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 118, sessions: 3120, uptime_pct: 99.7, speed_mbps: 280.6, tier: 'free', last_checked: '2026-01-14T09:21:00Z' },
  { id: 'us-nyc-02', country_code: 'US', country: 'United States', city: 'New York', host: 'us-nyc-02.gale.network', port: 443, protocol: 'tcp', ping_ms: 124, sessions: 1490, uptime_pct: 99.5, speed_mbps: 205.9, tier: 'plus', last_checked: '2026-01-14T09:20:00Z' },
  { id: 'ca-tor-01', country_code: 'CA', country: 'Canada', city: 'Toronto', host: 'ca-tor-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 132, sessions: 720, uptime_pct: 99.2, speed_mbps: 150.4, tier: 'free', last_checked: '2026-01-14T09:18:00Z' },
  { id: 'sg-sin-01', country_code: 'SG', country: 'Singapore', city: 'Singapore', host: 'sg-sin-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 168, sessions: 890, uptime_pct: 99.6, speed_mbps: 175.0, tier: 'free', last_checked: '2026-01-14T09:19:00Z' },
  { id: 'jp-tyo-01', country_code: 'JP', country: 'Japan', city: 'Tokyo', host: 'jp-tyo-01.gale.network', port: 443, protocol: 'tcp', ping_ms: 182, sessions: 1040, uptime_pct: 99.4, speed_mbps: 160.8, tier: 'plus', last_checked: '2026-01-14T09:17:00Z' },
  { id: 'jp-osa-01', country_code: 'JP', country: 'Japan', city: 'Osaka', host: 'jp-osa-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 189, sessions: 390, uptime_pct: 98.8, speed_mbps: 132.6, tier: 'free', last_checked: '2026-01-14T09:16:00Z' },
  { id: 'br-sao-01', country_code: 'BR', country: 'Brazil', city: 'Sao Paulo', host: 'br-sao-01.gale.network', port: 1194, protocol: 'udp', ping_ms: 205, sessions: 510, uptime_pct: 98.5, speed_mbps: 98.3, tier: 'free', last_checked: '2026-01-14T09:15:00Z' },
];

/** Minimal embedded client template — the real catalog ships per-gate
 *  configs with certs; the UI injects host/port/proto at connect time. */
export const SAMPLE_OVPN_TEMPLATE = [
  'client',
  'dev tun',
  'proto {proto}',
  'remote {host} {port}',
  'resolv-retry infinite',
  'nobind',
  'persist-key',
  'persist-tun',
  'remote-cert-tls server',
  'cipher AES-256-GCM',
  'verb 3',
  '<ca>',
  '# (gate CA ships with the embedded catalog)',
  '</ca>',
].join('\n');

export function renderOvpn(server: Pick<VpnServer, 'host' | 'port' | 'protocol'>): string {
  return SAMPLE_OVPN_TEMPLATE
    .replace('{proto}', server.protocol)
    .replace('{host}', server.host)
    .replace('{port}', String(server.port));
}
