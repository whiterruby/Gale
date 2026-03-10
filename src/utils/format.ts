// Formatting helpers — keep ServerCard presentation logic in one place.

/** Round-trip tier for the latency badge. */
export function pingTier(pingMs: number): 'good' | 'mid' | 'bad' {
  if (pingMs < 60) return 'good';
  if (pingMs < 130) return 'mid';
  return 'bad';
}

export function formatPing(pingMs: number): string {
  return `${pingMs} ms`;
}

export function formatSpeed(mbps: number): string {
  return `${mbps.toFixed(0)} Mb/s`;
}

export function formatUptime(pct: number): string {
  return `${pct.toFixed(1)}%`;
}
