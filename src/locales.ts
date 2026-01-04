// i18n dictionary (TR/EN/RU) and lookup helper.
import type { Language } from './types';

export const translations: Record<string, { tr: string; en: string; ru: string }> = {
  app_subtitle: { tr: 'Designed by whiteruby', en: 'Designed by whiteruby', ru: 'Designed by whiteruby' },
  tab_servers: { tr: 'Sunucular', en: 'Servers', ru: 'Серверы' },
  tab_favorites: { tr: 'Favoriler', en: 'Favorites', ru: 'Избранное' },
  tab_settings: { tr: 'Ayarlar', en: 'Settings', ru: 'Настройки' },
  search_placeholder: { tr: 'Ülke, şehir veya host ara…', en: 'Search country, city or host…', ru: 'Поиск страны, города или хоста…' },
  all_countries: { tr: 'Tümü', en: 'All', ru: 'Все' },
  tier_all: { tr: 'Tümü', en: 'All tiers', ru: 'Все тарифы' },
  tier_free: { tr: 'Ücretsiz', en: 'Free', ru: 'Бесплатные' },
  tier_plus: { tr: 'Plus', en: 'Plus', ru: 'Plus' },
  free_badge: { tr: 'Ücretsiz', en: 'Free', ru: 'Free' },
  plus_badge: { tr: 'Plus', en: 'Plus', ru: 'Plus' },
  favorite_add: { tr: 'Favorilere ekle', en: 'Add to favorites', ru: 'В избранное' },
  favorite_remove: { tr: 'Favorilerden çıkar', en: 'Remove from favorites', ru: 'Убрать из избранного' },
  refresh: { tr: 'Yenile', en: 'Refresh', ru: 'Обновить' },
  no_servers: { tr: 'Filtreye uyan sunucu yok.', en: 'No servers match the filter.', ru: 'Нет серверов по фильтру.' },
  no_favorites: { tr: 'Henüz favori yok — yıldızla ekle.', en: 'No favorites yet — tap the star.', ru: 'Пока пусто — нажмите на звезду.' },
  server_count: { tr: 'sunucu', en: 'servers', ru: 'серверов' },
  connect: { tr: 'Bağlan', en: 'Connect', ru: 'Подключить' },
  disconnect: { tr: 'Kes', en: 'Disconnect', ru: 'Отключить' },
  connecting: { tr: 'Bağlanıyor…', en: 'Connecting…', ru: 'Подключение…' },
  connected: { tr: 'Bağlı', en: 'Connected', ru: 'Подключено' },
  disconnected: { tr: 'Bağlı değil', en: 'Disconnected', ru: 'Отключено' },
  ping: { tr: 'Gecikme', en: 'Ping', ru: 'Пинг' },
  sessions: { tr: 'Oturum', en: 'Sessions', ru: 'Сессии' },
  uptime: { tr: 'Çalışma', en: 'Uptime', ru: 'Аптайм' },
  speed: { tr: 'Hız', en: 'Speed', ru: 'Скорость' },
  details: { tr: 'Detay', en: 'Details', ru: 'Детали' },
  protocol: { tr: 'Protokol', en: 'Protocol', ru: 'Протокол' },
  last_checked: { tr: 'Son kontrol', en: 'Last checked', ru: 'Проверен' },
  copy_ovpn: { tr: '.ovpn Kopyala', en: 'Copy .ovpn', ru: 'Скопировать .ovpn' },
  copied: { tr: 'Kopyalandı ✓', en: 'Copied ✓', ru: 'Скопировано ✓' },
  download_ovpn: { tr: '.ovpn İndir', en: 'Download .ovpn', ru: 'Скачать .ovpn' },
  status_label: { tr: 'Durum', en: 'Status', ru: 'Статус' },
  session_time: { tr: 'Süre', en: 'Session', ru: 'Сессия' },
  no_active_server: { tr: 'Bağlanmak için listeden bir sunucu seç.', en: 'Pick a server from the list to connect.', ru: 'Выберите сервер из списка.' },
  settings_language: { tr: 'Dil', en: 'Language', ru: 'Язык' },
  settings_theme: { tr: 'Tema', en: 'Theme', ru: 'Тема' },
  theme_light: { tr: 'Açık', en: 'Light', ru: 'Светлая' },
  theme_dark: { tr: 'Koyu', en: 'Dark', ru: 'Тёмная' },
  settings_autoconnect: { tr: 'En hızlı sunucuya otomatik bağlan', en: 'Auto-connect fastest server', ru: 'Автоподключение к быстрому' },
  settings_killswitch: { tr: 'Kill-switch (bağlantı koparsa interneti kes)', en: 'Kill-switch (block net on drop)', ru: 'Kill-switch (блок при обрыве)' },
  on: { tr: 'Açık', en: 'On', ru: 'Вкл' },
  off: { tr: 'Kapalı', en: 'Off', ru: 'Выкл' },
  settings_about: { tr: 'Hakkında', en: 'About', ru: 'О приложении' },
  settings_about_text: { tr: 'Gale, herkese açık OpenVPN sunucularını tek listede toplar. Yapılandırmalar gömülüdür — dosya indirmeden tek tıkla bağlanılır.', en: 'Gale collects public OpenVPN servers in one list. Configs are embedded — one click connects, no file downloads.', ru: 'Gale собирает публичные OpenVPN-серверы в один список. Конфиги встроены — подключение в один клик без скачивания файлов.' },
};

export function t(key: string, lang: Language): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}
