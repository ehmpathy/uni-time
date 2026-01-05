import { withAssure } from 'type-fns';

import type { IsoDateStampRange } from '@src/domain.objects/IsoTimeStampRange';
import type { castInputToDate } from '@src/domain.operations/casts/castInputToDate';
import {
  asIsoDateStamp,
  isIsoDateStamp,
} from '@src/domain.operations/checks/isIsoDateStamp';

/**
 * .what = casts input to IsoDateStampRange format
 * .why = normalize various input types to strict ISO date range
 * .format = { since: IsoDateStamp; until: IsoDateStamp }
 */
export const asIsoDateStampRange = (input: {
  since: Parameters<typeof castInputToDate>[0];
  until: Parameters<typeof castInputToDate>[0];
}): IsoDateStampRange => ({
  since: asIsoDateStamp(input.since),
  until: asIsoDateStamp(input.until),
});

/**
 * .what = validates object is IsoDateStampRange format
 * .why = runtime validation for external input
 * .format = { since: IsoDateStamp; until: IsoDateStamp }
 */
export const isIsoDateStampRange = withAssure(
  (input: unknown): input is IsoDateStampRange => {
    // must be an object
    if (input === null || typeof input !== 'object') return false;

    // must have since and until keys
    if (!('since' in input) || !('until' in input)) return false;

    // both values must be valid IsoDateStamps
    const { since, until } = input as { since: unknown; until: unknown };
    return (
      typeof since === 'string' &&
      typeof until === 'string' &&
      isIsoDateStamp(since) &&
      isIsoDateStamp(until)
    );
  },
);
