import arrowImage from '../../img/button_arrow.png'

import '../../css/MainPage/exchange_section.css'
import { useNavigate } from 'react-router-dom';
import { createLead } from '../../heplers/ApiUtils';

import { useCallback } from 'react'

function ExchangeSection({isFixRate, dialogId, fiatSum, resultSum, finalPercent, finalRate, activeUpperCurrency, activeDownCurrency, rates, user}) {

    const navigate = useNavigate();

    const getMinAmount = useCallback((from, to) => {
        if (from === 'USDT' && to === 'USD') {
            return 1000;
        }
        const defaults = {
            RUB: 10000,
            USDT: 100,
            THB: 3000,
            VND: 2715000,
            USD: 100,
            EUR: 100,
            UAH: 4245,
            KZT: 51284
        };
        return defaults[from] ?? 1;
        }, []);

    const handleButtonClick = () => {
        createLead(dialogId)
        navigate('/success-order')
    };

    const handleButtonCheckClick = () => {
        if (fiatSum && resultSum && finalPercent && finalRate && activeUpperCurrency && activeDownCurrency && rates && (fiatSum >= getMinAmount(activeUpperCurrency, activeDownCurrency)))
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