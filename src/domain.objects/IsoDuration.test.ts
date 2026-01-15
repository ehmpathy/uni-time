import type {
  IsoDuration,
  IsoDurationShape,
  IsoDurationWords,
} from './IsoDuration';

describe('IsoDuration type', () => {
  describe('positive cases - valid string format (IsoDurationWords)', () => {
    it('should accept valid time-only string patterns', () => {
      const a: IsoDuration = 'PT5S';
      const b: IsoDuration = 'PT30M';
      const c: IsoDuration = 'PT2H';
      const d: IsoDuration = 'PT2H30M45S';
      const e: IsoDuration = 'PT0.5S';
      expect([a, b, c, d, e]).toBeDefined();
    });

    it('should accept valid date-only string patterns', () => {
      const a: IsoDuration = 'P1Y';
      const b: IsoDuration = 'P6M';
      const c: IsoDuration = 'P2W';
      const d: IsoDuration = 'P30D';
      const e: IsoDuration = 'P1Y6M15D';
      expect([a, b, c, d, e]).toBeDefined();
    });

    it('should accept valid combined string patterns', () => {
      const a: IsoDuration = 'P1DT2H';
      const b: IsoDuration = 'P1DT2H30M';
      const c: IsoDuration = 'P1Y6M15DT12H30M45S';
      expect([a, b, c]).toBeDefined();
    });
  });

  describe('positive cases - valid object format (IsoDurationShape)', () => {
    it('should accept single field object durations', () => {
      const a: IsoDuration = { seconds: 5 };
      const b: IsoDuration = { minutes: 30 };
      const c: IsoDuration = { hours: 2 };
      const d: IsoDuration = { days: 7 };
      const e: IsoDuration = { weeks: 2 };
      const f: IsoDuration = { months: 6 };
      const g: IsoDuration = { years: 1 };
      const h: IsoDuration = { milliseconds: 500 };
      expect([a, b, c, d, e, f, g, h]).toBeDefined();
    });

    it('should accept multi-field object durations', () => {
      const a: IsoDuration = { years: 1, months: 6 };
      const b: IsoDuration = { days: 1, hours: 2, minutes: 30 };
      const c: IsoDuration = { hours: 2, minutes: 30, seconds: 45 };
      expect([a, b, c]).toBeDefined();
    });

    it('should accept duration with all object fields', () => {
      const duration: IsoDuration = {
        years: 1,
        months: 2,
        weeks: 3,
        days: 4,
        hours: 5,
        minutes: 6,
        seconds: 7,
        milliseconds: 8,
      };
      expect(duration).toBeDefined();
    });
  });

  describe('positive cases - type assignability', () => {
    it('should allow IsoDurationWords to be assigned to IsoDuration', () => {
      const words: IsoDurationWords = 'PT1H';
      const duration: IsoDuration = words;
      expect(duration).toBeDefined();
    });

    it('should allow IsoDurationShape to be assigned to IsoDuration', () => {
      const shape: IsoDurationShape = { hours: 1 };
      const duration: IsoDuration = shape;
      expect(duration).toBeDefined();
    });

    it('should allow both formats to coexist in arrays', () => {
      const durations: IsoDuration[] = [
        'PT5S',
        { seconds: 5 },
        'P1D',
        { days: 1 },
      ];
      expect(durations).toHaveLength(4);
    });
  });

  describe('negative cases - invalid string patterns', () => {
    it('should reject invalid string patterns at compile time', () => {
      // @ts-expect-error - arbitrary string
      const a: IsoDuration = 'invalid';
      // @ts-expect-error - absent P designator
      const b: IsoDuration = '5S';
      // @ts-expect-error - lowercase designators
      const c: IsoDuration = 'pt5s';
      // @ts-expect-error - empty period
      const d: IsoDuration = 'P';
      // @ts-expect-error - empty time component
      const e: IsoDuration = 'PT';
      // @ts-expect-error - empty string
      const f: IsoDuration = '';
      // @ts-expect-error - iso timestamp instead of duration
      const g: IsoDuration = '2024-01-15T10:30:00Z';
      expect([a, b, c, d, e, f, g]).toBeDefined();
    });
  });

  describe('negative cases - invalid object shapes', () => {
    it('should reject invalid object shapes at compile time', () => {
      // @ts-expect-error - empty object
      const a: IsoDuration = {};
      // @ts-expect-error - invalid key
      const b: IsoDuration = { foo: 1 };
      // @ts-expect-error - string value instead of number
      const c: IsoDuration = { seconds: '5' };
      // @ts-expect-error - mix of valid and invalid keys
      const d: IsoDuration = { seconds: 5, foo: 1 };
      // @ts-expect-error - boolean value
      const e: IsoDuration = { hours: true };
      expect([a, b, c, d, e]).toBeDefined();
    });
  });

  describe('negative cases - invalid types', () => {
    it('should reject non-duration types at compile time', () => {
      // @ts-expect-error - null
      const a: IsoDuration = null;
      // @ts-expect-error - undefined
      const b: IsoDuration = undefined;
      // @ts-expect-error - number (milliseconds should be wrapped in object)
      const c: IsoDuration = 5000;
      // @ts-expect-error - boolean
      const d: IsoDuration = true;
      // @ts-expect-error - array
      const e: IsoDuration = ['PT5S'];
      // @ts-expect-error - Date object
      const f: IsoDuration = new Date();
      expect([a, b, c, d, e, f]).toBeDefined();
    });
  });

  describe('negative cases - cross-assignment between constituent types', () => {
    it('should NOT allow IsoDuration to narrow to IsoDurationWords when object', () => {
      const duration: IsoDuration = { hours: 1 };
      // @ts-expect-error - object format cannot be assigned to words-only type
      const words: IsoDurationWords = duration;
      expect(words).toBeDefined();
    });

    it('should NOT allow IsoDuration to narrow to IsoDurationShape when string', () => {
      const duration: IsoDuration = 'PT1H';
      // @ts-expect-error - string format cannot be assigned to shape-only type
      const shape: IsoDurationShape = duration;
      expect(shape).toBeDefined();
    });

    it('should NOT allow direct cross-assignment between Words and Shape', () => {
      const words: IsoDurationWords = 'PT1H';
      const shape: IsoDurationShape = { hours: 1 };

      // @ts-expect-error - words cannot be assigned to shape
      const toShape: IsoDurationShape = words;
      // @ts-expect-error - shape cannot be assigned to words
      const toWords: IsoDurationWords = shape;

      expect([toShape, toWords]).toBeDefined();
    });
  });
});
