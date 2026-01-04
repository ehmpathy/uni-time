import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import { asDurationInWords } from '@src/domain.operations/manipulate/asDurationInWords';

describe('asDurationInWords', () => {
  const cases: { input: IsoDuration; output: string }[] = [
    { input: { hours: 2, minutes: 5 }, output: '2h 5m' },
    { input: { minutes: 1, seconds: 0 }, output: '1m' },
    { input: { hours: 1, minutes: 59, seconds: 32 }, output: '1h 59m' },
    { input: { milliseconds: 350 }, output: '350ms' },
    { input: { years: 2, months: 6 }, output: '2y 6mo' },
    { input: {} as IsoDuration, output: '0s' },
  ];

  it.each(cases)('%j', ({ input, output }) => {
    expect(asDurationInWords(input)).toBe(output);
  });
});
