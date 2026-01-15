import type { PickAny } from 'type-fns';

/**
 * .what = duration as structured object
 * .why = enables programmatic manipulation of duration components
 * .note = no brand needed; the union type IsoDuration provides the brand
 */
export type IsoDurationShape = PickAny<{
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}>;
