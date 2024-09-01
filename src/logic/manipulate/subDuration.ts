import { addMilliseconds, parseISO } from 'date-fns';
import { PickOne } from 'type-fns';

import { UniDate, UniDateTime } from '../../domain/UniDateTime';
import { UniDuration, toMilliseconds } from '../../domain/UniDuration';
import { asUniDate, isUniDate } from '../checks/isUniDate';
import { asUniDateTime } from '../checks/isUniDateTime';

/**
 * add a duration to a datetime
 */
export const addDuration = (
  ...args:
    | [UniDateTime, UniDuration]
    | [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
) =>
  isUniDate(args[0])
    ? asUniDate(addMilliseconds(parseISO(args[0]), toMilliseconds(args[1])))
    : asUniDateTime(
        addMilliseconds(parseISO(args[0]), toMilliseconds(args[1])),
      );
