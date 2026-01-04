import type { AsOfGlossary } from 'domain-glossaries';

/**
 * a universally unambiguous datetime serialized as a string; yyyy-MM-ddThh:mm:ssZ
 */
export type UniDateTime = AsOfGlossary<string, 'uni-time.UniDateTime'>;

/**
 * a universally unambiguous date serialized as a string; yyyy-MM-dd
 */
export type UniDate = AsOfGlossary<
  string,
  'uni-time.UniDate' | 'uni-time.UniDateTime' // date-time is a superset of date
>;

/**
 * a universally unambiguous month serialized as a string; yyyy-MM
 */
export type UniMonth = AsOfGlossary<string, 'uni-time.UniMonth'>;

/**
 * a dateless wallclock time
 */
export type UniTime = AsOfGlossary<string, 'uni-time.UniTime'>;

/**
 * a universally unambiguous date range
 *
 * note
 * - since is inclusive (i.e., you've had freedom _since_ you gained it)
 * - until is exclusive (i.e., you have money _until_ you run out)
 */
export type UniDateRange = AsOfGlossary<
  {
    since: UniDate;
    until: UniDate;
  },
  'uni-time.UniDateRange' | 'uni-time.UniDateTimeRange', // date-time is a superset of date
  false // this is not required to have the _dglo annotation, since we care about the structure.shape, and not the structure.origin
>;

/**
 * a universally unambiguous datetime range
 *
 * note
 * - since is inclusive (i.e., you've had freedom _since_ you gained it)
 * - until is exclusive (i.e., you have money _until_ you run out)
 */
export type UniDateTimeRange = AsOfGlossary<
  {
    since: UniDateTime;
    until: UniDateTime;
  },
  'uni-time.UniDateTimeRange',
  false // this is not required to have the _dglo annotation, since we care about the structure.shape, and not the structure.origin
>;
