import { parseISO, subMilliseconds } from 'date-fns';
import { PickOne } from 'type-fns';

import { UniDate, UniDateTime } from '../../domain/UniDateTime';
import { UniDuration } from '../../domain/UniDuration';
import { asUniDate, isUniDate } from '../checks/isUniDate';
import { asUniDateTime } from '../checks/isUniDateTime';
import { toMilliseconds } from './toMilliseconds';

export function subDuration(...args: [UniDateTime, UniDuration]): UniDateTime;
export function subDuration(
  ...args: [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
): UniDate;

/**
 * subtract a duration from a datetime
 */
export function subDuration(
  ...args:
    | [UniDateTime, UniDuration]
    | [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
): UniDate | UniDateTime {
  return isUniDate(args[0])
    ? asUniDate(subMilliseconds(parseISO(args[0]), toMilliseconds(args[1])))
    : asUniDateTime(
        subMilliseconds(parseISO(args[0]), toMilliseconds(args[1])),
      );
}
