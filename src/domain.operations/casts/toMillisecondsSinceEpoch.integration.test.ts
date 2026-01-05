import { given, then, when } from 'test-fns';

import {
  toMillisecondsSinceEpoch,
  toMse,
} from '@src/domain.operations/casts/toMillisecondsSinceEpoch';
import { asIsoDateStamp } from '@src/domain.operations/checks/isIsoDateStamp';
import { asIsoTimeStamp } from '@src/domain.operations/checks/isIsoTimeStamp';
import { getDuration } from '@src/domain.operations/manipulate/getDuration';
import { toMilliseconds } from '@src/domain.operations/manipulate/toMilliseconds';

describe('toMillisecondsSinceEpoch integration', () => {
  given('iso timestamps', () => {
    when('converting to mse and comparing', () => {
      const earlier = asIsoTimeStamp('2024-06-15T10:00:00Z');
      const later = asIsoTimeStamp('2024-06-15T12:30:00Z');

      then('later should have higher mse than earlier', () => {
        expect(toMse(later)).toBeGreaterThan(toMse(earlier));
      });

      then('difference should match duration in milliseconds', () => {
        const mseDiff = toMse(later) - toMse(earlier);
        const duration = getDuration({
          of: { range: { since: earlier, until: later } },
        });
        const durationMs = toMilliseconds(duration);
        expect(mseDiff).toEqual(durationMs);
      });
    });
  });

  given('iso date stamps', () => {
    when('converting dates to mse', () => {
      const date = asIsoDateStamp('2024-06-15');

      then('should convert to midnight UTC milliseconds', () => {
        const mse = toMillisecondsSinceEpoch(date);
        const expected = new Date('2024-06-15T00:00:00Z').getTime();
        expect(mse).toEqual(expected);
      });
    });
  });

  given('epoch reference point', () => {
    when('converting unix epoch', () => {
      const epoch = asIsoTimeStamp('1970-01-01T00:00:00Z');

      then('should return 0', () => {
        expect(toMse(epoch)).toEqual(0);
      });
    });

    when('converting one day after epoch', () => {
      const oneDayAfter = asIsoTimeStamp('1970-01-02T00:00:00Z');

      then('should return 86400000 (24 * 60 * 60 * 1000)', () => {
        expect(toMse(oneDayAfter)).toEqual(86400000);
      });
    });
  });

  given('round trip conversion', () => {
    when('converting timestamp to mse and back', () => {
      const original = asIsoTimeStamp('2024-06-15T10:30:45Z');

      then('should preserve the timestamp', () => {
        const mse = toMse(original);
        const restored = asIsoTimeStamp({ mse });
        expect(restored).toEqual(original);
      });
    });
  });
});
