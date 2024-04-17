import {
	calculateDate,
	getMonths,
	getYears,
} from '../../helpers/calculateDate';

describe('Test in calculateDate.js', () => {
	test('must return years and reamin days', () => {
		const sDate = new Date(1998, 1, 15);
		const eDate = new Date(2024, 2, 24);

		const difference = {
			years: 26,
			remainDays: 37,
			currentMonth: 2,
			currentYear: 1998,
		};

		expect(getYears(sDate, eDate)).toEqual(difference);
	});

	test('get months and reamin days', () => {
		const data = {
			remainDays: 37,
			currentMonth: 2,
			currentYear: 1998,
		};

		const result = {
			months: 1,
			days: 9,
		};

		expect(getMonths(data)).toEqual(result);
	});

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

	test('if the data is incorrect, the function returns null', () => {
		const sDate = new Date(1998, 1, 15);
		const eDate = new Date(2024, 2, 24);

		expect(calculateDate(eDate, sDate)).toBeNull();
	});
});
