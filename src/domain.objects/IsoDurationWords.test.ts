import type { IsoDurationWords } from './IsoDurationWords';

describe('IsoDurationWords type', () => {
  describe('positive cases - valid assignments', () => {
    it('should accept valid time-only patterns', () => {
      const a: IsoDurationWords = 'PT5S';
      const b: IsoDurationWords = 'PT30M';
      const c: IsoDurationWords = 'PT2H';
      const d: IsoDurationWords = 'PT2H30M45S';
      const e: IsoDurationWords = 'PT0.5S';
      const f: IsoDurationWords = 'PT1.001S';
      const g: IsoDurationWords = 'PT2H30M';
      const h: IsoDurationWords = 'PT2H45S';
      const i: IsoDurationWords = 'PT30M45S';
      expect([a, b, c, d, e, f, g, h, i]).toBeDefined();
    });

    it('should accept valid date-only patterns', () => {
      const a: IsoDurationWords = 'P1Y';
      const b: IsoDurationWords = 'P6M';
      const c: IsoDurationWords = 'P2W';
      const d: IsoDurationWords = 'P30D';
      const e: IsoDurationWords = 'P1Y6M15D';
      const f: IsoDurationWords = 'P1Y6M';
      const g: IsoDurationWords = 'P1Y15D';
      const h: IsoDurationWords = 'P6M15D';
      const i: IsoDurationWords = 'P2W3D';
      expect([a, b, c, d, e, f, g, h, i]).toBeDefined();
    });

    it('should accept valid combined patterns', () => {
      const a: IsoDurationWords = 'P1DT2H';
      const b: IsoDurationWords = 'P1Y6M15DT12H30M45S';
      const c: IsoDurationWords = 'P1Y6M15DT12H30M45.5S';
      const d: IsoDurationWords = 'P1DT2H30M';
      const e: IsoDurationWords = 'P1DT2H30M45S';
      const f: IsoDurationWords = 'P1YT2H';
      const g: IsoDurationWords = 'P1Y6MT2H30M';
      expect([a, b, c, d, e, f, g]).toBeDefined();
    });

    it('should accept large numeric values', () => {
      const a: IsoDurationWords = 'PT999S';
      const b: IsoDurationWords = 'P100Y';
      const c: IsoDurationWords = 'PT12345H';
      expect([a, b, c]).toBeDefined();
    });
  });

  describe('negative cases - invalid assignments', () => {
    it('should reject invalid string patterns at compile time', () => {
      // @ts-expect-error - absent P designator
      const a: IsoDurationWords = '5S';
      // @ts-expect-error - lowercase designators
      const b: IsoDurationWords = 'pt5s';
      // @ts-expect-error - empty period
      const c: IsoDurationWords = 'P';
      // @ts-expect-error - empty time component
      const d: IsoDurationWords = 'PT';
      // @ts-expect-error - arbitrary string
      const e: IsoDurationWords = 'hello';
      // @ts-expect-error - empty string
      const f: IsoDurationWords = '';
      // @ts-expect-error - iso timestamp instead of duration
      const g: IsoDurationWords = '2024-01-15T10:30:00Z';
      // note: 'P-1D' is accepted by template literal (${number} allows negatives)
      // but runtime validation should reject it
      expect([a, b, c, d, e, f, g]).toBeDefined();
    });

    it('should reject non-string types at compile time', () => {
      // @ts-expect-error - number
      const a: IsoDurationWords = 5000;
      // @ts-expect-error - object
      const b: IsoDurationWords = { seconds: 5 };
      // @ts-expect-error - null
      const c: IsoDurationWords = null;
      // @ts-expect-error - undefined
      const d: IsoDurationWords = undefined;
      // @ts-expect-error - array
      const e: IsoDurationWords = ['PT5S'];
      // @ts-expect-error - boolean
      const f: IsoDurationWords = true;
      expect([a, b, c, d, e, f]).toBeDefined();
    });
  });
});
