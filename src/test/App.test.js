import {
	cleanup,
	fireEvent,
	getAllByTestId,
	getByTestId,
	render,
	screen,
} from '@testing-library/react';
import App from '../App';
import { errorMessages } from '../helpers';

describe('Test in <App />', () => {
	afterEach(cleanup);

	test('Must be match with the snapshot', () => {
		const { container } = render(<App />);

		expect(container).toMatchSnapshot();
	});

	test('Results must be displayed when a valid date is entered', () => {
		render(<App />);

		//empty values
		const pYears = screen.getByTestId('p-years').textContent;
		expect(pYears).toBe('--');

		const pMonths = screen.getByTestId('p-months').textContent;
		expect(pMonths).toBe('--');

		const pDays = screen.getByTestId('p-days').textContent;
		expect(pDays).toBe('--');

		//fill inputs
		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: '12' },
		});
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: '2' },
		});
		fireEvent.change(screen.getByTestId('input-year'), {
			target: { value: '1998' },
		});

		//submit
		fireEvent.click(screen.getByTestId('button-submit'));

		//changed values
		const cpYears = screen.getByTestId('p-years').textContent;
		expect(cpYears).not.toBe('--');

		const cpMonths = screen.getByTestId('p-months').textContent;
		expect(cpMonths).not.toBe('--');

		const cpDays = screen.getByTestId('p-days').textContent;
		expect(cpDays).not.toBe('--');
	});

	test('Error must be displayed when submit a empty input', () => {
		render(<App />);

		fireEvent.click(screen.getByTestId('button-submit'));
		expect(screen.getAllByText('This field is required').length).toBe(3);
	});

	test('For Days, must accept only values between 1-31', () => {
		render(<App />);

		// input: 0
		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: 0 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('error-day').textContent).toBe(
			errorMessages.notValidDate
		);

		// input: 32
		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: 32 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('error-day').textContent).toBe(
			errorMessages.notValidDate
		);

		// input: 1 (No error)
		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: 1 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.queryByTestId('error-day')).toBeNull();

		// input: 31 (No error)
		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: 31 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.queryByTestId('error-day')).toBeNull();
	});

	test('For Months, must accept only values between 1-12', () => {
		render(<App />);

		// input: 0
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: 0 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('error-month').textContent).toBe(
			errorMessages.notValidMonth
		);

		// input: 13
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: 13 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('error-month').textContent).toBe(
			errorMessages.notValidMonth
		);

		// input: 1 (No error)
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: 1 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.queryByTestId('error-month')).toBeNull();

		// input: 12 (No error)
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: 12 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.queryByTestId('error-month')).toBeNull();
	});

	test('For years, must accept only values less than or equal to current year', () => {
		const date = new Date();
		const year = date.getFullYear();

		render(<App />);
		// input: current year -1 (No error)
		fireEvent.change(screen.getByTestId('input-year'), {
			target: { value: year - 1 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));
		expect(screen.queryByTestId('error-year')).toBeNull();

		// input: current year (No error)
		fireEvent.change(screen.getByTestId('input-year'), {
			target: { value: year },
		});
		fireEvent.click(screen.getByTestId('button-submit'));
		expect(screen.queryByTestId('error-year')).toBeNull();

		// input: current year + 1
		fireEvent.change(screen.getByTestId('input-year'), {
			target: { value: year + 1 },
		});
		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('error-year').textContent).toBe(
			errorMessages.notValidYear
		);
	});

	test('Must accept only valid dates (31-Abr -> X)', () => {
		render(<App />);

		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: 31 },
		});
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: 4 },
		});
		fireEvent.change(screen.getByTestId('input-year'), {
			target: { value: 2000 },
		});

		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('error-day')).toBeTruthy();
	});

	test('Must not accept furure dates', () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate() + 4;

		render(<App />);

		fireEvent.change(screen.getByTestId('input-day'), {
			target: { value: day },
		});
		fireEvent.change(screen.getByTestId('input-month'), {
			target: { value: month },
		});
		fireEvent.change(screen.getByTestId('input-year'), {
			target: { value: year },
		});

		fireEvent.click(screen.getByTestId('button-submit'));

		expect(screen.getByTestId('p-days').textContent).toBe('--');
		expect(screen.getByTestId('p-months').textContent).toBe('--');
		expect(screen.getByTestId('p-years').textContent).toBe('--');
	});
});
