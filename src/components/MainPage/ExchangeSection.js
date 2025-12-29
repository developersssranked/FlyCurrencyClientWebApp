import arrowImage from '../../img/button_arrow.png'

import '../../css/MainPage/exchange_section.css'
import { useNavigate } from 'react-router-dom';
import { createLead } from '../../heplers/ApiUtils';

function ExchangeSection({isFixRate, dialogId, fiatSum, resultSum, finalPercent, finalRate, activeUpperCurrency, activeDownCurrency, rates, user}) {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        createLead(dialogId)
        navigate('/success-order')
    };

    const handleButtonCheckClick = () => {
        if (fiatSum && resultSum && finalPercent && finalRate && activeUpperCurrency && activeDownCurrency && rates)
        {
            createLead(dialogId, activeUpperCurrency, activeDownCurrency, rates[`${activeUpperCurrency.toLowerCase()}_${activeDownCurrency.toLowerCase()}`], finalRate, fiatSum, resultSum, user.loyalty, finalPercent)
            navigate('/success-order')
        }
    }

    return <div className="exchange-section">
        <div className="exchange-section-title">{isFixRate ? 'Хотите зафиксировать курс?' : 'Готовы оформить обмен?'}</div>
        <div className="exchange-section-button" onClick={isFixRate ? handleButtonCheckClick : handleButtonClick}>
            <div className="exchange-section-button-image-container">
                <img className="exchange-section-button-image" alt='arrow' src={arrowImage}/>
            </div>
            <div className='exchange-section-button-text'>{isFixRate ? 'Обменять валюту': 'Оставить заявку'}</div>
        </div>
    </div>
};

export default ExchangeSection;