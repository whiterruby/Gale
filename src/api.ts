// Mock transport layer (UI stage). Same shape the Tauri backend will
// expose later: list → connect → disconnect, plus latency refresh.
import type { ConnectionInfo, VpnServer } from './types';
import { MOCK_SERVERS } from './data/servers';

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function jitter(ping: number): number {
  const delta = Math.round((Math.random() - 0.5) * ping * 0.3);
  return Math.max(5, ping + delta);
}

export const vpnApi = {
  /** Full catalog fetch (simulated network latency). */
  fetchServers: async (): Promise<VpnServer[]> => {
    await wait(450);
    return MOCK_SERVERS.map((s) => ({ ...s }));
  },

  /** Re-probe round-trips without refetching the catalog. */
  refreshLatencies: async (servers: VpnServer[]): Promise<VpnServer[]> => {
    await wait(700);
    return servers.map((s) => ({ ...s, ping_ms: jitter(s.ping_ms) }));
  },

  /** One-click connect — backend will inject the embedded .ovpn here. */
  connectToServer: async (serverId: string): Promise<ConnectionInfo> => {
    await wait(1100);
    return {
      server_id: serverId,
      exit_ip: '203.0.113.10',
      started_at: Math.floor(Date.now() / 1000),
    };
  },

  disconnectServer: async (): Promise<boolean> => {
    await wait(350);
    return true;
  },
};
