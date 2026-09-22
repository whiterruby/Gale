// One browsable endpoint: latency badge, load stats and quick actions.
import React from 'react';
import { Zap, Info, Power, Loader2 } from 'lucide-react';
import type { VpnServer } from '../types';
import { useGaleStore } from '../store';
import { t } from '../locales';
import { StarIcon, StarFilledIcon } from './GaleIcons';
import { pingTier, formatPing, formatSpeed, formatUptime } from '../utils/format';

function pingTone(ping: number): string {
  const tier = pingTier(ping);
  if (tier === 'good') return 'text-moss border-sage/30 bg-sage/10';
  if (tier === 'mid') return 'text-amberDeep border-amberMirai/30 bg-amberMirai/10';
  return 'text-terracotta border-terracotta/30 bg-terracotta/10';
}

export const ServerCard: React.FC<{ server: VpnServer }> = ({ server }) => {
  const { favorites, toggleFavorite, status, activeServerId, connect, disconnect, openDetails, language } = useGaleStore();
  const isFav = favorites.includes(server.id);
  const isActive = activeServerId === server.id && status !== 'disconnected';
  const isThisConnected = activeServerId === server.id && status === 'connected';
  const isThisConnecting = activeServerId === server.id && status === 'connecting';
  const busyOther = status === 'connecting' && !isThisConnecting;

  return (
    <div
      className={`p-4 bg-cream/70 border rounded-2xl flex items-center gap-4 transition hover:shadow-mirai ${
        isActive ? 'border-amberMirai' : 'border-transparent hover:border-line'
      }`}
    >
      {/* Country code medallion */}
      <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amberMirai to-terracotta flex items-center justify-center text-white text-sm font-bold font-mono shrink-0 shadow-sm">
        {server.country_code}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-ink truncate">
            {server.city} <span className="text-muted font-normal">· {server.country}</span>
          </p>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wide ${
              server.tier === 'plus' ? 'text-amberDeep border-amberMirai/40 bg-blush' : 'text-moss border-sage/30 bg-sage/10'
            }`}
          >
            {server.tier === 'plus' ? t('plus_badge', language) : t('free_badge', language)}
          </span>
        </div>
        <p className="text-xs text-muted font-mono truncate mt-0.5">
          {server.host}:{server.port} · {server.protocol.toUpperCase()}
        </p>
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted">
          <span className={`px-2 py-0.5 rounded-full border font-mono ${pingTone(server.ping_ms)}`}>
            {formatPing(server.ping_ms)}
          </span>
          <span>{formatSpeed(server.speed_mbps)}</span>
          <span>
            {server.sessions} {t('sessions', language).toLowerCase()}
          </span>
          <span>{formatUptime(server.uptime_pct)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => toggleFavorite(server.id)}
          className="w-8 h-8 rounded-full bg-cardBg border border-line flex items-center justify-center text-muted hover:text-amberDeep transition"
          title={isFav ? t('favorite_remove', language) : t('favorite_add', language)}
        >
          {isFav ? <StarFilledIcon size={15} className="text-amberDeep" /> : <StarIcon size={15} />}
        </button>
        <button
          onClick={() => openDetails(server.id)}
          className="w-8 h-8 rounded-full bg-cardBg border border-line flex items-center justify-center text-muted hover:text-ink transition"
          title={t('details', language)}
        >
          <Info className="w-4 h-4" />
        </button>
        <button
          onClick={() => (isThisConnected ? disconnect() : connect(server.id))}
          disabled={busyOther}
          className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition disabled:opacity-50 ${
            isThisConnected ? 'bg-sage text-white hover:opacity-90' : 'bg-ink text-paper hover:opacity-90'
          }`}
        >
          {isThisConnecting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isThisConnected ? (
            <Power className="w-3.5 h-3.5" />
          ) : (
            <Zap className="w-3.5 h-3.5" />
          )}
          {isThisConnected
            ? t('connected', language)
            : isThisConnecting
              ? t('connecting', language)
              : t('connect', language)}
        </button>
      </div>
    </div>
  );
};
