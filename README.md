# Gale — Free OpenVPN Browser

Everyone keeps hunting for OpenVPN configs scattered across forums and
mirror sites — and half of them are dead on arrival. **Gale** collects
thousands of public OpenVPN gates in one searchable list and connects
with a single click. **No file downloads**: every configuration ships
embedded in the catalog.

> UI stage (January 2026): the full interface below runs against a mock
> catalog. The Rust backend that drives a real tunnel lands next.

## Features (UI)

- 🔍 Searchable server catalog (country, city, host) with latency sort
- ⚡ One-click connect + live session widget (status, exit IP, timer)
- ⭐ Favorites, per-gate detail modal, embedded `.ovpn` copy/download
- 🌍 TR / EN / RU interface, light & dark autumn theme (River system)
- 🛡️ Settings: auto-connect fastest gate, kill-switch toggle

## Stack

Tauri v2 · React 18 · TypeScript · Tailwind · Zustand · lucide-react —
same foundation as [River](https://github.com/whiterruby/River).

## Roadmap

1. **Backend**: spawn `openvpn --config` from the embedded profile via a
   Tauri command, parse the management interface for state/bytecount.
2. **Catalog sync**: hourly refresh from public VPN mirrors with health
   probes (ping / sessions / uptime).
3. **FUSE/drive export**: save working profiles straight to the pool.
4. **Mobile**: Android/iOS targets through Tauri mobile + WireGuard option.

## Develop

```bash
pnpm install
pnpm dev        # vite @ localhost:1421
pnpm tauri dev  # full desktop shell
```

## License

MIT — see [LICENSE](./LICENSE).
