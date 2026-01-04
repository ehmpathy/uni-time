import type {
  IsoDayFloat,
  IsoHourFloat,
  IsoMinuteFloat,
  IsoMonthFloat,
  IsoTimeFloat,
  IsoWeekdayFloat,
} from '@src/domain.objects/IsoTimeFloat';

describe('IsoTimeFloat types', () => {
  describe('IsoTimeFloat', () => {
    it('should accept valid time format HH:mm:ss', () => {
      const time: IsoTimeFloat = '14:30:00' as IsoTimeFloat;
      expect(time).toBeDefined();
    });
  });

  describe('IsoHourFloat', () => {
    it('should accept valid hour format HH', () => {
      const hour: IsoHourFloat = '14' as IsoHourFloat;
      expect(hour).toBeDefined();
    });
  });

  describe('IsoMinuteFloat', () => {
    it('should accept valid minute format mm', () => {
      const minute: IsoMinuteFloat = '30' as IsoMinuteFloat;
      expect(minute).toBeDefined();
    });
  });

  describe('IsoMonthFloat', () => {
    it('should accept valid month format MM', () => {
      const month: IsoMonthFloat = '01' as IsoMonthFloat;
      expect(month).toBeDefined();
    });
  });

  describe('IsoDayFloat', () => {
    it('should accept valid day format dd', () => {
      const day: IsoDayFloat = '15' as IsoDayFloat;
      expect(day).toBeDefined();
    });
  });

  describe('IsoWeekdayFloat', () => {
    it('should accept valid weekday format d (1-7)', () => {
      const weekday: IsoWeekdayFloat = '1' as IsoWeekdayFloat;
      expect(weekday).toBeDefined();
    });
  });
});
