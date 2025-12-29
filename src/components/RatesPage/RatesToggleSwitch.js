import '../../css/RatesPage/toggle_switch_rates.css'

const ToggleSwitchRates = ({activeOption, setActiveOption}) => {
  const handleToggle = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="toggle-rates-container">
      <button
        className={`toggle-rates-button ${activeOption === 'Курс' ? 'active' : ''}`}
        onClick={() => handleToggle('Курс')}
      >
        Курс
      </button>
      <button
        className={`toggle-rates-button ${activeOption === 'calc' ? 'active' : ''}`}
        onClick={() => handleToggle('calc')}
      >
        Калькулятор
      </button>
    </div>
  );
};

export default ToggleSwitchRates;