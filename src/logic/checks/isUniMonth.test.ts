import { isUniMonth } from './isUniMonth';

describe('isUniMonth', () => {
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
      output: false,
    },
    {
      input: 'May 15, 2024',
      output: false,
    },
    {
      input: '2024-05-15',
      output: false,
    },
    {
      input: 'May 2024',
      output: false,
    },
    {
      input: '2024-05',
      output: true,
    },
  ];

  cases.forEach((thisCase) =>
    it(`should return ${thisCase.output} for '${thisCase.input}'`, () => {
      expect(isUniMonth(thisCase.input)).toEqual(thisCase.output);
    }),
  );
});
