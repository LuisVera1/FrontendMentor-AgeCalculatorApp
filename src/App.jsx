import './App.css'

function App() {

  return (
    <>
      <main>

        <section className="card">

          {/* form */}
          <form className="form" action="">
            <div className='form__section'>
              <label className='form__label--error' htmlFor="day">DAY</label>
              <input className='form__input form__input--error' id="day" type="number" placeholder="DD" />
              <p className='form__input--error-msg'>Must be a valid day</p>
            </div>

            <div className='form__section'>
              <label className='form__label' htmlFor="month">MONTH</label>
              <input className='form__input' id="month" type="number" placeholder="MM" />
              <p className='form__input--error-msg'>Must be a valid month</p>
            </div>

            <div className='form__section'>
              <label className='form__label' htmlFor="year">YEAR</label>
              <input className='form__input' id="year" type="number" placeholder="YYYY" />
              <p className='form__input--error-msg'>Must be in the past</p>
            </div>
          </form>

          {/* button */}
          <div className="division">
            <button className='division__button'><img className='division-icon' src="/icon-arrow.svg" alt="calculate" /></button>
          </div>

          {/* results */}
          <div>

            <div className="results-section">
              <p className='results-section__result'>99</p>
              <p className='results-section__label'>years</p>
            </div>

            <div className="results-section">
              <p className='results-section__result'>--</p>
              <p className='results-section__label'>months</p>
            </div>

            <div className="results-section">
              <p className='results-section__result'>--</p>
              <p className='results-section__label'>days</p>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default App
