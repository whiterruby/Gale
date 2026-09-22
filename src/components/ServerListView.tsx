// Browsable catalog: search, country chips, tier filter and refresh.
import React, { useMemo } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { useGaleStore } from '../store';
import { t } from '../locales';
import { ServerCard } from './ServerCard';

export const ServerListView: React.FC = () => {
  const {
    servers,
    isLoading,
    query,
    setQuery,
    country,
    setCountry,
    tier,
    setTier,
    language,
    refreshLatencies,
  } = useGaleStore();

  const countries = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of servers) {
      if (!map.has(s.country_code)) map.set(s.country_code, s.country);
    }
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [servers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return servers
      .filter((s) => (country ? s.country_code === country : true))
      .filter((s) => (tier === 'all' ? true : s.tier === tier))
      .filter((s) =>
        q ? `${s.country} ${s.city} ${s.host}`.toLowerCase().includes(q) : true,
      )
      .sort((a, b) => a.ping_ms - b.ping_ms);
  }, [servers, query, country, tier]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden p-6 gap-4 bg-transparent">
      {/* Search + refresh bar */}
      <div className="bg-cardBg border border-line rounded-[20px] p-3 flex items-center gap-3 shadow-mirai">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder', language)}
            aria-label={t('search_placeholder', language)}
            className="w-full bg-cream border border-line rounded-full pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-amberMirai/40 focus:bg-cardBg transition"
          />
        </div>
        <div className="flex items-center gap-1 bg-cream border border-line rounded-full p-1" role="group" aria-label="Tier filter">
          {(['all', 'free', 'plus'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setTier(f)}
              aria-pressed={tier === f}
              aria-label={f === 'all' ? t('tier_all', language) : f === 'free' ? t('tier_free', language) : t('tier_plus', language)}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition ${
                tier === f ? 'bg-ink text-paper shadow-sm' : 'text-muted hover:text-ink'
              }`}
            >
              {f === 'all' ? t('tier_all', language) : f === 'free' ? t('tier_free', language) : t('tier_plus', language)}
            </button>
          ))}
        </div>
        <button
          onClick={() => refreshLatencies()}
          disabled={isLoading}
          className="h-9 px-4 rounded-full bg-ink text-paper text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          {t('refresh', language)}
        </button>
      </div>

      {/* Country chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto px-1 pb-1">
        <button
          onClick={() => setCountry('')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition ${
            !country ? 'bg-ink text-paper border-ink' : 'bg-cardBg border-line text-muted hover:text-ink'
          }`}
        >
          {t('all_countries', language)}
        </button>
        {countries.map(([code, name]) => (
          <button
            key={code}
            onClick={() => setCountry(code)}
            title={name}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold border whitespace-nowrap transition ${
              country === code ? 'bg-ink text-paper border-ink' : 'bg-cardBg border-line text-muted hover:text-ink'
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted font-medium px-1">
        {filtered.length} {t('server_count', language)}
      </p>

      {/* Cards */}
      <div className="flex-1 overflow-auto rounded-[20px] bg-cardBg backdrop-blur-xl shadow-mirai p-3 space-y-2.5">
        {isLoading && servers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <RefreshCw className="w-8 h-8 text-amberMirai animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-sm text-muted">
            {t('no_servers', language)}
          </div>
        ) : (
          filtered.map((s) => <ServerCard key={s.id} server={s} />)
        )}
      </div>
    </div>
  );
};
