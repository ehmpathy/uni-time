import { AsOfGlossary } from 'domain-glossaries';

/**
 * a universally unambiguous datetime serialized as a string; yyyy-MM-ddThh:mm:ssZ
 */
export type UniDateTime = AsOfGlossary<string, 'uni-time'>;

/**
 * a universally unambiguous date serialized as a string; yyyy-MM-dd
 */
export type UniDate = AsOfGlossary<string, 'uni-time'>;

/**
 * a universally unambiguous month serialized as a string; yyyy-MM
 */
export type UniMonth = AsOfGlossary<string, 'uni-time'>;

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
  'uni-time',
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
  'uni-time',
  false // this is not required to have the _dglo annotation, since we care about the structure.shape, and not the structure.origin
>;
