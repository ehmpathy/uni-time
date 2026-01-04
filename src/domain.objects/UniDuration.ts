import type { AsOfGlossary } from 'domain-glossaries';
import type { PickAny } from 'type-fns';

export type UniDuration = AsOfGlossary<
  PickAny<{
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }>,
  'uni-time.UniDuration',
  false
>;
