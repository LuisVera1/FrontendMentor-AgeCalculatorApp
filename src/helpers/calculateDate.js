// calculate if a given year is leap
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

export const calculateDate = (sTime, eTime) => {

	if(sTime > eTime) return null;

	let sYearTmp = sTime.getFullYear();
	const daysInMonths = {
		0: 31,
		1: isLeapYear(sYearTmp),
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

	//calculate days
	let days = 0;
	const eDay = eTime.getDate();
	const sDay = sTime.getDate();

	let nextMonth = sTime.getMonth() + 1;
	if(nextMonth >= 12) nextMonth = 0;

	let fixMonths = 0;
	if (sDay > eDay) {
		//start day > end day
		// days in next month - (startDay - endDay)
		days = daysInMonths[nextMonth] - (sDay - eDay);
		fixMonths++;
	} else {
		days = eDay - sDay;
	}

	//calculate months
	let months = 0;
	const eMonths = eTime.getMonth() - fixMonths;
	const sMonths = sTime.getMonth();
	let fixYears = 0;

	if (sMonths > eMonths) {
		months = 12 - (sMonths - eMonths);
		fixYears++;
	} else {
		months = eMonths - sMonths;
	}

	//Calculate years
	const eYear = eTime.getFullYear();
	const sYear = sTime.getFullYear();
	const years = eYear - sYear - fixYears;
	return { days, months, years };
};
