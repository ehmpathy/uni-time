import type { AsOfGlossary } from 'domain-glossaries';

import type {
  IsoDateStamp,
  IsoTimeStamp,
} from '@src/domain.objects/IsoTimeStamp';

/**
 * .what = time range with since/until bounds
 * .why = represent sessions, windows, intervals
 * .note = since is inclusive, until is exclusive
 */
export type IsoTimeStampRange = AsOfGlossary<
  { since: IsoTimeStamp; until: IsoTimeStamp },
  'iso-time.IsoTimeStampRange',
  false
>;

/**
 * .what = date range with since/until bounds
 * .why = represent booking windows, periods, spans
 * .note = since is inclusive, until is exclusive
 * .note = IsoTimeStampRange is assignable to IsoDateStampRange (more precise → less precise)
 */
export type IsoDateStampRange = AsOfGlossary<
  { since: IsoDateStamp; until: IsoDateStamp },
  'iso-time.IsoDateStampRange' | 'iso-time.IsoTimeStampRange',
  false
>;
