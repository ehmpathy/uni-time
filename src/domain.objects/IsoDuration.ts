import type { AsOfGlossary } from 'domain-glossaries';

import type { IsoDurationShape } from './IsoDurationShape';
import type { IsoDurationWords } from './IsoDurationWords';

/**
 * .what = duration in either string or object format
 * .why = enables users to choose most convenient format per context
 */
export type IsoDuration = AsOfGlossary<
  IsoDurationWords | IsoDurationShape,
  'iso-time.IsoDuration',
  false
>;

// re-export constituent types
export type { IsoDurationWords, IsoDurationShape };
