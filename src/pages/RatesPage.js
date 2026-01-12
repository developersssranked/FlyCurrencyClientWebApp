import Header from "../components/Header";
import Footer from "../components/Footer";

import CourcesContainer from "../components/MainPage/CourcesContainer";
import ExchangeSection from "../components/MainPage/ExchangeSection";
import ToggleSwitchRates from "../components/RatesPage/RatesToggleSwitch";
import Calculator from "../components/RatesPage/Calculator";
import CalculatorActive from "../components/RatesPage/CalculatorActive";
import Breakline from "../components/Breakline";

import { useEffect, useState, Fragment } from "react";
import { useSearchParams } from "react-router-dom";

function RatesPage({user, rates}) {
    const [searchParams] = useSearchParams();
    const [activeOption, setActiveOption] = useState(searchParams.get('page') || 'Курс');

    useEffect(() => {
        const page = searchParams.get('page')
        if (page){
            setActiveOption(page)
        }
    }, [searchParams])

    const [fiatSum, setFiatSum] = useState('');
    const [resultSum, setResultSum] = useState('');
    const [finalPercent, setFinalPercent] = useState(null);
    const [finalRate, setFinalRate] = useState(null);
    const [isInputActive, setInputActive] = useState(false);

    const [activeUpperCurrency, setActiveUpperCurrency] = useState(searchParams.get('from_currency') ||'RUB');
    const [activeDownCurrency, setActiveDownCurrency] = useState(searchParams.get('to_currency') || 'THB');

    useEffect(() => {
        const from = searchParams.get('from_currency') || 'RUB';
        const to = searchParams.get('to_currency') || 'THB';

        setActiveUpperCurrency(prev => prev !== from ? from : prev);
        setActiveDownCurrency(prev => prev !== to ? to : prev);
    }, [searchParams]);

    return <div className="rates-page">
        {(!isInputActive && ['android', 'ios'].includes(window.Telegram.WebApp.platform)) && <Header/>}
        {(!isInputActive && ['android', 'ios'].includes(window.Telegram.WebApp.platform)) && 
        <ToggleSwitchRates activeOption={activeOption} setActiveOption={setActiveOption}/>}
        {activeOption === 'Курс' ? 
            <CourcesContainer rates={rates} setPageActiveOption={setActiveOption}/> : 
            <Fragment>
                <Calculator rates={rates} user={user} fiatSum={fiatSum} 
                setFiatSum={setFiatSum} resultSum={resultSum} setResultSum={setResultSum} 
                finalPercent={finalPercent} setFinalPercent={setFinalPercent}
                finalRate={finalRate} setFinalRate={setFinalRate} isInputActive={isInputActive}
                activeUpperCurrency={activeUpperCurrency} setActiveUpperCurrency={setActiveUpperCurrency}
                activeDownCurrency={activeDownCurrency} setActiveDownCurrency={setActiveDownCurrency} setInputActive={setInputActive}/>
                <CalculatorActive rates={rates} user={user} fiatSum={fiatSum} 
                setFiatSum={setFiatSum} resultSum={resultSum} setResultSum={setResultSum} 
                finalPercent={finalPercent} setFinalPercent={setFinalPercent}
                finalRate={finalRate} setFinalRate={setFinalRate} isInputActive={isInputActive}
                activeUpperCurrency={activeUpperCurrency} setActiveUpperCurrency={setActiveUpperCurrency}
                activeDownCurrency={activeDownCurrency} setActiveDownCurrency={setActiveDownCurrency} setInputActive={setInputActive}/>
            </Fragment>
        }
        {(!isInputActive && ['android', 'ios'].includes(window.Telegram.WebApp.platform)) && 
            <ExchangeSection isFixRate={activeOption === 'calc' ? true : false} dialogId={user?.dialog_id} fiatSum={fiatSum} resultSum={resultSum} finalPercent={finalPercent} finalRate={finalRate} activeUpperCurrency={activeUpperCurrency} activeDownCurrency={activeDownCurrency} rates={rates} user={user}/>
        }
        {(!isInputActive && ['android', 'ios'].includes(window.Telegram.WebApp.platform)) && 
            <Fragment>
                <Breakline/>
                <Footer/>
            </Fragment>
        }
    </div>
};

export default RatesPage;