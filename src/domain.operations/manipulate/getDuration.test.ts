import { given, then, when } from 'test-fns';

import type { IsoTimeStampRange } from '@src/domain.objects/IsoTimeStampRange';
import { asIsoTimeStamp } from '@src/domain.operations/checks/isIsoTimeStamp';
import { getDuration } from '@src/domain.operations/manipulate/getDuration';
import {
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_WEEK,
} from '@src/domain.operations/manipulate/toMilliseconds';

describe('getDuration', () => {
  given('milliseconds', () => {
    when('less than a second', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({ of: { milliseconds: 69 } });
        expect(duration).toEqual({ milliseconds: 69 });
      });
    });
    when('is 0', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({ of: { milliseconds: 0 } });
        expect(duration).toEqual({ milliseconds: 0 });
      });
    });
    when('less than a minute', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({ of: { milliseconds: 1069 } });
        expect(duration).toEqual({ seconds: 1, milliseconds: 69 });
      });
    });
    when('less than an day', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({
          of: { milliseconds: 7 * MILLISECONDS_PER_HOUR + 1069 },
        });
        expect(duration).toEqual({ hours: 7, seconds: 1, milliseconds: 69 });
      });
    });
    when('less than a week', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({
          of: {
            milliseconds:
              3 * MILLISECONDS_PER_DAY + 7 * MILLISECONDS_PER_HOUR + 1069,
          },
        });
        expect(duration).toEqual({
          days: 3,
          hours: 7,
          seconds: 1,
          milliseconds: 69,
        });
      });
    });
    when('less than a month ', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({
          of: {
            milliseconds:
              5 * MILLISECONDS_PER_WEEK +
              3 * MILLISECONDS_PER_DAY +
              7 * MILLISECONDS_PER_HOUR +
              1069,
          },
        });
        expect(duration).toEqual({
          weeks: 5,
          days: 3,
          hours: 7,
          seconds: 1,
          milliseconds: 69,
        });
      });
    });
  });

  given('range', () => {
    when('has parts of each time unit', () => {
      then('it should accurately define the duration', () => {
        const range: IsoTimeStampRange = {
          since: asIsoTimeStamp('2024-09-09T13:08:21Z'),
          until: asIsoTimeStamp('2024-09-17T15:53:31Z'),
        };
        const duration = getDuration({ of: { range } });
        expect(duration).toEqual({
          weeks: 1,
          days: 1,
          hours: 2,
          minutes: 45,
          seconds: 10,
        });
      });
    });
  });

  given('a unit to get the duration in', () => {
    when('asked to define it in seconds', () => {
      then('it should accurately define the duration', () => {
        const range: IsoTimeStampRange = {
          since: asIsoTimeStamp('2024-09-09T13:08:21Z'),
          until: asIsoTimeStamp('2024-09-17T15:53:31Z'),
        };
        const duration = getDuration({
          of: { range },
          as: 'seconds',
        });
        expect(duration).toEqual({
          seconds: 701110,
        });
      });
    });
    when('asked to define it in minutes', () => {
      then('it should accurately define the duration', () => {
        const range: IsoTimeStampRange = {
          since: asIsoTimeStamp('2024-09-09T13:08:21Z'),
          until: asIsoTimeStamp('2024-09-17T15:53:31Z'),
        };
        const duration = getDuration({
          of: { range },
          as: 'minutes',
        });
        expect(duration).toEqual({
          minutes: 701110 / 60,
        });
      });
    });
    when('asked to define it in years', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({
          of: { milliseconds: 365.25 * 24 * 60 * 60 * 1000 },
          as: 'years',
        });
        expect(duration).toEqual({ years: 1 });
      });
    });
    when('asked to define it in months', () => {
      then('it should accurately define the duration', () => {
        const duration = getDuration({
          of: { milliseconds: 30.44 * 24 * 60 * 60 * 1000 },
          as: 'months',
        });
        expect(duration.months).toBeCloseTo(1, 10);
      });
    });
  });
});
