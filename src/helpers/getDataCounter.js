const getLastDigit = (number) => {
	const numStr = number.toString();
	const numberLength = numStr.length;
	return Number(numStr[numberLength - 1]);
};

export const getDataCounter = ({ years, months, days }) => {
	return {
		years: years,
		yearsI: years - getLastDigit(years),
		months: months,
		monthsI: months - getLastDigit(months),
		days: days,
		daysI: days - getLastDigit(days),
	};
};
