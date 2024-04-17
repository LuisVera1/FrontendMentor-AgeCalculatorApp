export const getYears = (sDate, eDate) => {
	const days = Math.floor((eDate - sDate) / (1000 * 60 * 60 * 24));

	if (days < 0) return null;

	const years = Math.floor(days / 365);

	const eYear = eDate.getFullYear();
	const eMonth = eDate.getMonth();
	const eDay = eDate.getDate();

	const exactDate = new Date(eYear - years, eMonth, eDay);
	const remainDays =
		days - Math.floor((eDate - exactDate) / (1000 * 60 * 60 * 24));

	return {
		years,
		remainDays,
		currentMonth: eMonth,
		currentYear: eYear - years,
	};
};

const isLeapYear = (year) => {
	if (year % 4 == 0) {
		if (year % 100 == 0) {
			if (year % 400 == 0) {
				return true;
			}
		} else {
			return true;
		}
	} else {
		return false;
	}

	return false;
};

export const getMonths = ({ remainDays, currentMonth, currentYear }) => {
	const daysInMonths = {
		0: 31,
		1: isLeapYear(currentYear) ? 29 : 28,
		2: 31,
		3: 30,
		4: 31,
		5: 30,
		6: 31,
		7: 31,
		8: 30,
		9: 31,
		10: 30,
		11: 31,
	};

	let days = remainDays;
	let months = 0;
	let previusMonth = currentMonth == 0 ? 11 : currentMonth - 1;

	while (days > daysInMonths[previusMonth]) {
		months++;
		days -= daysInMonths[previusMonth];

		if (previusMonth == 0) {
			previusMonth = 11;
		} else {
			previusMonth -= 1;
		}
	}

	return { months, days };
};

/*   main function   */
export const calculateDate = (sTime, eTime) => {
	const yearsAndDays = getYears(sTime, eTime);
	if (!yearsAndDays) return null;

	const { years, remainDays, currentMonth, currentYear } = yearsAndDays;
	const monthsAndDays = getMonths({ remainDays, currentMonth, currentYear });
	const { months, days } = monthsAndDays;

	return { years, months, days };
};
