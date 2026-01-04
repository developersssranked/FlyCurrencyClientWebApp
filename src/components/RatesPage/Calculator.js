
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';

import CalculatorDropdown from './CalculatorDropdown'
import { useOutsideClick } from '../../heplers/UseOutsideClick'
import { getPercentBySum, calculateExchange } from '../../heplers/CalculatorUtils';

import rubImage from '../../img/main_page_cources/rub.png'
import usdtImage from '../../img/main_page_cources/usdt.png'
import thbImage from '../../img/main_page_cources/thb.png'
import vndImage from '../../img/main_page_cources/vnd.png'
import usdImage from '../../img/main_page_cources/usd.png'
import eurImage from '../../img/main_page_cources/eur.png'
import uahImage from '../../img/main_page_cources/uah.png'
import kztImage from '../../img/main_page_cources/kzt.png'

import arrowImage from '../../img/arrow.png'
import calculatorArrowImage from '../../img/calculator_arrow.png'
import additionalInfoImage from '../../img/additional_info.png'

import '../../css/RatesPage/calculator.css'

function Calculator({rates, user, fiatSum, setFiatSum, resultSum, setResultSum, finalPercent, setFinalPercent, finalRate, setFinalRate, activeUpperCurrency, setActiveUpperCurrency, activeDownCurrency, setActiveDownCurrency, setInputActive}) {

    const upperDropdownRef = useRef(null);
    const upperDropdownTriggerRef = useRef(null);

    const downDropdownRef = useRef(null);
    const downDropdownTriggerRef = useRef(null);
 
    const [rateRow, setRateRow] = useState('');

    const [isUpperDropdownVisible, setUpperDropdownVisible] = useState(false);
    const [isDownDropdownVisible, setDownDropdownVisible] = useState(false);


    const defaultDropdownOptions = [
        {
            title: 'RUB',
            image: rubImage
        },
        {
            title: 'THB',
            image: thbImage
        },
        {
            title: 'USDT',
            image: usdtImage
        },
        {
            title: 'VND',
            image: vndImage
        },
        {
            title: 'USD',
            image: usdImage
        },
        {
            title: 'EUR',
            image: eurImage
        },
    ]

    const currencyPairsImageDict = {
        'RUB': rubImage,
        'USDT': usdtImage,
        'THB': thbImage,
        'VND': vndImage,
        'USD': usdImage,
        'EUR': eurImage,
        'UAH': uahImage,
        'KZT': kztImage
    }

    const allowedCurrencyPairs = {
        'RUB': ['THB', 'VND', 'USDT', 'UAH'],
        'USDT': ['THB', 'VND', 'RUB', 'UAH', 'USD', 'EUR'],
        'THB': ['USD', 'RUB', 'KZT', 'EUR', 'USDT'],
        'VND': ['THB', 'RUB', 'USDT'],
        'USD': ['THB', 'VND', 'USDT'],
        'EUR': ['THB',],
    }

    const [upperDropdownOptions, setUpperDropdownOptions] = useState(defaultDropdownOptions);
    const [downDropdownOptions, setDownDropdownOptions] = useState(defaultDropdownOptions);

    useEffect(() => {
        function changeDownDropdownOptions(){
            const filteredOptions = defaultDropdownOptions.filter(option =>
                allowedCurrencyPairs[activeUpperCurrency].includes(option.title)
            );
            setDownDropdownOptions(filteredOptions)

            const flatCurrencyTitles = filteredOptions.map(option => option.title)
            if (!(flatCurrencyTitles.includes(activeDownCurrency))){
                setActiveDownCurrency(flatCurrencyTitles[0])
            }
        }
        changeDownDropdownOptions()
    }, [activeUpperCurrency])


    const handleArrowClick = () => {
        if (activeDownCurrency !== 'KZT' && activeDownCurrency !== 'UAH'){
            setActiveUpperCurrency(activeDownCurrency);
            setActiveDownCurrency(activeUpperCurrency);
        }
    }; 

    useOutsideClick([upperDropdownTriggerRef, upperDropdownRef], () => {
        setUpperDropdownVisible(false);
    });

    useOutsideClick([downDropdownTriggerRef, downDropdownRef], () => {
        setDownDropdownVisible(false);
    });


    const prevFiatSumRef = useRef(fiatSum);
    const prevResultSumRef = useRef(resultSum);


    const MIN_AMOUNTS = {
        RUB: 10000,
        USDT: 1000,
        THB: 3000,
        VND: 2715000,
        USD: 1000,
        EUR: 1000,
        UAH: 10000,
        KZT: 50000
        };

    useEffect(() => {
        const from = activeUpperCurrency;
        const to = activeDownCurrency;

        if (fiatSum === '' || from === to || !rates) {
            if (fiatSum === '') {
            setResultSum('');
            setRateRow('');
            setFinalRate(0);
            setFinalPercent(0);
            }
            prevFiatSumRef.current = fiatSum;
            prevResultSumRef.current = '';
            return;
        }

        if (fiatSum === prevFiatSumRef.current) {
            return;
        }

        const parsed = parseFloat(fiatSum);
        if (isNaN(parsed) || parsed <= 0) {
            setResultSum('');
            setRateRow('');
            return;
        }

        const minAmount = MIN_AMOUNTS[from] ?? 0;
        if (parsed < minAmount) {
            setResultSum('');
            setRateRow('');
            setFinalRate(0);
            setFinalPercent(0);
            return;
        }

        const calc = calculateExchange({ amount: parsed, from, to, rates, user, direction: 'from' });

        setResultSum(String(calc.convertedAmount));
        setFinalRate(calc.finalRate);
        setFinalPercent(calc.finalPercent);
        setRateRow(calc.rateDisplay);

        prevFiatSumRef.current = fiatSum;
        prevResultSumRef.current = String(calc.convertedAmount);
        }, [fiatSum, activeUpperCurrency, activeDownCurrency, rates, user.loyalty]);
    
    useEffect(() => {
        const from = activeUpperCurrency;
        const to = activeDownCurrency;

        if (resultSum === '' || from === to || !rates) {
            if (resultSum === '') {
            setFiatSum('');
            setRateRow('');
            setFinalRate(0);
            setFinalPercent(0);
            }
            prevResultSumRef.current = resultSum;
            prevFiatSumRef.current = '';
            return;
        }

        if (resultSum === prevResultSumRef.current) return;

        const parsed = parseFloat(resultSum);
        if (isNaN(parsed) || parsed <= 0) {
            setFiatSum('');
            setRateRow('');
            return;
        }

        const minAmount = MIN_AMOUNTS[to] ?? 0;
        if (parsed < minAmount) {
            setFiatSum('');
            setRateRow('');
            setFinalRate(0);
            setFinalPercent(0);
            return;
        }

        const calc = calculateExchange({ amount: parsed, from, to, rates, user, direction: 'to' });

        setFiatSum(String(calc.convertedAmount));
        setFinalRate(calc.finalRate);
        setFinalPercent(calc.finalPercent);
        setRateRow(calc.rateDisplay);

        prevFiatSumRef.current = String(calc.convertedAmount);
        prevResultSumRef.current = resultSum;
        }, [resultSum, activeUpperCurrency, activeDownCurrency, rates, user.loyalty]);

    // Пересчёт при смене валют
        useEffect(() => {
        const from = activeUpperCurrency;
        const to = activeDownCurrency;

        // Защита: нельзя конвертировать в ту же валюту или без курсов
        if (from === to || !rates) {
            setFiatSum('');
            setResultSum('');
            setRateRow('');
            setFinalRate(0);
            setFinalPercent(0);
            return;
        }

        // 1️⃣ Если есть значение в верхнем инпуте — пересчитываем вниз
        if (fiatSum !== '') {
            const parsed = parseFloat(fiatSum);
            if (!isNaN(parsed) && parsed > 0) {
            // Проверим минимум для верхней валюты
            const minAmount = MIN_AMOUNTS[from] ?? 0;
            if (parsed >= minAmount) {
                const calc = calculateExchange({ amount: parsed, from, to, rates, user, direction: 'from' });
                setResultSum(String(calc.convertedAmount));
                setFinalRate(calc.finalRate);
                setFinalPercent(calc.finalPercent);
                setRateRow(calc.rateDisplay);
            } else {
                // Сумма меньше минимума → сбрасываем нижний инпут
                setResultSum('');
                setRateRow('');
                setFinalRate(0);
                setFinalPercent(0);
            }
            } else {
            setResultSum('');
            setRateRow('');
            }
            return;
        }

        // 2️⃣ Если верхний пуст, но есть значение в нижнем — пересчитываем вверх
        if (resultSum !== '') {
            const parsed = parseFloat(resultSum);
            if (!isNaN(parsed) && parsed > 0) {
            // Проверим минимум для нижней валюты
            const minAmount = MIN_AMOUNTS[to] ?? 0;
            if (parsed >= minAmount) {
                const calc = calculateExchange({ amount: parsed, from, to, rates, user, direction: 'to' });
                setFiatSum(String(calc.convertedAmount));
                setFinalRate(calc.finalRate);
                setFinalPercent(calc.finalPercent);
                setRateRow(calc.rateDisplay);
            } else {
                // Сумма меньше минимума → сбрасываем верхний инпут
                setFiatSum('');
                setRateRow('');
                setFinalRate(0);
                setFinalPercent(0);
            }
            } else {
            setFiatSum('');
            setRateRow('');
            }
            return;
        }

        // 3️⃣ Если оба пусты — просто очищаем мета-поля
        setRateRow('');
        setFinalRate(0);
        setFinalPercent(0);
        }, [activeUpperCurrency, activeDownCurrency, rates, user.loyalty]);


    return <div className="calculator-container">
        <div className='calculator-inputs-container'>
        <div className="calculator-upper-section">
            <div className="calculator-dropdown-section" onClick={() => setUpperDropdownVisible(prev => !prev)} ref={upperDropdownTriggerRef}>
                <div className="calculator-dropdown-section-currency-image-container">
                    <img className="calculator-dropdown-section-currency-image" src={currencyPairsImageDict[activeUpperCurrency]} alt={activeUpperCurrency}/>
                </div>
                <div className='calculator-dropdown-section-active-currency-title'>{activeUpperCurrency}</div>
                <div className='calculator-dropdown-section-arrow-image-container'>
                    <img className={`calculator-dropdown-section-arrow-image ${
                    isUpperDropdownVisible ? 'rotated' : ''
                    }`} src={arrowImage} alt='arrow'/>
                </div>
                {isUpperDropdownVisible && <CalculatorDropdown 
                                            ref={upperDropdownRef}
                                            options={upperDropdownOptions} 
                                            activeCurrency={activeUpperCurrency}
                                            setActiveCurrency={setActiveUpperCurrency}
                                            />}
            </div>
            <div className='calculator-sum-input-container'>
                <input className='calculator-sum-input' placeholder='Введите сумму' type="number" value={fiatSum} onChange={(e) => setFiatSum(e.target.value)} onFocus={() => setInputActive(true)} onBlur={() => setInputActive(false)}/>
                <div className='calculator-sum-input-currency-name-container'>
                    <div className='calculator-sum-input-currency-name'>{fiatSum !== '' ? activeUpperCurrency : ''}</div>
                </div>
            </div>
        </div>
        <div className='calculator-arrow-image-container-container'>
            <div className='calculator-arrow-image-container' onClick={handleArrowClick}>
                <img className='calculator-arrow-image' src={calculatorArrowImage} alt='error'/>
            </div>
        </div>
        <div className="calculator-upper-section">
            <div className="calculator-dropdown-section" onClick={() => setDownDropdownVisible(prev => !prev)} ref={downDropdownTriggerRef}>
                <div className="calculator-dropdown-section-currency-image-container">
                    <img className="calculator-dropdown-section-currency-image" src={currencyPairsImageDict[activeDownCurrency]} alt={activeDownCurrency} />
                </div>
                <div className='calculator-dropdown-section-active-currency-title'>{activeDownCurrency}</div>
                <div className='calculator-dropdown-section-arrow-image-container'>
                    <img className={`calculator-dropdown-section-arrow-image ${
                        isDownDropdownVisible ? 'rotated' : ''
                    }`} src={arrowImage} alt='arrow'/>
                </div>
                {isDownDropdownVisible && <CalculatorDropdown 
                                            ref={downDropdownRef}
                                            options={downDropdownOptions}  
                                            activeCurrency={activeDownCurrency}
                                            setActiveCurrency={setActiveDownCurrency}
                                            />}
            </div>
            <div className='calculator-sum-input-container'>
                <input className='calculator-sum-input' placeholder='Сумма к получению' value={resultSum} style={{color: "#000000"}} onChange={(e) => setResultSum(e.target.value)} onFocus={() => setInputActive(true)} onBlur={() => setInputActive(false)}/>
                <div className='calculator-sum-input-currency-name-container'>
                    <div className='calculator-sum-input-currency-name'>{resultSum !== '' ? activeDownCurrency : ''}</div>
                </div>
            </div>
        </div>
        <div className='calculator-cource-row-container'>
            <div className='calculator-cource-row'>{rateRow}</div>
        </div>
        <div className='calculator-additional-info-container'>
            <div className='calculator-additional-info-image-container'>
                <img className='calculator-additional-info-image' alt='error' src={additionalInfoImage}/>
            </div>
            <div className='calculator-additional-info-text'>Система автоматически устанавливает курс ниже при увеличении суммы обмена</div>
        </div>
        </div>
    </div>
};

export default Calculator;