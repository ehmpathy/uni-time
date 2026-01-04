import type { AsOfGlossary } from 'domain-glossaries';
import type { PickAny } from 'type-fns';

/**
 * .what = duration between two instants
 * .why = represent time spans for arithmetic
 * .note = all fields optional via PickAny; supports years and months
 */
export type IsoDuration = AsOfGlossary<
  PickAny<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }>,
  'iso-time.IsoDuration',
  false
>;
