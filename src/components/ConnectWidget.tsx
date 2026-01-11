// Sidebar footer: live tunnel status, session clock and kill button.
import React, { useEffect, useState } from 'react';
import { Power, Loader2 } from 'lucide-react';
import { useGaleStore } from '../store';
import { t } from '../locales';
import { ShieldIcon, BoltIcon } from './GaleIcons';

function formatElapsed(since: number | null): string {
  if (!since) return '00:00';
  const secs = Math.max(0, Math.floor(Date.now() / 1000) - since);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

export const ConnectWidget: React.FC = () => {
  const { status, activeServerId, servers, connectedSince, exitIp, disconnect, language } = useGaleStore();
  const [, setTick] = useState(0);
  const server = servers.find((s) => s.id === activeServerId) ?? null;

  // Re-render once a second while connected so the session clock ticks.
  useEffect(() => {
    if (status !== 'connected') return;
    const id = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const dot =
    status === 'connected' ? 'bg-sage' : status === 'connecting' ? 'bg-amberDeep animate-pulse' : 'bg-terracotta';

  return (
    <div className="bg-cardBg backdrop-blur-xl border border-line rounded-[20px] p-4 shadow-mirai">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[11px] tracking-[0.12em] text-muted uppercase font-semibold flex items-center gap-1.5">
          <ShieldIcon size={13} className="text-terracotta" />
          {t('status_label', language)}
        </span>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          {status === 'connected'
            ? t('connected', language)
            : status === 'connecting'
              ? t('connecting', language)
              : t('disconnected', language)}
        </span>
      </div>

      {server ? (
        <div className="text-xs text-muted space-y-1 font-medium">
          <p className="text-ink font-semibold text-sm truncate">
            {server.country_code} · {server.city}
          </p>
          <div className="flex justify-between">
            <span>{t('session_time', language)}</span>
            <span className="font-mono text-ink">{formatElapsed(connectedSince)}</span>
          </div>
          {exitIp && (
            <div className="flex justify-between">
              <span>Exit IP</span>
              <span className="font-mono text-ink">{exitIp}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[11px] text-muted leading-relaxed">{t('no_active_server', language)}</p>
      )}

      <button
        onClick={() => disconnect()}
        disabled={status === 'disconnected'}
        className="w-full mt-3.5 flex items-center justify-center gap-1.5 py-2.5 bg-ink hover:opacity-90 text-paper rounded-full text-xs font-medium transition disabled:opacity-40"
      >
        {status === 'connecting' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Power className="w-3.5 h-3.5" />
        )}
        <span>{status === 'connecting' ? t('connecting', language) : t('disconnect', language)}</span>
      </button>

      <p className="text-[10px] text-muted/50 text-center mt-3 tracking-wide flex items-center justify-center gap-1">
        <BoltIcon size={10} />
        Gale v0.1 — whiteruby
      </p>
    </div>
  );
};
