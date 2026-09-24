// Tiny debounce — avoids hammering the catalog filter on every keystroke.
export function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let t: ReturnType<typeof setTimeout> | null = null;
  return ((...args: any[]) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args as Parameters<T>), ms);
  }) as T;
}
