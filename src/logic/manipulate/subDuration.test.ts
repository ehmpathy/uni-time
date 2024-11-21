import { given, then } from 'test-fns';

import { UniDate, UniDateTime } from '../../domain/UniDateTime';
import { asUniDate, isUniDate } from '../checks/isUniDate';
import { subDuration } from './subDuration';

describe('subDuration', () => {
  given('a UniDate', () => {
    then('it should still be assignable to a UniDate', () => {
      const before: UniDate = asUniDate('2024-11-21');
      const after: UniDate = subDuration(before, { days: 1 });
      expect(isUniDate(after));
    });

    then('it should not be assignable to a UniDateTime', () => {
      const before: UniDate = asUniDate('2024-11-21');
      // @ts-expect-error: Type '"uni-time.UniDate"' is not assignable to type '"uni-time.UniDateTime"'.
      const after: UniDateTime = subDuration(before, { days: 1 });
    });
  });
});
