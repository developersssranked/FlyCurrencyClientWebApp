
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';

import CalculatorDropdown from './CalculatorDropdown'
import { useOutsideClick } from '../../heplers/UseOutsideClick'

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

function Calculator({rates, user, fiatSum, setFiatSum, resultSum, setResultSum, finalPercent, setFinalPercent, finalRate, setFinalRate, activeUpperCurrency, setActiveUpperCurrency, activeDownCurrency, setActiveDownCurrency}) {
    const [searchParams] = useSearchParams();

    const upperDropdownRef = useRef(null);
    const downDropdownRef = useRef(null);
 
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
        {
            title: 'UAH',
            image: uahImage
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
        'UAH': ['THB', 'USDT'],
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
        if (activeDownCurrency !== 'KZT'){
            setActiveUpperCurrency(activeDownCurrency);
            setActiveDownCurrency(activeUpperCurrency);
        }
    }; 

    useOutsideClick(upperDropdownRef, () => {
        setUpperDropdownVisible(false);
    });

    useOutsideClick(downDropdownRef, () => {
        setDownDropdownVisible(false);
    });

    useEffect(() => {
        if (fiatSum === ''){
            setResultSum('')
            setRateRow('')
            return
        }
        const parsedFiatSum = parseFloat(fiatSum);
        if (parsedFiatSum === undefined || parsedFiatSum === '' || parsedFiatSum === NaN){
            setResultSum('')
            setRateRow('')
            return
        }
        let percentBySum;
        const currencyPair = `${activeUpperCurrency.toLowerCase()}_${activeDownCurrency.toLowerCase()}`

        if (['rub_uah', 'usdt_uah', 'usdt_usd', 'usdt_eur', 'thb_usd', 'thb_kzt', 'thb_eur', 'vnd_rub', 'vnd_thb', 'vnd_uah', 'usd_thb', 'usd_vnd', 'usd_usdt', 'eur_thb', 'eur_usdt', 'uah_thb', 'uah_usdt'].includes(currencyPair)){
            const currencyStaticPercentMapping = {
                'usdt_uah': 4,
                'usdt_usd': 2,
                'usdt_eur': 2,
                'thb_usd': 2,
                'thb_kzt': 4,
                'thb_eur': 2,
                'vnd_rub': 4,
                'vnd_thb': 4,
                'vnd_uah': 4,
                'usd_thb': 2,
                'usd_vnd': 4,
                'usd_usdt': 2,
                'eur_thb': 2,
                'eur_usdt': 2,
                'uah_thb': 4,
                'uah_usdt': 4,
                'rub_uah': 4
            }
            percentBySum = currencyStaticPercentMapping[currencyPair]
        }
        else if (currencyPair === 'rub_thb' || currencyPair === 'thb_rub'){
            const resultThbSum = currencyPair === 'rub_thb' ? parsedFiatSum / rates.rub_thb: parsedFiatSum;
            if (resultThbSum <= 5000){
                percentBySum = 6
            }
            else if (5000 < resultThbSum && resultThbSum <= 5500){
                percentBySum = 5.8
            }
            else if (5500 < resultThbSum && resultThbSum <= 6000){
                percentBySum = 5.6
            }
            else if (6000 < resultThbSum && resultThbSum <= 6500){
                percentBySum = 5.4
            }
            else if (6500 < resultThbSum && resultThbSum <= 7000){
                percentBySum = 5.2
            }
            else if (7000 < resultThbSum && resultThbSum <= 7500){
                percentBySum = 5
            }
            else if (7500 < resultThbSum && resultThbSum <= 8000){
                percentBySum = 4.8
            }
            else if (8000 < resultThbSum && resultThbSum <= 8500){
                percentBySum = 4.6
            }
            else if (8500 < resultThbSum && resultThbSum <= 9000){
                percentBySum = 4.4
            }
            else if (9000 < resultThbSum && resultThbSum <= 9500){
                percentBySum = 4.2
            }
            else if (9500 < resultThbSum && resultThbSum <= 15000){
                percentBySum = 3.8
            }
            else if (15000 < resultThbSum && resultThbSum <= 25000){
                percentBySum = 3.6
            }
            else if (25000 < resultThbSum && resultThbSum <= 35000){
                percentBySum = 3.2
            }
            else if (35000 < resultThbSum && resultThbSum <= 50000){
                percentBySum = 2.8
            }
            else if (50000 < resultThbSum && resultThbSum <= 65000){
                percentBySum = 2.6
            }
            else if (65000 < resultThbSum && resultThbSum <= 85000){
                percentBySum = 2.4
            }
            else if (85000 < resultThbSum && resultThbSum <= 95000){
                percentBySum = 2.2
            }
            else if (95000 < resultThbSum && resultThbSum <= 150000){
                percentBySum = 1.9
            }
            else if (150000 < resultThbSum && resultThbSum <= 200000){
                percentBySum = 1.8
            }
            else if (200000 < resultThbSum && resultThbSum <= 250000){
                percentBySum = 1.7
            }
            else if (250000 < resultThbSum){
                percentBySum = 1.6
            }
        }
        else if (currencyPair === 'rub_vnd'){
            const usdtSum = parsedFiatSum / rates.rub_usdt;
            if (usdtSum <= 100){
                percentBySum = 7
            }
            else if (100 < usdtSum && usdtSum <= 1000){
                percentBySum = 4
            }
            else if (1000 < usdtSum && usdtSum <= 1500){
                percentBySum = 3.5
            }
            else if (15000 < usdtSum && usdtSum <= 3000){
                percentBySum = 3
            }
            else if (3000 < usdtSum){
                percentBySum = 2.5
            }
        }
        else if (currencyPair === 'rub_usdt'){
            if (parsedFiatSum <= 10000){
                percentBySum = 3
            }
            else if (10000 < parsedFiatSum && parsedFiatSum <= 150000){
                percentBySum = 2.5
            }
            else if (150000 < parsedFiatSum){
                percentBySum = 2
            }
        }
        else if (currencyPair === 'usdt_thb') {
            const resultThbSum = parsedFiatSum * rates.usdt_thb;
            if (resultThbSum <= 5000){
                percentBySum = 5
            }
            else if (5000 < resultThbSum && resultThbSum <= 100000){
                percentBySum = 3
            }
            else if (100000 < resultThbSum){
                percentBySum = 2
            }
        }
        else if (currencyPair === 'usdt_vnd'){
            const usdtSum = parsedFiatSum;
            if (usdtSum <= 100){
                percentBySum = 7
            }
            else if (100 < usdtSum && usdtSum <= 1000){
                percentBySum = 4
            }
            else if (1000 < usdtSum && usdtSum <= 1500){
                percentBySum = 3.5
            }
            else if (15000 < usdtSum && usdtSum <= 3000){
                percentBySum = 3
            }
            else if (3000 < usdtSum){
                percentBySum = 2.5
            }
        }
        else if (currencyPair === 'usdt_rub'){
            const rubSum = parsedFiatSum * rates.usdt_rub;
            if (rubSum <= 10000){
                percentBySum = 3
            }
            else if (10000 < rubSum && rubSum <= 40000){
                percentBySum = 2.5
            }
            else if (40000 < rubSum && rubSum <= 150000){
                percentBySum = 2
            }
            else if (150000 < rubSum && rubSum <= 500000){
                percentBySum = 1.5
            }
            else if (500000 < rubSum){
                percentBySum = 1
            }
        }
        else if (currencyPair === 'thb_usdt'){
            const usdtSum = parsedFiatSum / rates.thb_usdt;
            if (usdtSum <= 100){
                percentBySum = 5
            }
            else if (100 < usdtSum && usdtSum <= 1000){
                percentBySum = 4
            }
            else if (1000 < usdtSum && usdtSum <= 2000){
                percentBySum = 3
            } 
            else if (2000 < usdtSum && usdtSum <= 4000){
                percentBySum = 2
            }
            else if (4000 < usdtSum){
                percentBySum = 1.8
            }
        }
        else if (currencyPair === 'vnd_usdt'){
            const usdtSum = parsedFiatSum / rates.vnd_usdt;
            if (usdtSum <= 100){
                percentBySum = 5
            }
            else if (100 < usdtSum && usdtSum <= 1000){
                percentBySum = 4
            }
            else if (1000 < usdtSum && usdtSum <= 2000){
                percentBySum = 3
            } 
            else if (2000 < usdtSum && usdtSum <= 4000){
                percentBySum = 2
            }
            else if (4000 < usdtSum){
                percentBySum = 1.8
            }
        }

        const userLoyaltyMapping = {
            0: 0,
            1: 0.2,
            2: 0.5,
            3: 0.75
        }

        const resultPercent = percentBySum - userLoyaltyMapping[user.loyalty]
        setFinalPercent(resultPercent)
        if (['rub_thb', 'thb_usdt', 'thb_usd', 'thb_eur', 'uah_thb', 'vnd_rub', 'vnd_usdt', 'vnd_usd', 'rub_usdt', 'rub_uah', 'usdt_eur', 'vnd_thb', 'usd_usdt', 'uah_usdt'].includes(currencyPair)){
            const resultRate = Number((rates[currencyPair] * (1 + resultPercent / 100)).toFixed(3))
            setFinalRate(resultRate);
            const finalSum = Math.round(parsedFiatSum / resultRate)
            setResultSum(finalSum);
            setRateRow(`Курс ${resultRate} ${activeUpperCurrency} = 1 ${activeDownCurrency}`)
        }
        else {
            const resultRate = Number((rates[currencyPair] * (1 - resultPercent / 100)).toFixed(3))
            setFinalRate(resultRate)
            const finalSum = Math.round(parsedFiatSum * resultRate)
            setResultSum(finalSum);
            setRateRow(`Курс 1 ${activeUpperCurrency} = ${resultRate} ${activeDownCurrency}`)
        }

        

    }, [activeUpperCurrency, activeDownCurrency, fiatSum])

    return <div className="calculator-container">
        <div className='calculator-inputs-container'>
        <div className="calculator-upper-section">
            <div className="calculator-dropdown-section" onClick={() => setUpperDropdownVisible(!isUpperDropdownVisible)}>
                <div className="calculator-dropdown-section-currency-image-container">
                    <img className="calculator-dropdown-section-currency-image" src={currencyPairsImageDict[activeUpperCurrency]} alt={activeUpperCurrency}/>
                </div>
                <div className='calculator-dropdown-section-active-currency-title'>{activeUpperCurrency}</div>
                <div className='calculator-dropdown-section-arrow-image-container'>
                    <img className='calculator-dropdown-section-arrow-image' src={arrowImage} alt='arrow'/>
                </div>
                {isUpperDropdownVisible && <CalculatorDropdown 
                                            ref={upperDropdownRef}
                                            options={upperDropdownOptions} 
                                            activeCurrency={activeUpperCurrency}
                                            setActiveCurrency={setActiveUpperCurrency}
                                            />}
            </div>
            <div className='calculator-sum-input-container'>
                <input className='calculator-sum-input' placeholder='Введите сумму' type="number" value={fiatSum} onChange={(e) => setFiatSum(e.target.value)}/>
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
            <div className="calculator-dropdown-section" onClick={() => setDownDropdownVisible(!isDownDropdownVisible)}>
                <div className="calculator-dropdown-section-currency-image-container">
                    <img className="calculator-dropdown-section-currency-image" src={currencyPairsImageDict[activeDownCurrency]} alt={activeDownCurrency}/>
                </div>
                <div className='calculator-dropdown-section-active-currency-title'>{activeDownCurrency}</div>
                <div className='calculator-dropdown-section-arrow-image-container'>
                    <img className='calculator-dropdown-section-arrow-image' src={arrowImage} alt='arrow'/>
                </div>
                {isDownDropdownVisible && <CalculatorDropdown 
                                            ref={downDropdownRef}
                                            options={downDropdownOptions}  
                                            activeCurrency={activeDownCurrency}
                                            setActiveCurrency={setActiveDownCurrency}
                                            />}
            </div>
            <div className='calculator-sum-input-container'>
                <input className='calculator-sum-input' placeholder='Сумма к получению' disabled value={resultSum}/>
                <div className='calculator-sum-input-currency-name-container'>
                    <div className='calculator-sum-input-currency-name'>{resultSum !== '' ? activeDownCurrency : ''}</div>
                </div>
            </div>
        </div>
        <div className='calculator-cource-row'>{rateRow}</div>
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