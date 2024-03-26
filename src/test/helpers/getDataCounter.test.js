import { getDataCounter } from '../../helpers/getDataCounter';

describe('Test in getDataCounter file', () => {
	test('must return all data and its values without the last digit', () => {
		const data = {
			years: 26,
			months: 1,
			days: 9,
		};

		const result = {
			years: 26,
			yearsI: 20,
			months: 1,
			monthsI: 0,
			days: 9,
			daysI: 0,
		};

		expect(getDataCounter(data)).toEqual(result);

		const data2 = {
			years: 98,
			months: 9,
			days: 27,
		};

		const result2 = {
			years: 98,
			yearsI: 90,
			months: 9,
			monthsI: 0,
			days: 27,
			daysI: 20,
		};

		expect(getDataCounter(data2)).toEqual(result2);

		const data3 = {
			years: 70,
			months: 10,
			days: 20,
		};

		const result3 = {
			years: 70,
			yearsI: 70,
			months: 10,
			monthsI: 10,
			days: 20,
			daysI: 20,
		};

		expect(getDataCounter(data3)).toEqual(result3);
	});
});
