import type { IsoDuration } from '@src/domain.objects/IsoDuration';

describe('IsoDuration type', () => {
  it('should accept duration with years', () => {
    const duration: IsoDuration = { years: 1 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with months', () => {
    const duration: IsoDuration = { months: 6 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with weeks', () => {
    const duration: IsoDuration = { weeks: 2 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with days', () => {
    const duration: IsoDuration = { days: 7 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with hours', () => {
    const duration: IsoDuration = { hours: 24 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with minutes', () => {
    const duration: IsoDuration = { minutes: 60 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with seconds', () => {
    const duration: IsoDuration = { seconds: 30 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with milliseconds', () => {
    const duration: IsoDuration = { milliseconds: 500 };
    expect(duration).toBeDefined();
  });

  it('should accept duration with multiple fields', () => {
    const duration: IsoDuration = {
      years: 1,
      months: 6,
      days: 15,
      hours: 12,
    };
    expect(duration).toBeDefined();
  });

  it('should accept minimal duration with one field set to zero', () => {
    // PickAny requires at least one field; use 0 value for zero duration
    const duration: IsoDuration = { milliseconds: 0 };
    expect(duration).toBeDefined();
  });

  it('should accept all fields combined', () => {
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
    expect(duration.years).toBe(1);
    expect(duration.months).toBe(2);
    expect(duration.weeks).toBe(3);
    expect(duration.days).toBe(4);
    expect(duration.hours).toBe(5);
    expect(duration.minutes).toBe(6);
    expect(duration.seconds).toBe(7);
    expect(duration.milliseconds).toBe(8);
  });
});
