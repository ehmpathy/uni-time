import { isUniDateTime } from './isUniDateTime';

describe('isUniDateTime', () => {
  const cases: { input: string; output: boolean }[] = [
    {
      input: 'May 15, 2024 at 5pm',
      output: false,
    },
    {
      input: '2024-05-15 17:21:55',
      output: false,
    },
    {
      input: '2024-05-15T17:21:55Z',
      output: false,
    },
    {
      input: '2024-05-15T17:21:55.555Z',
      output: true,
    },
  ];

  cases.forEach((thisCase) =>
    it(`should return ${thisCase.output} for '${thisCase.input}'`, () => {
      expect(isUniDateTime(thisCase.input)).toEqual(thisCase.output);
    }),
  );
});
