import { calculateDate } from '../../helpers/calculateDate';

describe('Test in calculateDate.js', () => {
	test('must return year, months and days', () => {
		const sDate = new Date(1998, 1, 15);
		const eDate = new Date(2024, 2, 24);
		const result = {
			years: 26,
			months: 1,
			days: 9,
		};
		expect(calculateDate(sDate, eDate)).toEqual(result);
	});

	test('must return years, months and days between no leap years', () => {
		const sDate = new Date(2020, 2, 15);
		const eDate = new Date(2024, 1, 25);
		const result = {
			years: 3,
			months: 11,
			days: 10,
		};
		expect(calculateDate(sDate, eDate)).toEqual(result);
	});

	test('must return years, months, and days between two very distant dates', () => {
		const sDate = new Date(1614, 11, 31);
		const eDate = new Date(2024, 0, 1);
		const result = {
			years: 409,
			months: 0,
			days: 1,
		};
		expect(calculateDate(sDate, eDate)).toEqual(result);
	});

	test('Must return valid results in a large range of dates', () => {
		const eDate = new Date();
		for (let year = 2023; year >= 1800; year--) {
			const sDate = new Date(year, 3, 20);
			const data = calculateDate(sDate, eDate);
			// console.log({ year });
			expect(data.years).toBeGreaterThanOrEqual(0);
			expect(data.months).toBeGreaterThanOrEqual(0);
			expect(data.days).toBeGreaterThanOrEqual(0);
		}
	});

	test('if the data is incorrect, the function returns null', () => {
		const sDate = new Date(1998, 1, 15);
		const eDate = new Date(2024, 2, 24);
		expect(calculateDate(eDate, sDate)).toBeNull();
	});
});
