import { given, then, when } from 'test-fns';

import { sumDurations } from '@src/domain.operations/manipulate/sumDurations';

describe('sumDurations', () => {
  given('spread syntax', () => {
    when('object durations are provided', () => {
      then('it should sum them correctly', () => {
        const result = sumDurations(
          { hours: 1 },
          { minutes: 30 },
          { seconds: 45 },
        );
        expect(result).toEqual({ hours: 1, minutes: 30, seconds: 45 });
      });
    });

    when('string durations are provided (iso 8601)', () => {
      then('it should sum them correctly', () => {
        const result = sumDurations('PT1H', 'PT30M', 'PT45S');
        expect(result).toEqual({ hours: 1, minutes: 30, seconds: 45 });
      });
    });

    when('mixed formats are provided', () => {
      then('it should sum them correctly', () => {
        const result = sumDurations('PT1H', { minutes: 30 }, 'PT45S');
        expect(result).toEqual({ hours: 1, minutes: 30, seconds: 45 });
      });
    });

    when('a single duration is provided', () => {
      then('it should return that duration', () => {
        const result = sumDurations({ hours: 2 });
        expect(result).toEqual({ hours: 2 });
      });
    });
  });

  given('array syntax', () => {
    when('an array of durations is provided', () => {
      then('it should sum them correctly', () => {
        const result = sumDurations([{ hours: 1 }, { minutes: 30 }]);
        expect(result).toEqual({ hours: 1, minutes: 30 });
      });
    });

    when('an array with { as } option is provided', () => {
      then('it should return the sum in the specified unit', () => {
        const result = sumDurations([{ hours: 1 }, { minutes: 30 }], {
          as: 'minutes',
        });
        expect(result).toEqual({ minutes: 90 });
      });
    });

    when('an empty array is provided', () => {
      then('it should return zero duration', () => {
        const result = sumDurations([]);
        expect(result).toEqual({ milliseconds: 0 });
      });
    });

    when('a single element array is provided', () => {
      then('it should return that duration', () => {
        const result = sumDurations([{ days: 3 }]);
        expect(result).toEqual({ days: 3 });
      });
    });
  });

  given('durations that overflow units', () => {
    when('minutes overflow into hours', () => {
      then('it should normalize the result', () => {
        const result = sumDurations({ minutes: 45 }, { minutes: 30 });
        expect(result).toEqual({ hours: 1, minutes: 15 });
      });
    });

    when('hours overflow into days', () => {
      then('it should normalize the result', () => {
        const result = sumDurations({ hours: 20 }, { hours: 10 });
        expect(result).toEqual({ days: 1, hours: 6 });
      });
    });
  });
});
