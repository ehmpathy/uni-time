import { isUniDate } from './isUniDate';

describe('isUniDate', () => {
  const cases: { input: string; output: boolean }[] = [
    {
      input: 'May 15, 2024',
      output: false,
    },
    {
      input: '05-15-2024',
      output: false,
    },
    {
      input: '2024-05-15T17:21:55.555Z',
      output: false,
    },
    {
      input: '2024-05-15',
      output: true,
    },
  ];

  cases.forEach((thisCase) =>
    it(`should return ${thisCase.output} for '${thisCase.input}'`, () => {
      expect(isUniDate(thisCase.input)).toEqual(thisCase.output);
    }),
  );
});
