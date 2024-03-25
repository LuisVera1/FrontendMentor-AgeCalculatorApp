const errorMessages = {
	notValidDate: 'Must be a valid day',
	notValidMonth: 'Must be a valid month',
	notValidYear: 'Must be in the past',
};

export const validateForm = ({ value, name }) => {
	let error = false;
	let message = '';

	// validate day
	if (name === 'day') {
		if (value > 0 && value < 32) {
			error = false;
			message = '';
		} else {
			error = true;
			message = errorMessages.notValidDate;
		}
	}

	// validate month
	if (name === 'month') {
		if (value > 0 && value < 13) {
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
