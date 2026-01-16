/**
 * acceptance tests for iso-time public api
 *
 * these tests verify the library's public contract works as documented
 * by importing from the built package (dist/)
 */

import { given, then, when } from 'test-fns';

import {
  // domain objects — duration
  type IsoDuration,
  // validators — stamps
  isIsoTimeStamp,
  asIsoTimeStamp,
  isIsoDateStamp,
  asIsoDateStamp,
  isIsoMonthStamp,
  asIsoMonthStamp,
  isIsoYearStamp,
  asIsoYearStamp,
  // validators — floats
  isIsoTimeFloat,
  asIsoTimeFloat,
  isIsoHourFloat,
  asIsoHourFloat,
  isIsoMinuteFloat,
  asIsoMinuteFloat,
  isIsoMonthFloat,
  asIsoMonthFloat,
  isIsoDayFloat,
  asIsoDayFloat,
  isIsoWeekdayFloat,
  asIsoWeekdayFloat,
  // validators — ranges
  isIsoTimeStampRange,
  asIsoTimeStampRange,
  isIsoDateStampRange,
  asIsoDateStampRange,
  // manipulate
  addDuration,
  subDuration,
  getDuration,
  toMilliseconds,
  // observe
  now,
  today,
  startDurationStopwatch,
  // casts
  toMillisecondsSinceEpoch,
  toMse,
  // utils
  sleep,
  waitFor,
} from '../dist';

describe('iso-time acceptance', () => {
  given('stamp types and validators', () => {
    when('working with IsoTimeStamp', () => {
      then('should validate and cast correctly', () => {
        const stamp = asIsoTimeStamp('2024-06-15T10:30:00Z');
        expect(isIsoTimeStamp(stamp)).toBe(true);
        expect(asIsoTimeStamp(new Date('2024-06-15T10:30:00Z'))).toEqual(stamp);
      });
    });

    when('working with IsoDateStamp', () => {
      then('should validate and cast correctly', () => {
        const stamp = asIsoDateStamp('2024-06-15');
        expect(isIsoDateStamp(stamp)).toBe(true);
        expect(asIsoDateStamp(new Date('2024-06-15'))).toEqual(stamp);
      });
    });

    when('working with IsoMonthStamp', () => {
      then('should validate and cast correctly', () => {
        const stamp = asIsoMonthStamp('2024-06');
        expect(isIsoMonthStamp(stamp)).toBe(true);
        expect(asIsoMonthStamp(new Date('2024-06-01'))).toEqual(stamp);
      });
    });

    when('working with IsoYearStamp', () => {
      then('should validate and cast correctly', () => {
        const stamp = asIsoYearStamp('2024');
        expect(isIsoYearStamp(stamp)).toBe(true);
        expect(asIsoYearStamp(new Date('2024-01-01'))).toEqual(stamp);
      });
    });
  });

  given('float types and validators', () => {
    when('working with IsoTimeFloat', () => {
      then('should cast from Date and validate', () => {
        const time = asIsoTimeFloat(new Date('2024-06-15T14:30:45Z'));
        expect(time).toEqual('14:30:45');
        expect(isIsoTimeFloat(time)).toBe(true);
        expect(isIsoTimeFloat('25:00:00')).toBe(false);
      });
    });

    when('working with IsoHourFloat', () => {
      then('should cast from Date and validate', () => {
        const hour = asIsoHourFloat(new Date('2024-06-15T14:30:00Z'));
        expect(hour).toEqual('14');
        expect(isIsoHourFloat(hour)).toBe(true);
        expect(isIsoHourFloat('25')).toBe(false);
      });
    });

    when('working with IsoMinuteFloat', () => {
      then('should cast from Date and validate', () => {
        const minute = asIsoMinuteFloat(new Date('2024-06-15T14:30:00Z'));
        expect(minute).toEqual('30');
        expect(isIsoMinuteFloat(minute)).toBe(true);
        expect(isIsoMinuteFloat('60')).toBe(false);
      });
    });

    when('working with IsoMonthFloat', () => {
      then('should cast from Date and validate', () => {
        const month = asIsoMonthFloat(new Date('2024-06-15'));
        expect(month).toEqual('06');
        expect(isIsoMonthFloat(month)).toBe(true);
        expect(isIsoMonthFloat('13')).toBe(false);
      });
    });

    when('working with IsoDayFloat', () => {
      then('should cast from Date and validate', () => {
        const day = asIsoDayFloat(new Date('2024-06-15'));
        expect(day).toEqual('15');
        expect(isIsoDayFloat(day)).toBe(true);
        expect(isIsoDayFloat('32')).toBe(false);
      });
    });

    when('working with IsoWeekdayFloat', () => {
      then('should cast from Date and validate', () => {
        // 2024-06-17 is a Monday (weekday 1)
        const weekday = asIsoWeekdayFloat(new Date('2024-06-17'));
        expect(weekday).toEqual('1');
        expect(isIsoWeekdayFloat(weekday)).toBe(true);
        expect(isIsoWeekdayFloat('0')).toBe(false);
        expect(isIsoWeekdayFloat('8')).toBe(false);
      });
    });
  });

  given('range types and validators', () => {
    when('working with IsoTimeStampRange', () => {
      then('should cast from Date and validate', () => {
        const range = asIsoTimeStampRange({
          since: new Date('2024-06-15T10:00:00Z'),
          until: new Date('2024-06-15T12:00:00Z'),
        });
        expect(isIsoTimeStampRange(range)).toBe(true);
        expect(range.since).toEqual('2024-06-15T10:00:00Z');
        expect(range.until).toEqual('2024-06-15T12:00:00Z');
      });
    });

    when('working with IsoDateStampRange', () => {
      then('should cast from Date and validate', () => {
        const range = asIsoDateStampRange({
          since: new Date('2024-06-01'),
          until: new Date('2024-06-30'),
        });
        expect(isIsoDateStampRange(range)).toBe(true);
        expect(range.since).toEqual('2024-06-01');
        expect(range.until).toEqual('2024-06-30');
      });
    });
  });

  given('duration operations', () => {
    when('assigning duration literals', () => {
      then('should accept string literals without casts', () => {
        // users should be able to write IsoDuration string literals directly
        const good1: IsoDuration = 'PT30S';
        const good2: IsoDuration = 'PT1H30M';
        const good3: IsoDuration = 'P1D';
        const good4: IsoDuration = 'P1DT12H';

        // verify they're valid at runtime too
        expect(toMilliseconds(good1)).toEqual(30 * 1000);
        expect(toMilliseconds(good2)).toEqual(90 * 60 * 1000);
        expect(toMilliseconds(good3)).toEqual(24 * 60 * 60 * 1000);
        expect(toMilliseconds(good4)).toEqual(36 * 60 * 60 * 1000);
      });

      then('should accept object literals without casts', () => {
        // users should be able to write IsoDuration object literals directly
        const good1: IsoDuration = { seconds: 30 };
        const good2: IsoDuration = { hours: 1, minutes: 30 };
        const good3: IsoDuration = { days: 1 };

        expect(toMilliseconds(good1)).toEqual(30 * 1000);
        expect(toMilliseconds(good2)).toEqual(90 * 60 * 1000);
        expect(toMilliseconds(good3)).toEqual(24 * 60 * 60 * 1000);
      });
    });

    when('adding duration to a stamp', () => {
      then('should return correct result', () => {
        const start = asIsoTimeStamp('2024-06-15T10:00:00Z');
        const duration: IsoDuration = { hours: 2, minutes: 30 };
        const result = addDuration(start, duration);
        expect(result).toEqual(asIsoTimeStamp('2024-06-15T12:30:00Z'));
      });
    });

    when('subtracting duration from a stamp', () => {
      then('should return correct result', () => {
        const start = asIsoTimeStamp('2024-06-15T12:30:00Z');
        const duration: IsoDuration = { hours: 2, minutes: 30 };
        const result = subDuration(start, duration);
        expect(result).toEqual(asIsoTimeStamp('2024-06-15T10:00:00Z'));
      });
    });

    when('computing duration from a range', () => {
      then('should return correct duration', () => {
        const range = {
          since: asIsoTimeStamp('2024-06-15T10:00:00Z'),
          until: asIsoTimeStamp('2024-06-15T12:30:00Z'),
        };
        const duration = getDuration({ of: { range } });
        expect(duration).toEqual({ hours: 2, minutes: 30 });
      });
    });

    when('converting duration to milliseconds', () => {
      then('should calculate correctly', () => {
        const duration: IsoDuration = { hours: 1 };
        const ms = toMilliseconds(duration);
        expect(ms).toEqual(3600000);
      });

      then('should support years and months', () => {
        const oneYear = toMilliseconds({ years: 1 });
        const oneMonth = toMilliseconds({ months: 1 });

        // approximately 365.25 days in a year
        expect(oneYear).toBeCloseTo(365.25 * 24 * 60 * 60 * 1000, -5);
        // approximately 30.44 days in a month
        expect(oneMonth).toBeCloseTo(30.44 * 24 * 60 * 60 * 1000, -5);
      });
    });
  });

  given('observe operations', () => {
    when('getting current timestamp', () => {
      then('now() should return valid IsoTimeStamp', () => {
        const timestamp = now();
        expect(isIsoTimeStamp(timestamp)).toBe(true);
        expect(timestamp.endsWith('Z')).toBe(true);
      });
    });

    when('getting current date', () => {
      then('today() should return valid IsoDateStamp', () => {
        const date = today();
        expect(isIsoDateStamp(date)).toBe(true);
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });

    when('using stopwatch', () => {
      then('should measure duration', async () => {
        const stopwatch = startDurationStopwatch(
          { for: 'acceptance test', log: false },
          { log: console },
        );
        await sleep(10);
        const result = stopwatch.stop();
        expect(result.duration.milliseconds).toBeGreaterThanOrEqual(5);
      });
    });
  });

  given('cast operations', () => {
    when('converting stamp to milliseconds since epoch', () => {
      then('should return correct value', () => {
        const epoch = asIsoTimeStamp('1970-01-01T00:00:00Z');
        expect(toMillisecondsSinceEpoch(epoch)).toEqual(0);
        expect(toMse(epoch)).toEqual(0);
      });
    });
  });

  given('utility operations', () => {
    when('using sleep with IsoDuration', () => {
      then('should pause for specified duration', async () => {
        const before = Date.now();
        await sleep({ milliseconds: 20 });
        const after = Date.now();
        expect(after - before).toBeGreaterThanOrEqual(15);
      });
    });

    when('using waitFor', () => {
      then('should wait until condition is met', async () => {
        let counter = 0;
        const result = await waitFor(
          async () => {
            counter++;
            if (counter >= 3) return 'done';
            return undefined;
          },
          { interval: { milliseconds: 10 }, timeout: { seconds: 1 } },
        );
        expect(result).toEqual('done');
        expect(counter).toEqual(3);
      });
    });
  });
});
