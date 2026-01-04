import { given, then, when } from 'test-fns';

import { asIsoDateStamp } from '@src/domain.operations/checks/isIsoDateStamp';
import { asIsoTimeStamp } from '@src/domain.operations/checks/isIsoTimeStamp';
import { addDuration } from '@src/domain.operations/manipulate/addDuration';
import { getDuration } from '@src/domain.operations/manipulate/getDuration';
import { subDuration } from '@src/domain.operations/manipulate/subDuration';

describe('addDuration integration', () => {
  given('a timestamp and duration workflow', () => {
    when('adding and then subtracting the same duration', () => {
      const original = asIsoTimeStamp('2024-06-15T10:30:00Z');
      const duration = { hours: 5, minutes: 30 };

      then('should return to the original timestamp', () => {
        const added = addDuration(original, duration);
        const result = subDuration(added, duration);
        expect(result).toEqual(original);
      });
    });

    when('computing duration between two stamps', () => {
      const start = asIsoTimeStamp('2024-06-15T10:00:00Z');
      const end = asIsoTimeStamp('2024-06-15T12:30:00Z');

      then('should match the expected duration', () => {
        const duration = getDuration({
          of: { range: { since: start, until: end } },
        });
        expect(duration).toEqual({ hours: 2, minutes: 30 });
      });

      then('adding the duration to start should equal end', () => {
        const duration = getDuration({
          of: { range: { since: start, until: end } },
        });
        const result = addDuration(start, duration);
        expect(result).toEqual(end);
      });
    });
  });

  given('date stamps with year/month durations', () => {
    when('adding approximate year duration', () => {
      const start = asIsoDateStamp('2024-01-15');

      then('should add approximately 365.25 days per year', () => {
        const result = addDuration(start, { years: 1 });
        // since years are approximate (365.25 days), verify it lands in expected range
        expect(result.startsWith('2025-01')).toBe(true);
      });
    });

    when('adding approximate month duration', () => {
      const start = asIsoDateStamp('2024-06-15');

      then('should add approximately 30.44 days per month', () => {
        const result = addDuration(start, { months: 1 });
        // since months are approximate (30.44 days), verify it lands in expected range
        expect(result.startsWith('2024-07')).toBe(true);
      });
    });
  });

  given('chained duration operations', () => {
    when('adding multiple durations sequentially', () => {
      const start = asIsoTimeStamp('2024-01-01T00:00:00Z');

      then('should accumulate correctly', () => {
        const step1 = addDuration(start, { days: 1 });
        const step2 = addDuration(step1, { hours: 12 });
        const step3 = addDuration(step2, { minutes: 30 });

        expect(step3).toEqual('2024-01-02T12:30:00Z');
      });
    });
  });
});
