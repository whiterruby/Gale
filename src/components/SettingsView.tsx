// Prefs: language, theme, auto-connect, kill-switch and about.
import React from 'react';
import { useGaleStore } from '../store';
import { t } from '../locales';
import type { Language } from '../types';

function Toggle({ on, onFlip }: { on: boolean; onFlip: () => void }) {
  return (
    <button
      onClick={onFlip}
      className={`w-11 h-6 rounded-full p-1 transition ${on ? 'bg-sage' : 'bg-paperDeep border border-line'}`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}

export const SettingsView: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    autoConnect,
    setAutoConnect,
    killSwitch,
    setKillSwitch,
  } = useGaleStore();

  return (
    <div className="flex-1 overflow-auto h-full p-6 bg-transparent">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="bg-cardBg border border-line rounded-[20px] p-5 shadow-mirai space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{t('settings_language', language)}</span>
            <div className="inline-flex items-center bg-cream border border-line rounded-full p-1 gap-0.5">
              {(['tr', 'en', 'ru'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase transition-all ${
                    language === l ? 'bg-ink text-paper shadow-sm' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{t('settings_theme', language)}</span>
            <div className="inline-flex items-center bg-cream border border-line rounded-full p-1 gap-0.5">
              {(['light', 'dark'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setTheme(m)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                    theme === m ? 'bg-ink text-paper shadow-sm' : 'text-muted hover:text-ink'
                  }`}
                >
                  {m === 'light' ? t('theme_light', language) : t('theme_dark', language)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-ink">{t('settings_autoconnect', language)}</span>
            <Toggle on={autoConnect} onFlip={() => setAutoConnect(!autoConnect)} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-ink">{t('settings_killswitch', language)}</span>
            <Toggle on={killSwitch} onFlip={() => setKillSwitch(!killSwitch)} />
          </div>
        </div>

        <div className="bg-cardBg border border-line rounded-[20px] p-5 shadow-mirai">
          <h3 className="font-serif text-base text-ink mb-1.5">{t('settings_about', language)}</h3>
          <p className="text-xs text-muted leading-relaxed">{t('settings_about_text', language)}</p>
        </div>
      </div>
    </div>
  );
};
