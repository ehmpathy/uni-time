import { given, then } from 'test-fns';

import type {
  IsoDateStamp,
  IsoTimeStamp,
} from '@src/domain.objects/IsoTimeStamp';
import {
  asIsoDateStamp,
  isIsoDateStamp,
} from '@src/domain.operations/checks/isIsoDateStamp';
import {
  asIsoTimeStamp,
  isIsoTimeStamp,
} from '@src/domain.operations/checks/isIsoTimeStamp';
import { subDuration } from '@src/domain.operations/manipulate/subDuration';

describe('subDuration', () => {
  given('an IsoTimeStamp', () => {
    then('it should subtract hours correctly', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-15T16:30:00Z');
      const after = subDuration(before, { hours: 2 });
      expect(after).toEqual('2024-01-15T14:30:00Z');
      expect(isIsoTimeStamp(after)).toBe(true);
    });

    then('it should subtract days correctly', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-02-01T12:00:00Z');
      const after = subDuration(before, { days: 1 });
      expect(after).toEqual('2024-01-31T12:00:00Z');
    });

    then('it should still be assignable to IsoTimeStamp', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-15T16:30:00Z');
      const after: IsoTimeStamp = subDuration(before, { hours: 2 });
      expect(isIsoTimeStamp(after)).toBe(true);
    });
  });

  given('an IsoDateStamp', () => {
    then('it should subtract days correctly', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-15');
      const after = subDuration(before, { days: 7 });
      expect(after).toEqual('2024-01-08');
      expect(isIsoDateStamp(after)).toBe(true);
    });

    then('it should still be assignable to IsoDateStamp', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-15');
      const after: IsoDateStamp = subDuration(before, { days: 1 });
      expect(isIsoDateStamp(after)).toBe(true);
    });

    then('it should not be assignable to IsoTimeStamp', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-15');
      // @ts-expect-error: IsoDateStamp is not assignable to IsoTimeStamp
      const after: IsoTimeStamp = subDuration(before, { days: 1 });
    });
  });
});
