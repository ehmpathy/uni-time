import { withAssure } from 'type-fns';

import type { IsoTimeStampRange } from '@src/domain.objects/IsoTimeStampRange';
import type { castInputToDate } from '@src/domain.operations/casts/castInputToDate';
import {
  asIsoTimeStamp,
  isIsoTimeStamp,
} from '@src/domain.operations/checks/isIsoTimeStamp';

/**
 * .what = casts input to IsoTimeStampRange format
 * .why = normalize various input types to strict ISO timestamp range
 * .format = { since: IsoTimeStamp; until: IsoTimeStamp }
 */
export const asIsoTimeStampRange = (input: {
  since: Parameters<typeof castInputToDate>[0];
  until: Parameters<typeof castInputToDate>[0];
}): IsoTimeStampRange => ({
  since: asIsoTimeStamp(input.since),
  until: asIsoTimeStamp(input.until),
});

/**
 * .what = validates object is IsoTimeStampRange format
 * .why = runtime validation for external input
 * .format = { since: IsoTimeStamp; until: IsoTimeStamp }
 */
export const isIsoTimeStampRange = withAssure(
  (input: unknown): input is IsoTimeStampRange => {
    // must be an object
    if (input === null || typeof input !== 'object') return false;

    // must have since and until keys
    if (!('since' in input) || !('until' in input)) return false;

    // both values must be valid IsoTimeStamps
    const { since, until } = input as { since: unknown; until: unknown };
    return (
      typeof since === 'string' &&
      typeof until === 'string' &&
      isIsoTimeStamp(since) &&
      isIsoTimeStamp(until)
    );
  },
);
