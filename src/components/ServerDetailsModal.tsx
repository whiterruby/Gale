// Gate inspector: health stats, embedded .ovpn copy/download and connect.
import React, { useState } from 'react';
import { X, Zap, Copy, Check, Download } from 'lucide-react';
import { useGaleStore } from '../store';
import { t } from '../locales';
import { renderOvpn } from '../data/servers';

export const ServerDetailsModal: React.FC = () => {
  const { servers, detailsServerId, openDetails, connect, status, language } = useGaleStore();
  const [copied, setCopied] = useState(false);
  const server = servers.find((s) => s.id === detailsServerId) ?? null;

  if (!server) return null;

  const ovpn = renderOvpn(server);
  const busy = status === 'connecting';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ovpn);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — download stays available */
    }
  };

  const handleDownload = () => {
    const blob = new Blob([ovpn], { type: 'application/x-openvpn-profile' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${server.id}.ovpn`;
    // Must be in DOM for Firefox; revoke after tick so download can start.
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const rows: Array<[string, string]> = [
    [t('protocol', language), `${server.protocol.toUpperCase()} :${server.port}`],
    [t('ping', language), `${server.ping_ms} ms`],
    [t('speed', language), `${server.speed_mbps.toFixed(1)} Mb/s`],
    [t('sessions', language), String(server.sessions)],
    [t('uptime', language), `${server.uptime_pct.toFixed(1)}%`],
    [t('last_checked', language), server.last_checked.slice(0, 16).replace('T', ' ')],
  ];

  return (
    <div className="fixed inset-0 bg-modalOverlay backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cardBg border border-line rounded-[24px] max-w-md w-full p-6 space-y-4 shadow-mirai">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amberMirai to-terracotta flex items-center justify-center text-white text-xs font-bold font-mono">
              {server.country_code}
            </span>
            <div>
              <h3 className="font-serif text-base text-ink leading-tight">
                {server.city} · {server.country}
              </h3>
              <p className="text-[11px] text-muted font-mono">{server.host}</p>
            </div>
          </div>
          <button
            onClick={() => openDetails(null)}
            className="w-8 h-8 rounded-full bg-cream border border-line flex items-center justify-center text-muted hover:text-ink"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-cream/60 border border-line rounded-2xl divide-y divide-line/50">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-2 text-xs">
              <span className="text-muted font-medium">{k}</span>
              <span className="text-ink font-mono">{v}</span>
            </div>
          ))}
        </div>

        <pre className="bg-paperDeep border border-line rounded-2xl p-3 text-[10px] font-mono text-muted overflow-x-auto max-h-32 overflow-y-auto">
          {ovpn}
        </pre>

        <div className="flex items-center gap-2">
          <button
            onClick={() => connect(server.id)}
            disabled={busy}
            className="flex-1 py-2.5 bg-ink text-paper rounded-full text-xs font-medium flex items-center justify-center gap-1.5 hover:opacity-90 disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            {t('connect', language)}
          </button>
          <button
            onClick={handleCopy}
            className="px-3.5 py-2.5 bg-cardBg border border-line text-ink rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-cream"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-moss" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t('copied', language) : t('copy_ovpn', language)}
          </button>
          <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-full bg-cardBg border border-line flex items-center justify-center text-muted hover:text-ink"
            title={t('download_ovpn', language)}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
