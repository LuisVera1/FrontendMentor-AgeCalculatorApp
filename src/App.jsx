import { useEffect, useRef, useState } from 'react'
import './App.css'
import { validateForm } from './helpers/validateForm';
import { calculateDate } from './helpers/calculateDate';

//TODO valiate date fewer than today p.e. 29Feb2024, return negative values
//TODO number increment when inputs change before calculate
//TODO global error doesnt disapear

const initialState = {
  day: {
    value: '',
    error: false,
    msg: ''
  },
  month: {
    value: '',
    error: false,
    msg: ''
  },
  year: {
    value: '',
    error: false,
    msg: ''
  },
  difference: null,
}

const initialResults = {
  years: '--',
  yearsI: 0,
  months: '--',
  monthsI: 0,
  days: '--',
  daysI: 0,
}

function App() {
  const [state, setState] = useState(initialState);
  const [results, setResults] = useState(initialResults);
  const difference = useRef(null);

  //Calculate difference
  useEffect(() => {
    if (state.difference) {
      const results = calculateDate(state.difference);
      setResults(results);
    }
  }, [state])

  //contols increments
  useEffect(() => {
    setTimeout(() => {
      let resultsIncrement = { ...results }
      let difValues = 0;

      //days
      if (results.days < results.daysI) {
        resultsIncrement.days = resultsIncrement.days + 1;
        difValues++
      }

      //months
      if (results.months < results.monthsI) {
        resultsIncrement.months = resultsIncrement.months + 1;
        difValues++
      }

      //years
      if (results.years < results.yearsI) {
        resultsIncrement.years = resultsIncrement.years + 1;
        difValues++
      }

      if (difValues > 0) setResults(resultsIncrement)
    }, 50)
  }, [results])

  const onInput = (event) => {
    const { value, name } = event.target;
    const { error, message } = validateForm({ value, name });
    const newState = { ...state, [name]: { value: value, error: error, msg: message } };
    setState(newState);
  }

  const handleSubmit = () => {
    const { day, month, year } = state;
    let newState = { ...state }
    // debugger;

    // when a field has an error
    if (state.day.error || state.month.error || state.year.error) return;

    // check empty fields
    let emptyFields = false;
    const fields = ['day', 'month', 'year']
    fields.forEach(field => {
      if (newState[field].value.length === 0) {
        newState[field].error = true;
        newState[field].msg = 'This field is required'
        emptyFields = true;
      }
    })

    //check invalid date
    const inputDate = new Date(year.value, month.value - 1, day.value);
    const intputDay = inputDate.getDate();
    let validDate = true;

    if (Number(day.value) !== intputDay && !emptyFields) {
      newState.day.error = true;
      newState.day.msg = 'Must be a valid date';

      newState.month.error = true;
      newState.month.msg = '';

      newState.year.error = true;
      newState.year.msg = '';

      validDate = false;
    }

    //calculate difference
    if (validDate && !emptyFields) {
      const now = new Date();
      const differenceInDays = Math.floor((now - inputDate) / (1000 * 60 * 60 * 24));
      // newState.difference = differenceInDays;
      difference.current = differenceInDays;

    }

    setState(newState)
  }

  return (
    <>
      <main>

        <section className="card">

          {/* form */}
          <form className="form" onSubmit={handleSubmit}>
            <div className='form__section'>
              <label
                className={state.day.error ? 'form__label--error' : 'form__label'}
                htmlFor="day">
                DAY
              </label>

              <input
                className={state.day.error ? 'form__input form__input--error' : 'form__input'}
                name="day"
                type="number"
                placeholder="DD"
                value={state.day.value}
                onChange={onInput}
              />
              {state.day.error && <p className='form__input--error-msg'>{state.day.msg}</p>}
            </div>

            <div className='form__section'>
              <label
                className={state.month.error ? 'form__label--error' : 'form__label'}
                htmlFor="month">
                MONTH
              </label>
              <input
                className={state.month.error ? 'form__input form__input--error' : 'form__input'}
                name="month"
                type="number"
                placeholder="MM"
                value={state.month.value}
                onChange={onInput}
              />
              {state.month.error && <p className='form__input--error-msg'>{state.month.msg}</p>}
            </div>

            <div className='form__section'>
              <label
                className={state.year.error ? 'form__label--error' : 'form__label'}
                htmlFor="year">
                YEAR
              </label>
              <input
                className={state.year.error ? 'form__input form__input--error' : 'form__input'}
                name="year"
                type="number"
                placeholder="YYYY"
                value={state.year.value}
                onChange={onInput}
              />
              {state.year.error && <p className='form__input--error-msg'>{state.year.msg}</p>}
            </div>
          </form>

          {/* button */}
          <div className="division">
            <button className='division__button'
              onClick={handleSubmit}>
              <img className='division-icon' src="/icon-arrow.svg" alt="calculate" />
            </button>
          </div>

          {/* results */}
          <div>

            <div className="results-section">
              <p className='results-section__result'>{results.years}</p>
              <p className='results-section__label'>years</p>
            </div>

            <div className="results-section">
              <p className='results-section__result'>{results.months}</p>
              <p className='results-section__label'>months</p>
            </div>

            <div className="results-section">
              <p className='results-section__result'>{results.days}</p>
              <p className='results-section__label'>days</p>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default App
