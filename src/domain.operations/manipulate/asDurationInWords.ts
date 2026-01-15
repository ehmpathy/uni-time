import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import { asIsoDurationShape } from '@src/domain.operations/normalize/asIsoDurationShape';

const DURATION_ORDER = [
  'years',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
] as const;

type Unit = (typeof DURATION_ORDER)[number];

const SHORT_LABELS: Record<Unit, string> = {
  years: 'y',
  months: 'mo',
  weeks: 'w',
  days: 'd',
  hours: 'h',
  minutes: 'm',
  seconds: 's',
  milliseconds: 'ms',
};

/**
 * .what = stringify an IsoDuration into short human words
 * .why  = minimum-surface-area: one obvious input, safe defaults
 * .how  =
 *   - order: years → ms
 *   - skip zeros
 *   - max 2 nonzero units
 *   - compact labels (e.g. 2h 5m)
 *   - fallback "0s" when all zero
 */
export const asDurationInWords = (duration: IsoDuration): string => {
  // normalize to object shape (handles both string and object formats)
  const shape = asIsoDurationShape(duration);

  const norm: Record<Unit, number> = Object.fromEntries(
    DURATION_ORDER.map((u) => {
      const n = Number(shape[u] ?? 0);
      return [u, Number.isFinite(n) ? Math.max(0, n) : 0];
    }),
  ) as Record<Unit, number>;

  const parts: string[] = [];
  for (const u of DURATION_ORDER) {
    const v = norm[u];
    if (!v) continue;
    parts.push(`${v}${SHORT_LABELS[u]}`);
    if (parts.length === 2) break;
  }

  return parts.length ? parts.join(' ') : '0s';
};
