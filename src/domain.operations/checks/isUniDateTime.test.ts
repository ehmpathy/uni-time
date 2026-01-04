import type { ProcedureInput } from 'visualogic';

import { asUniDate } from './isUniDate';
import { asUniDateTime, isUniDateTime } from './isUniDateTime';

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

describe('asUniDateTime', () => {
  const cases: {
    input: ProcedureInput<typeof asUniDateTime>;
    output: string;
  }[] = [
    {
      input: '2024-05-15 17:21:55',
      output: '2024-05-15T17:21:55.000Z',
    },
    {
      input: '2024-05-15T17:21:55Z',
      output: '2024-05-15T17:21:55.000Z',
    },
    {
      input: '2024-05-15T17:21:55.555Z',
      output: '2024-05-15T17:21:55.555Z',
    },
    {
      input: asUniDate('2025-08-21'),
      output: '2025-08-21T00:00:00.000Z',
    },
  ];

  cases.forEach((thisCase) =>
    it(`should return ${thisCase.output} for '${thisCase.input}'`, () => {
      expect(asUniDateTime(thisCase.input)).toEqual(thisCase.output);
    }),
  );
});
