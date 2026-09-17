// Small ticker hook — re-renders once a second while the tunnel is up.
// Extracted from ConnectWidget so the interval logic is testable in isolation.
import { useEffect, useState } from 'react';

export function useElapsed(active: boolean): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [active]);
  return tick;
}
