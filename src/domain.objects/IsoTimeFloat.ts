import type { AsOfGlossary } from 'domain-glossaries';

/**
 * @what = time of day pattern
 * @why = detached time for schedules, store hours, standups
 * @format = HH:mm:ss
 */
export type IsoTimeFloat = AsOfGlossary<string, 'iso-time.IsoTimeFloat'>;

/**
 * .what = hour of day pattern
 * .why = detached hour for hourly schedules
 * .format = HH (00-23)
 */
export type IsoHourFloat = AsOfGlossary<string, 'iso-time.IsoHourFloat'>;

/**
 * .what = minute of hour pattern
 * .why = detached minute for minute-level patterns
 * .format = mm (00-59)
 */
export type IsoMinuteFloat = AsOfGlossary<string, 'iso-time.IsoMinuteFloat'>;

/**
 * .what = month of year pattern
 * .why = detached month for annual renewals, fiscal periods
 * .format = MM (01-12)
 */
export type IsoMonthFloat = AsOfGlossary<string, 'iso-time.IsoMonthFloat'>;

/**
 * .what = day of month pattern
 * .why = detached day for monthly due dates, paydays
 * .format = dd (01-31)
 */
export type IsoDayFloat = AsOfGlossary<string, 'iso-time.IsoDayFloat'>;

/**
 * .what = day of week pattern
 * .why = detached weekday for weekly standups, recurring events
 * .format = d (1-7, monday=1)
 */
export type IsoWeekdayFloat = AsOfGlossary<string, 'iso-time.IsoWeekdayFloat'>;
