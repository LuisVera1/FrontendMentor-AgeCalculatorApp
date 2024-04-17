const getStartNumber = (number) => {
	if (number >= 10) return number - 10;

	const numStr = number.toString();
	const numberLength = numStr.length;
	return number - Number(numStr[numberLength - 1]);
};

export const getDataCounter = ({ years, months, days }) => {
	return {
		years: years,
		yearsI: getStartNumber(years),
		months: months,
		monthsI: getStartNumber(months),
		days: days,
		daysI: getStartNumber(days),
	};
};
