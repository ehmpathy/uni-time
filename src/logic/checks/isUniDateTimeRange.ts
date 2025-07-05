import { withAssure } from 'type-fns';

import { UniDateTimeRange } from '../../domain/UniDateTime';
import { isUniDateTime } from './isUniDateTime';

/**
 * checks whether an input is a valid UniDateTimeRange
 */
export const isUniDateTimeRange = withAssure(
  (input: any): input is UniDateTimeRange => {
    if (!input || typeof input !== 'object') return false;
    return isUniDateTime(input.since) && isUniDateTime(input.until);
  },
);
