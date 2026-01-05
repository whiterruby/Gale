// Zustand store — servers, connection, filters and UI prefs.
import { create } from 'zustand';
import type { ConnectionStatus, Language, VpnServer, VpnTier } from './types';
import { vpnApi } from './api';

export type GaleTab = 'servers' | 'favorites' | 'settings';

interface GaleStore {
  servers: VpnServer[];
  favorites: string[];
  status: ConnectionStatus;
  activeServerId: string | null;
  connectedSince: number | null;
  exitIp: string | null;
  isLoading: boolean;

  query: string;
  country: string; // '' = all
  tier: 'all' | VpnTier;
  activeTab: GaleTab;
  language: Language;
  theme: 'light' | 'dark';
  autoConnect: boolean;
  killSwitch: boolean;
  detailsServerId: string | null;

  setQuery: (q: string) => void;
  setCountry: (c: string) => void;
  setTier: (tier: 'all' | VpnTier) => void;
  setActiveTab: (tab: GaleTab) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setAutoConnect: (v: boolean) => void;
  setKillSwitch: (v: boolean) => void;
  toggleFavorite: (id: string) => void;
  openDetails: (id: string | null) => void;

  loadServers: () => Promise<void>;
  refreshLatencies: () => Promise<void>;
  connect: (id: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

function readLocal(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode — ignore */
  }
}

export const useGaleStore = create<GaleStore>((set, get) => ({
  servers: [],
  favorites: [],
  status: 'disconnected',
  activeServerId: null,
  connectedSince: null,
  exitIp: null,
  isLoading: false,

  query: '',
  country: '',
  tier: 'all',
  activeTab: 'servers',
  language: (readLocal('gale_lang', 'tr') as Language) || 'tr',
  theme: (readLocal('gale_theme', 'dark') as 'light' | 'dark') || 'dark',
  autoConnect: false,
  killSwitch: true,
  detailsServerId: null,

  setQuery: (query) => set({ query }),
  setCountry: (country) => set({ country }),
  setTier: (tier) => set({ tier }),
  setActiveTab: (activeTab) => set({ activeTab }),

  setLanguage: (language) => {
    set({ language });
    writeLocal('gale_lang', language);
  },
  setTheme: (theme) => {
    set({ theme });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    writeLocal('gale_theme', theme);
  },
  toggleTheme: () => {
    get().setTheme(get().theme === 'light' ? 'dark' : 'light');
  },
  setAutoConnect: (autoConnect) => set({ autoConnect }),
  setKillSwitch: (killSwitch) => set({ killSwitch }),
  toggleFavorite: (id) => {
    const favs = get().favorites;
    set({ favorites: favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id] });
  },
  openDetails: (detailsServerId) => set({ detailsServerId }),

  loadServers: async () => {
    set({ isLoading: true });
    try {
      const servers = await vpnApi.fetchServers();
      set({ servers });
      if (get().autoConnect && get().status === 'disconnected' && servers.length > 0) {
        const fastest = [...servers].sort((a, b) => a.ping_ms - b.ping_ms)[0];
        await get().connect(fastest.id);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  refreshLatencies: async () => {
    set({ isLoading: true });
    try {
      const servers = await vpnApi.refreshLatencies(get().servers);
      set({ servers });
    } finally {
      set({ isLoading: false });
    }
  },

  connect: async (id) => {
    if (get().status === 'connecting') return;
    // Switching gates: drop the old tunnel first.
    if (get().status === 'connected') {
      await vpnApi.disconnectServer();
    }
    set({ status: 'connecting', activeServerId: id });
    try {
      const info = await vpnApi.connectToServer(id);
      set({
        status: 'connected',
        activeServerId: info.server_id,
        exitIp: info.exit_ip,
        connectedSince: info.started_at,
      });
    } catch {
      set({ status: 'disconnected', activeServerId: null, exitIp: null, connectedSince: null });
    }
  },

  disconnect: async () => {
    await vpnApi.disconnectServer();
    set({ status: 'disconnected', activeServerId: null, exitIp: null, connectedSince: null });
  },
}));
