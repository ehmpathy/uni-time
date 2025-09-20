import { withAssure } from 'type-fns';

import { UniDateTimeRange } from '../../domain/UniDateTime';
import { isUniDateTime, asUniDateTime } from './isUniDateTime';

/**
 * casts a range like input into a UniDateTimeRange
 */
export const asUniDateTimeRange = (input: {
  since: Parameters<typeof asUniDateTime>[0];
  until: Parameters<typeof asUniDateTime>[0];
}): UniDateTimeRange => ({
  since: asUniDateTime(input.since),
  until: asUniDateTime(input.until),
});

/**
 * checks whether an input is a valid UniDateTimeRange
 */
export const isUniDateTimeRange = withAssure(
  (input: any): input is UniDateTimeRange => {
    if (!input || typeof input !== 'object') return false;
    return isUniDateTime(input.since) && isUniDateTime(input.until);
  },
);
