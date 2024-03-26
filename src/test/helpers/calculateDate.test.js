import {
	calculateDate,
	getMonths,
	getYears,
} from '../../helpers/calculateDate';

describe('Test in calculateDate.js', () => {
	test('must return years and reamin days', () => {
		const sDate = {
			year: 1998,
			month: 1,
			day: 15,
		};

		const eDate = {
			year: 2024,
			month: 2,
			day: 24,
		};

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
		const sDate = {
			year: 1998,
			month: 1,
			day: 15,
		};

		const eDate = {
			year: 2024,
			month: 2,
			day: 24,
		};

		const result = {
			years: 26,
			months: 1,
			days: 9,
		};

		expect(calculateDate(sDate, eDate)).toEqual(result);
	});

	test('must return years, months and days between no leap years', () => {
		const sDate = {
			year: 2020,
			month: 2,
			day: 15,
		};

		const eDate = {
			year: 2024,
			month: 1,
			day: 25,
		};

		const result = {
			years: 3,
			months: 11,
			days: 10,
		};

		expect(calculateDate(sDate, eDate)).toEqual(result);
	});

	test('must return years, months, and days between two very distant dates', () => {
		const sDate = {
			year: 1614,
			month: 11,
			day: 31,
		};

		const eDate = {
			year: 2024,
			month: 0,
			day: 1,
		};

		const result = {
			years: 409,
			months: 0,
			days: 1,
		};

		expect(calculateDate(sDate, eDate)).toEqual(result);
	});

	test('if the data is incorrect, the function returns null', () => {
		const sDate = {
			year: 1998,
			month: 1,
			day: 15,
		};

		const eDate = {
			year: 2024,
			month: 2,
			day: 24,
		};

		expect(calculateDate(eDate, sDate)).toBeNull();
	});
});
