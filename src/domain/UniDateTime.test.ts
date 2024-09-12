import { given, then } from 'test-fns';

import { asUniDateTime } from '../logic/checks/isUniDateTime';
import { UniDateRange } from './UniDateTime';

describe('UniDateTime', () => {
  given('a UniDateTimeRange', () => {
    then('it should not be assignable to a UniDateRange', () => {
      const range: UniDateRange = {
        // @ts-expect-error; UniDateTime should not be assignable UniDate
        since: asUniDateTime(new Date()),

        // @ts-expect-error; UniDateTime should not be assignable UniDate
        until: asUniDateTime(new Date()),
      };
    });
  });
});
