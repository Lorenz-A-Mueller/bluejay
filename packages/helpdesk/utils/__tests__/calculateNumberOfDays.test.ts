import { calculateNumberOfDays } from '../calculateNumberOfDays';

test('Test whether the number of days between 01-01-2020 and 01-01-2021 is calculated to be 365 ', () => {
  expect(calculateNumberOfDays(1577836800000, 1609459200000)).toBe(365);
});
