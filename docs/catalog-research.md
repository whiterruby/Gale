# OpenVPN Catalog Research — Nov 2024

> How Gale will collect thousands of public gates without file downloads.

## Sources surveyed

- **VPN Gate (Tsukuba)** — daily mirrors, ~4k concurrent relays. CSV + `.ovpn` blobs, needs HTML scraping + cert extraction.
- **vpngate.net fork mirrors** — same format, different latency. ~30% overlap with main, useful for de-dup.
- **community lists (GitHub, forums)** — scattered `.ovpn` packs, often stale. Seed for cold-start only.

## Findings

- Every gate ships a full `.ovpn` (ca + remote + proto). Embedding it per-gate ~2–4 KB — 1000 gates ≈ 3 MB catalog, acceptable for Tauri bundle.
- Health signals needed before surfacing: `ping`, `sessions`, `uptime`, `speed`. All public in the Gate CSV — we can pre-score before probing.
- **No file downloads at connect time**: UI will render `host:port/proto` from the embedded blob and hand the rendered profile to the backend via `connect_vpn(server_id)` — backend writes a temp `.ovpn` and spawns `openvpn --config`.

## Next

Catalog builder (Rust) will fetch → parse → embed → ship with the app. UI already mocks the final shape (see `src/data/servers.ts:renderOvpn`).
