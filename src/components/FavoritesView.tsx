// Starred gates, fastest first.
import React, { useMemo } from 'react';
import { useGaleStore } from '../store';
import { t } from '../locales';
import { ServerCard } from './ServerCard';
import { StarIcon } from './GaleIcons';

export const FavoritesView: React.FC = () => {
  const { servers, favorites, language } = useGaleStore();

  const starred = useMemo(
    () =>
      servers
        .filter((s) => favorites.includes(s.id))
        .sort((a, b) => a.ping_ms - b.ping_ms),
    [servers, favorites],
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden p-6 gap-4 bg-transparent">
      <div className="flex-1 overflow-auto rounded-[20px] bg-cardBg backdrop-blur-xl shadow-mirai p-3 space-y-2.5">
        {starred.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted text-sm gap-3">
            <span className="w-14 h-14 rounded-2xl bg-cream border border-line flex items-center justify-center">
              <StarIcon size={26} className="text-muted/50" />
            </span>
            {t('no_favorites', language)}
          </div>
        ) : (
          starred.map((s) => <ServerCard key={s.id} server={s} />)
        )}
      </div>
    </div>
  );
};
