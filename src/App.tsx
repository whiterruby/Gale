// Root shell: sidebar nav, connection widget and view routing.
import React, { useEffect } from 'react';
import { useGaleStore } from './store';
import { ServerListView } from './components/ServerListView';
import { FavoritesView } from './components/FavoritesView';
import { SettingsView } from './components/SettingsView';
import { ServerDetailsModal } from './components/ServerDetailsModal';
import { ConnectWidget } from './components/ConnectWidget';
import { GaleLogo, ServerIcon, StarIcon, MoonIcon, SunIcon } from './components/GaleIcons';
import { ShieldIcon } from './components/GaleIcons';
import { t } from './locales';

export default function App() {
  const {
    servers,
    favorites,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setTheme,
    loadServers,
    detailsServerId,
  } = useGaleStore();

  // Bootstrap: theme class is already "dark" from index.html; hydrate catalog.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    loadServers();
  }, []);

  return (
    <div className="relative flex h-screen w-screen bg-transparent text-ink font-sans select-none overflow-hidden">
      {/* Blurred gradient backdrop (no image asset needed) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blush via-paper to-paperDeep dark:from-[#1C1A17] dark:via-[#141311] dark:to-[#2A1F14]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amberMirai/20 blur-[100px]" />
        <div className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full bg-terracotta/20 blur-[110px]" />
      </div>

      {/* ---- Sidebar ---- */}
      <div className="w-[280px] border-r border-line bg-sidebarBg backdrop-blur-2xl flex flex-col justify-between shrink-0 shadow-lg relative z-10">
        <div>
          <div className="p-6 border-b border-line flex items-center gap-3.5">
            <div className="w-[52px] h-[52px] rounded-[18px] bg-gradient-to-br from-amberMirai to-terracotta flex items-center justify-center shadow-mirai relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-white/10 rounded-[18px]" />
              <GaleLogo className="text-white relative z-10" size={34} />
              <div className="absolute inset-[7px] border border-white/20 rounded-[12px]" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-serif font-semibold text-[22px] leading-none tracking-tight text-ink">Gale</h1>
              <p className="text-[11px] tracking-[0.14em] text-muted font-medium mt-0.5 uppercase">Designed by whiteruby</p>
            </div>
          </div>

          {/* Language switcher + theme toggle */}
          <div className="px-5 pt-4 pb-2 flex items-center gap-2">
            <div className="inline-flex items-center bg-cream backdrop-blur-md border border-line rounded-full p-1 gap-0.5">
              {(['tr', 'en', 'ru'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all ${
                    language === l ? 'bg-ink text-paper shadow-sm' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-cream backdrop-blur-md border border-line flex items-center justify-center text-muted hover:text-amberMirai transition-all"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <MoonIcon size={14} /> : <SunIcon size={14} />}
            </button>
          </div>

          {/* Tab navigation */}
          <nav className="px-3 py-3 space-y-1.5">
            <button
              onClick={() => setActiveTab('servers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-medium transition-all border ${
                activeTab === 'servers'
                  ? 'bg-cardBg border-amberMirai text-ink shadow-sm backdrop-blur-md'
                  : 'border-transparent text-muted hover:bg-cream hover:text-ink'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'servers' ? 'bg-amberMirai text-white' : 'bg-line text-moss'}`}>
                <ServerIcon size={18} />
              </span>
              <span className="truncate">{t('tab_servers', language)}</span>
              <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full border bg-cream border-line text-muted">{servers.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-medium transition-all border ${
                activeTab === 'favorites'
                  ? 'bg-cardBg border-amberMirai text-ink shadow-sm backdrop-blur-md'
                  : 'border-transparent text-muted hover:bg-cream hover:text-ink'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'favorites' ? 'bg-amberMirai text-white' : 'bg-line text-moss'}`}>
                <StarIcon size={18} />
              </span>
              <span className="truncate">{t('tab_favorites', language)}</span>
              <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full border bg-cream border-line text-muted">{favorites.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-medium transition-all border ${
                activeTab === 'settings'
                  ? 'bg-cardBg border-amberMirai text-ink shadow-sm backdrop-blur-md'
                  : 'border-transparent text-muted hover:bg-cream hover:text-ink'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'settings' ? 'bg-amberMirai text-white' : 'bg-line text-moss'}`}>
                <ShieldIcon size={18} />
              </span>
              <span>{t('tab_settings', language)}</span>
            </button>
          </nav>

          <div className="px-6 pt-6 opacity-40">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-line to-transparent" />
            <p className="font-serif text-[10px] tracking-[0.18em] text-muted/60 text-center mt-3 uppercase">— gale —</p>
          </div>
        </div>

        <div className="p-5">
          <ConnectWidget />
        </div>
      </div>

      {/* ---- Main content ---- */}
      <div className="flex-1 flex flex-col overflow-hidden bg-transparent relative z-10">
        {activeTab === 'servers' && <ServerListView />}
        {activeTab === 'favorites' && <FavoritesView />}
        {activeTab === 'settings' && <SettingsView />}
      </div>

      {detailsServerId && <ServerDetailsModal />}
    </div>
  );
}
