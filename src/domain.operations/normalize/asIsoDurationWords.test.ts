import { asIsoDurationWords } from './asIsoDurationWords';

describe('asIsoDurationWords', () => {
  describe('object format inputs - time-only', () => {
    it('should format seconds', () => {
      expect(asIsoDurationWords({ seconds: 5 })).toEqual('PT5S');
      expect(asIsoDurationWords({ seconds: 0 })).toEqual('PT0S');
      expect(asIsoDurationWords({ seconds: 999 })).toEqual('PT999S');
    });

    it('should format minutes', () => {
      expect(asIsoDurationWords({ minutes: 30 })).toEqual('PT30M');
      expect(asIsoDurationWords({ minutes: 1 })).toEqual('PT1M');
    });

    it('should format hours', () => {
      expect(asIsoDurationWords({ hours: 2 })).toEqual('PT2H');
      expect(asIsoDurationWords({ hours: 24 })).toEqual('PT24H');
    });

    it('should format combined time patterns', () => {
      expect(asIsoDurationWords({ hours: 2, minutes: 30 })).toEqual('PT2H30M');
      expect(asIsoDurationWords({ hours: 2, seconds: 45 })).toEqual('PT2H45S');
      expect(asIsoDurationWords({ minutes: 30, seconds: 45 })).toEqual(
        'PT30M45S',
      );
      expect(
        asIsoDurationWords({ hours: 2, minutes: 30, seconds: 45 }),
      ).toEqual('PT2H30M45S');
    });
  });

  describe('object format inputs - date-only', () => {
    it('should format years', () => {
      expect(asIsoDurationWords({ years: 1 })).toEqual('P1Y');
      expect(asIsoDurationWords({ years: 100 })).toEqual('P100Y');
    });

    it('should format months', () => {
      expect(asIsoDurationWords({ months: 6 })).toEqual('P6M');
      expect(asIsoDurationWords({ months: 12 })).toEqual('P12M');
    });

    it('should format weeks', () => {
      expect(asIsoDurationWords({ weeks: 2 })).toEqual('P2W');
      expect(asIsoDurationWords({ weeks: 52 })).toEqual('P52W');
    });

    it('should format days', () => {
      expect(asIsoDurationWords({ days: 30 })).toEqual('P30D');
      expect(asIsoDurationWords({ days: 365 })).toEqual('P365D');
    });

    it('should format combined date patterns', () => {
      expect(asIsoDurationWords({ years: 1, months: 6 })).toEqual('P1Y6M');
      expect(asIsoDurationWords({ years: 1, days: 15 })).toEqual('P1Y15D');
      expect(asIsoDurationWords({ years: 1, months: 6, days: 15 })).toEqual(
        'P1Y6M15D',
      );
      expect(asIsoDurationWords({ weeks: 2, days: 3 })).toEqual('P2W3D');
    });
  });

  describe('object format inputs - combined date and time', () => {
    it('should format date + time patterns', () => {
      expect(asIsoDurationWords({ days: 1, hours: 2 })).toEqual('P1DT2H');
      expect(asIsoDurationWords({ days: 1, hours: 2, minutes: 30 })).toEqual(
        'P1DT2H30M',
      );
      expect(
        asIsoDurationWords({
          years: 1,
          months: 6,
          days: 15,
          hours: 12,
          minutes: 30,
          seconds: 45,
        }),
      ).toEqual('P1Y6M15DT12H30M45S');
    });

    it('should format year + time patterns', () => {
      expect(asIsoDurationWords({ years: 1, hours: 2 })).toEqual('P1YT2H');
      expect(
        asIsoDurationWords({ years: 1, months: 6, hours: 2, minutes: 30 }),
      ).toEqual('P1Y6MT2H30M');
    });
  });

  describe('object format inputs - milliseconds', () => {
    it('should convert milliseconds to decimal seconds', () => {
      expect(asIsoDurationWords({ milliseconds: 500 })).toEqual('PT0.5S');
      expect(asIsoDurationWords({ milliseconds: 100 })).toEqual('PT0.1S');
      expect(asIsoDurationWords({ milliseconds: 1 })).toEqual('PT0.001S');
    });

    it('should combine seconds and milliseconds', () => {
      expect(asIsoDurationWords({ seconds: 1, milliseconds: 500 })).toEqual(
        'PT1.5S',
      );
      expect(asIsoDurationWords({ seconds: 1, milliseconds: 1 })).toEqual(
        'PT1.001S',
      );
      expect(asIsoDurationWords({ seconds: 10, milliseconds: 250 })).toEqual(
        'PT10.25S',
      );
    });

    it('should handle milliseconds with other time components', () => {
      expect(
        asIsoDurationWords({
          hours: 2,
          minutes: 30,
          seconds: 1,
          milliseconds: 500,
        }),
      ).toEqual('PT2H30M1.5S');
    });
  });

  describe('object format inputs - edge cases', () => {
    it('should handle empty object as zero duration', () => {
      expect(asIsoDurationWords({} as any)).toEqual('PT0S');
    });

    it('should handle all zero values as zero duration', () => {
      expect(asIsoDurationWords({ hours: 0, minutes: 0, seconds: 0 })).toEqual(
        'PT0S',
      );
    });
  });

  describe('string format inputs', () => {
    it('should pass through time-only strings unchanged', () => {
      expect(asIsoDurationWords('PT5S')).toEqual('PT5S');
      expect(asIsoDurationWords('PT30M')).toEqual('PT30M');
      expect(asIsoDurationWords('PT2H30M45S')).toEqual('PT2H30M45S');
    });

    it('should pass through date-only strings unchanged', () => {
      expect(asIsoDurationWords('P1Y')).toEqual('P1Y');
      expect(asIsoDurationWords('P6M')).toEqual('P6M');
      expect(asIsoDurationWords('P1Y6M15D')).toEqual('P1Y6M15D');
    });

    it('should pass through combined strings unchanged', () => {
      expect(asIsoDurationWords('P1DT2H')).toEqual('P1DT2H');
      expect(asIsoDurationWords('P1Y6M15DT12H30M45S')).toEqual(
        'P1Y6M15DT12H30M45S',
      );
    });

    it('should maintain reference equality for strings', () => {
      const duration = 'PT5S' as const;
      const result = asIsoDurationWords(duration);
      expect(result).toBe(duration);
    });
  });
});
