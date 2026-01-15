import type { IsoDurationShape } from './IsoDurationShape';

describe('IsoDurationShape type', () => {
  describe('positive cases - valid assignments', () => {
    it('should accept single field durations', () => {
      const a: IsoDurationShape = { seconds: 5 };
      const b: IsoDurationShape = { minutes: 30 };
      const c: IsoDurationShape = { hours: 2 };
      const d: IsoDurationShape = { days: 7 };
      const e: IsoDurationShape = { weeks: 2 };
      const f: IsoDurationShape = { months: 6 };
      const g: IsoDurationShape = { years: 1 };
      const h: IsoDurationShape = { milliseconds: 500 };
      expect([a, b, c, d, e, f, g, h]).toBeDefined();
    });

    it('should accept multi-field durations', () => {
      const a: IsoDurationShape = { hours: 1, minutes: 30 };
      const b: IsoDurationShape = { years: 1, months: 6, days: 15 };
      const c: IsoDurationShape = { weeks: 2, days: 3 };
      const d: IsoDurationShape = { hours: 2, minutes: 30, seconds: 45 };
      const e: IsoDurationShape = { days: 1, hours: 12 };
      expect([a, b, c, d, e]).toBeDefined();
    });

    it('should accept all fields combined', () => {
      const duration: IsoDurationShape = {
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
      expect(duration.years).toBe(1);
      expect(duration.months).toBe(2);
      expect(duration.weeks).toBe(3);
      expect(duration.days).toBe(4);
      expect(duration.hours).toBe(5);
      expect(duration.minutes).toBe(6);
      expect(duration.seconds).toBe(7);
      expect(duration.milliseconds).toBe(8);
    });

    it('should accept zero values', () => {
      const a: IsoDurationShape = { seconds: 0 };
      const b: IsoDurationShape = { hours: 0, minutes: 0 };
      expect([a, b]).toBeDefined();
    });

    it('should accept decimal values', () => {
      const a: IsoDurationShape = { hours: 1.5 };
      const b: IsoDurationShape = { days: 0.5 };
      expect([a, b]).toBeDefined();
    });

    it('should accept large values', () => {
      const a: IsoDurationShape = { years: 100 };
      const b: IsoDurationShape = { milliseconds: 999999999 };
      expect([a, b]).toBeDefined();
    });
  });

  describe('negative cases - invalid assignments', () => {
    it('should reject invalid object shapes at compile time', () => {
      // @ts-expect-error - empty object
      const a: IsoDurationShape = {};
      // @ts-expect-error - invalid key
      const b: IsoDurationShape = { foo: 1 };
      // @ts-expect-error - string value instead of number
      const c: IsoDurationShape = { seconds: '5' };
      // @ts-expect-error - multiple invalid keys
      const d: IsoDurationShape = { foo: 1, bar: 2 };
      // @ts-expect-error - mix of valid and invalid keys
      const e: IsoDurationShape = { seconds: 5, foo: 1 };
      // @ts-expect-error - boolean value
      const f: IsoDurationShape = { hours: true };
      // @ts-expect-error - null value for field
      const g: IsoDurationShape = { seconds: null };
      expect([a, b, c, d, e, f, g]).toBeDefined();
    });

    it('should reject non-object types at compile time', () => {
      // @ts-expect-error - null
      const a: IsoDurationShape = null;
      // @ts-expect-error - string (iso duration words format)
      const b: IsoDurationShape = 'PT5S';
      // @ts-expect-error - number
      const c: IsoDurationShape = 5000;
      // @ts-expect-error - undefined
      const d: IsoDurationShape = undefined;
      // @ts-expect-error - array
      const e: IsoDurationShape = [{ seconds: 5 }];
      // @ts-expect-error - boolean
      const f: IsoDurationShape = false;
      // @ts-expect-error - arbitrary string
      const g: IsoDurationShape = 'hello';
      expect([a, b, c, d, e, f, g]).toBeDefined();
    });
  });
});
