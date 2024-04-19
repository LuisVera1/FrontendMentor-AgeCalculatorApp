import { useEffect, useState } from 'react'
import { calculateDate, getDataCounter, validateForm } from './helpers';
import './App.css'

const animationTemp = 70;
const steps = {
  start: 'start',
  calc: 'Cal',
  counter: 'counter',
}

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
  globalError: false,
  step: steps.start,
}

const initialResults = {
  years: '--',
  yearsI: '--',
  months: '--',
  monthsI: '--',
  days: '--',
  daysI: '--',
}

function App() {
  const [state, setState] = useState(initialState);
  const [results, setResults] = useState(initialResults);

  //Calculate differente
  useEffect(() => {
    if (state.step == steps.calc) {
      const { year, month, day } = state;
      const today = new Date();
      const sDate = new Date(year.value, month.value - 1, day.value);

      const result = calculateDate(sDate, today);
      if (result == null) {
        setState({ ...state, step: steps.start })
      } else {
        const valuesForCounter = getDataCounter(result)

        setState({ ...state, step: steps.counter })
        setResults(valuesForCounter)
      }
    }
  }, [state.step])

  //contols increments
  useEffect(() => {

    if (state.step == steps.counter) {
      setTimeout(() => {
        let resultsIncrement = { ...results }
        let difValues = 0;

        //days
        if (results.days > results.daysI) {
          resultsIncrement.daysI = resultsIncrement.daysI + 1;
          difValues++
        }

        //months
        if (results.months > results.monthsI) {
          resultsIncrement.monthsI = resultsIncrement.monthsI + 1;
          difValues++
        }

        //years
        if (results.years > results.yearsI) {
          resultsIncrement.yearsI = resultsIncrement.yearsI + 1;
          difValues++
        }

        if (difValues > 0) {
          setResults(resultsIncrement)
        } else {
          setState({ ...state, step: steps.start })
        }
      }, animationTemp)
    }
  }, [state.counter, results])

  const onInput = (event) => {
    const { value, name } = event.target;
    const { error, message } = validateForm({ value, name });

    const newState = {
      ...state,
      globalError: false,
      [name]: {
        value: value,
        error: error,
        msg: message
      }
    };
    setState(newState);
  }

  const handleSubmit = () => {
    if (state.step != steps.start) return;
    const { day, month, year } = state;

    let newState = { ...state }

    // when a field has an error
    if (state.day.error || state.month.error || state.year.error || state.globalError) return;

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

    //check invalid date (select more days per month)
    const inputDate = new Date(year.value, month.value - 1, day.value);

    //Check if the day did not move to the next month
    const intputDay = inputDate.getDate();
    let validDate = true;

    if (Number(day.value) !== intputDay && emptyFields == false) {
      newState.day.msg = 'Must be a valid date';
      newState.globalError = true;
      validDate = false;
    }

    //validate year less than 100
    const currentYear = new Date().getFullYear()
    if (year.value < 100 && year.value != '') {
      alert(`Only years between 100 - ${currentYear}`)
      return;
    }

    //calculate difference
    if (validDate == true && emptyFields == false) {
      newState.step = steps.calc;
    }

    setState(newState)
  }

  return (
    <>
      <main>

        <section className="card">

          {/* form */}
          <form className="form">
            {/* input-day */}
            <div className='form__section'>
              <label
                className={state.day.error || state.globalError ? 'form__label--error' : 'form__label'}
                htmlFor="day">
                DAY
              </label>
              <input
                className={state.day.error || state.globalError ? 'form__input form__input--error' : 'form__input'}
                data-testid="input-day"
                // inputProps={{ "data-testid": "input-day" }}
                name="day"
                type="number"
                placeholder="DD"
                value={state.day.value}
                onChange={onInput}
              />
              {(state.day.error || state.globalError) && <p data-testid="error-day" className='form__input--error-msg'>{state.day.msg}</p>}
            </div>

            {/* input-month */}
            <div className='form__section'>
              <label
                className={state.month.error || state.globalError ? 'form__label--error' : 'form__label'}
                htmlFor="month">
                MONTH
              </label>
              <input
                data-testid="input-month"
                className={state.month.error || state.globalError ? 'form__input form__input--error' : 'form__input'}
                name="month"
                type="number"
                placeholder="MM"
                value={state.month.value}
                onChange={onInput}
              />
              {state.month.error && <p data-testid="error-month" className='form__input--error-msg'>{state.month.msg}</p>}
            </div>

            {/* input-year */}
            <div className='form__section'>
              <label
                className={state.year.error || state.globalError ? 'form__label--error' : 'form__label'}
                htmlFor="year">
                YEAR
              </label>
              <input
                data-testid="input-year"
                className={state.year.error || state.globalError ? 'form__input form__input--error' : 'form__input'}
                name="year"
                type="number"
                placeholder="YYYY"
                value={state.year.value}
                onChange={onInput}
              />
              {state.year.error && <p data-testid="error-year" className='form__input--error-msg'>{state.year.msg}</p>}
            </div>
          </form>

          {/* button */}
          <div className="division">
            <button className='division__button'
              data-testid="button-submit"
              onClick={handleSubmit}>
              <img className='division-icon' height="46px" width="46px" src="/icon-arrow.svg" alt="calculate" />
            </button>
          </div>

          {/* results */}
          <div className='results'>

            <div className="results-section">
              <p data-testid="p-years" className='results-section__result'>{results.yearsI}</p>
              <p className='results-section__label'>years</p>
            </div>

            <div className="results-section">
              <p data-testid="p-months" className='results-section__result'>{results.monthsI}</p>
              <p className='results-section__label'>months</p>
            </div>

            <div className="results-section">
              <p data-testid="p-days" className='results-section__result'>{results.daysI}</p>
              <p className='results-section__label'>days</p>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default App
