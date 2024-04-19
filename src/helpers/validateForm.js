export const errorMessages = {
	notValidDate: 'Must be a valid day',
	notValidMonth: 'Must be a valid month',
	notValidYear: 'Must be in the past',
};

/**
 * Validate inputs to eval if the value is logic
 * @param {*} value
 * @param {*} name
 * @example
 * year <= current year
 * months between 1 and 12
 * days between 1 and 31
 */
export const validateForm = ({ value, name }) => {
	let error = false;
	let message = '';

	// validate day
	if (name === 'day') {
		if (value >= 1 && value <= 31) {
			error = false;
			message = '';
		} else {
			error = true;
			message = errorMessages.notValidDate;
		}
	}

	// validate month
	if (name === 'month') {
		if (value >= 1 && value <= 12) {
			error = false;
			message = '';
		} else {
			error = true;
			message = errorMessages.notValidMonth;
		}
	}

	// validate year
	if (name === 'year') {
		const date = new Date();
		const year = date.getFullYear();

		if (value <= year) {
			error = false;
			message = '';
		} else {
			error = true;
			message = errorMessages.notValidYear;
		}
	}

	return { error, message };
};
