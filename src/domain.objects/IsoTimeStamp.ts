import type { AsOfGlossary } from 'domain-glossaries';

/**
 * .what = exact instant in history
 * .why = unambiguous UTC timestamp for events, logs, records
 * .format = yyyy-MM-ddTHH:mm:ssZ
 */
export type IsoTimeStamp = AsOfGlossary<string, 'iso-time.IsoTimeStamp'>;

/**
 * .what = exact day in history
 * .why = unambiguous date for appointments, deadlines, milestones
 * .format = yyyy-MM-dd
 * .note = IsoTimeStamp is assignable to IsoDateStamp (more precise → less precise)
 */
export type IsoDateStamp = AsOfGlossary<
  string,
  'iso-time.IsoDateStamp' | 'iso-time.IsoTimeStamp'
>;

/**
 * .what = exact month in history
 * .why = unambiguous month for billing periods, reports
 * .format = yyyy-MM
 */
export type IsoMonthStamp = AsOfGlossary<string, 'iso-time.IsoMonthStamp'>;

/**
 * .what = exact year in history
 * .why = unambiguous year for annual records
 * .format = yyyy
 */
export type IsoYearStamp = AsOfGlossary<string, 'iso-time.IsoYearStamp'>;
