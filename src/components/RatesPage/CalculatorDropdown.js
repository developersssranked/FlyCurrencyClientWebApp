import '../../css/RatesPage/calculator_dropdown.css'

function CalculatorDropdown({ref, options, activeCurrency, setActiveCurrency}) {

    return <div className="calculator-dropdown-area" ref={ref}>
        {options.map((option, index) => (
            <div className={activeCurrency === option.title ? "calculator-dropdown-row active" : "calculator-dropdown-row"}  key={index} 
            onClick={() => setActiveCurrency(option.title)}>
                <div className="calculator-dropdown-row-image-container">
                    <img className="calculator-dropdown-row-image" src={option.image} alt='error'/>
                </div>
                <div className='calculator-dropdown-row-currency-title'>{option.title}</div>
            </div>
        ))}
    </div>
};

export default CalculatorDropdown;