// Gale icon set — thin-stroke autumn style, same visual language as River.
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

function base(size: number, className?: string, children?: React.ReactNode) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Swirling gust — the Gale mark. */
export function GaleLogo({ size = 36, className }: IconProps) {
  return base(
    size,
    className,
    <>
      <path d="M3 8h9a3 3 0 1 0-3-3" />
      <path d="M3 12h13a3 3 0 1 1-3 3" />
      <path d="M3 16h6a2.5 2.5 0 1 1-2.5 2.5" />
      <circle cx="19" cy="6" r="1.4" fill="currentColor" stroke="none" />
    </>,
  );
}

/** Server rack node. */
export function ServerIcon({ size = 18, className }: IconProps) {
  return base(
    size,
    className,
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
    </>,
  );
}

/** Shield with check — kill-switch / secure state. */
export function ShieldIcon({ size = 18, className }: IconProps) {
  return base(
    size,
    className,
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-4" />
    </>,
  );
}

/** Lightning bolt — speed / quick connect. */
export function BoltIcon({ size = 18, className }: IconProps) {
  return base(size, className, <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />);
}

/** Hollow star — favorite toggle. */
export function StarIcon({ size = 18, className }: IconProps) {
  return base(
    size,
    className,
    <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8L12 3z" />,
  );
}

/** Filled star — active favorite. */
export function StarFilledIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8L12 3z" />
    </svg>
  );
}

/** Sun / moon pair for the theme toggle. */
export function SunIcon({ size = 14, className }: IconProps) {
  return base(
    size,
    className,
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>,
  );
}

export function MoonIcon({ size = 14, className }: IconProps) {
  return base(size, className, <path d="M20 13.5A8 8 0 1 1 10.5 4 6.5 6.5 0 0 0 20 13.5z" />);
}
