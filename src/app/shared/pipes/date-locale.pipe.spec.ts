import { DateLocalePipe } from './date-locale.pipe';

describe('DateLocalePipe', () => {
  it('create an instance', () => {
    const pipe = new DateLocalePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform date in a long format: Test Data 1 (\'Asia/Kolkata\')', () => {
    const pipe = new DateLocalePipe();
    expect(pipe.transform('1688541539154', 'en-US', 'GMT+05:30')).toBe('Wednesday, July 5, 2023, 12:48:59 PM GMT+05:30');
  });

  it('should transform date in a long format: Test Data 2 (\'Europe/London\')', () => {
    const pipe = new DateLocalePipe();
    expect(pipe.transform('1688541539154', 'en-US', 'GMT-08:00')).toBe('Tuesday, July 4, 2023, 11:18:59 PM GMT-08:00');
  });

  it('should transform date in a long format: Test Data 1 (\'Asia/Kolkata\')', () => {
    const pipe = new DateLocalePipe();
    expect(pipe.transform('1688541539154', 'en-US', 'GMT-11:00')).toBe('Tuesday, July 4, 2023, 8:18:59 PM GMT-11:00');
  });
});
