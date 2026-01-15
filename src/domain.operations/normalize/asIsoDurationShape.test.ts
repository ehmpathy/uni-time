import { asIsoDurationShape } from './asIsoDurationShape';

describe('asIsoDurationShape', () => {
  describe('string format inputs - time-only', () => {
    it('should parse seconds', () => {
      expect(asIsoDurationShape('PT5S')).toEqual({ seconds: 5 });
      expect(asIsoDurationShape('PT0S')).toEqual({ seconds: 0 });
      expect(asIsoDurationShape('PT999S')).toEqual({ seconds: 999 });
    });

    it('should parse minutes', () => {
      expect(asIsoDurationShape('PT30M')).toEqual({ minutes: 30 });
      expect(asIsoDurationShape('PT0M')).toEqual({ minutes: 0 });
    });

    it('should parse hours', () => {
      expect(asIsoDurationShape('PT2H')).toEqual({ hours: 2 });
      expect(asIsoDurationShape('PT24H')).toEqual({ hours: 24 });
    });

    it('should parse combined time patterns', () => {
      expect(asIsoDurationShape('PT2H30M')).toEqual({ hours: 2, minutes: 30 });
      expect(asIsoDurationShape('PT2H45S')).toEqual({ hours: 2, seconds: 45 });
      expect(asIsoDurationShape('PT30M45S')).toEqual({
        minutes: 30,
        seconds: 45,
      });
      expect(asIsoDurationShape('PT2H30M45S')).toEqual({
        hours: 2,
        minutes: 30,
        seconds: 45,
      });
    });
  });

  describe('string format inputs - date-only', () => {
    it('should parse years', () => {
      expect(asIsoDurationShape('P1Y')).toEqual({ years: 1 });
      expect(asIsoDurationShape('P100Y')).toEqual({ years: 100 });
    });

    it('should parse months', () => {
      expect(asIsoDurationShape('P6M')).toEqual({ months: 6 });
      expect(asIsoDurationShape('P12M')).toEqual({ months: 12 });
    });

    it('should parse weeks', () => {
      expect(asIsoDurationShape('P2W')).toEqual({ weeks: 2 });
      expect(asIsoDurationShape('P52W')).toEqual({ weeks: 52 });
    });

    it('should parse days', () => {
      expect(asIsoDurationShape('P30D')).toEqual({ days: 30 });
      expect(asIsoDurationShape('P365D')).toEqual({ days: 365 });
    });

    it('should parse combined date patterns', () => {
      expect(asIsoDurationShape('P1Y6M')).toEqual({ years: 1, months: 6 });
      expect(asIsoDurationShape('P1Y15D')).toEqual({ years: 1, days: 15 });
      expect(asIsoDurationShape('P1Y6M15D')).toEqual({
        years: 1,
        months: 6,
        days: 15,
      });
      expect(asIsoDurationShape('P2W3D')).toEqual({ weeks: 2, days: 3 });
    });
  });

  describe('string format inputs - combined date and time', () => {
    it('should parse date + time patterns', () => {
      expect(asIsoDurationShape('P1DT2H')).toEqual({ days: 1, hours: 2 });
      expect(asIsoDurationShape('P1DT2H30M')).toEqual({
        days: 1,
        hours: 2,
        minutes: 30,
      });
      expect(asIsoDurationShape('P1Y6M15DT12H30M45S')).toEqual({
        years: 1,
        months: 6,
        days: 15,
        hours: 12,
        minutes: 30,
        seconds: 45,
      });
    });

    it('should parse year + time patterns', () => {
      expect(asIsoDurationShape('P1YT2H')).toEqual({ years: 1, hours: 2 });
      expect(asIsoDurationShape('P1Y6MT2H30M')).toEqual({
        years: 1,
        months: 6,
        hours: 2,
        minutes: 30,
      });
    });
  });

  describe('string format inputs - decimal seconds', () => {
    it('should convert decimal seconds to milliseconds', () => {
      expect(asIsoDurationShape('PT0.5S')).toEqual({ milliseconds: 500 });
      expect(asIsoDurationShape('PT0.1S')).toEqual({ milliseconds: 100 });
      expect(asIsoDurationShape('PT0.001S')).toEqual({ milliseconds: 1 });
    });

    it('should split whole and fractional seconds', () => {
      expect(asIsoDurationShape('PT1.5S')).toEqual({
        seconds: 1,
        milliseconds: 500,
      });
      expect(asIsoDurationShape('PT1.001S')).toEqual({
        seconds: 1,
        milliseconds: 1,
      });
      expect(asIsoDurationShape('PT10.25S')).toEqual({
        seconds: 10,
        milliseconds: 250,
      });
    });

    it('should handle decimal seconds with other time components', () => {
      expect(asIsoDurationShape('PT2H30M1.5S')).toEqual({
        hours: 2,
        minutes: 30,
        seconds: 1,
        milliseconds: 500,
      });
    });
  });

  describe('string format inputs - error cases', () => {
    it('should throw on invalid strings', () => {
      expect(() => asIsoDurationShape('invalid' as any)).toThrow(
        'invalid iso duration string',
      );
      expect(() => asIsoDurationShape('5S' as any)).toThrow(
        'invalid iso duration string',
      );
      expect(() => asIsoDurationShape('' as any)).toThrow(
        'invalid iso duration string',
      );
      expect(() => asIsoDurationShape('P' as any)).toThrow(
        'invalid iso duration string',
      );
      expect(() => asIsoDurationShape('PT' as any)).toThrow(
        'invalid iso duration string',
      );
    });
  });

  describe('object format inputs', () => {
    it('should pass through single-field durations unchanged', () => {
      const duration = { hours: 2 };
      expect(asIsoDurationShape(duration)).toBe(duration);
    });

    it('should pass through multi-field durations unchanged', () => {
      const duration = { hours: 2, minutes: 30 };
      expect(asIsoDurationShape(duration)).toBe(duration);
    });

    it('should pass through complex durations unchanged', () => {
      const duration = {
        years: 1,
        months: 2,
        weeks: 3,
        days: 4,
        hours: 5,
        minutes: 6,
        seconds: 7,
        milliseconds: 8,
      };
      expect(asIsoDurationShape(duration)).toBe(duration);
    });

    it('should maintain reference equality for objects', () => {
      const duration = { seconds: 5 };
      const result = asIsoDurationShape(duration);
      expect(result).toBe(duration);
      expect(Object.is(result, duration)).toBe(true);
    });
  });
});
