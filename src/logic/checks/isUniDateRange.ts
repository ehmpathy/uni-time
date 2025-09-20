import { withAssure } from 'type-fns';

import { UniDateRange } from '../../domain/UniDateTime';
import { isUniDate, asUniDate } from './isUniDate';

/**
 * casts a range like input into a UniDateRange
 */
export const asUniDateRange = (input: {
  since: Parameters<typeof asUniDate>[0];
  until: Parameters<typeof asUniDate>[0];
}): UniDateRange => ({
  since: asUniDate(input.since),
  until: asUniDate(input.until),
});

/**
 * checks whether an input is a valid UniDateRange
 */
export const isUniDateRange = withAssure(
  (input: any): input is UniDateRange => {
    if (!input || typeof input !== 'object') return false;
    return isUniDate(input.since) && isUniDate(input.until);
  },
);
