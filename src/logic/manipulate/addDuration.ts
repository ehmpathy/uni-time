import { parseISO, subMilliseconds } from 'date-fns';
import { PickOne } from 'type-fns';

import { UniDate, UniDateTime } from '../../domain/UniDateTime';
import { UniDuration, toMilliseconds } from '../../domain/UniDuration';
import { asUniDate, isUniDate } from '../checks/isUniDate';
import { asUniDateTime } from '../checks/isUniDateTime';

/**
 * subtract a duration from a datetime
 */
export const subDuration = (
  ...args:
    | [UniDateTime, UniDuration]
    | [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
) =>
  isUniDate(args[0])
    ? asUniDate(subMilliseconds(parseISO(args[0]), toMilliseconds(args[1])))
    : asUniDateTime(
        subMilliseconds(parseISO(args[0]), toMilliseconds(args[1])),
      );
