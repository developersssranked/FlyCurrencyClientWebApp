import Header from "../components/Header";
import Footer from "../components/Footer";

import CourcesContainer from "../components/MainPage/CourcesContainer";
import ExchangeSection from "../components/MainPage/ExchangeSection";
import ToggleSwitchRates from "../components/RatesPage/RatesToggleSwitch";
import Calculator from "../components/RatesPage/Calculator";
import Breakline from "../components/Breakline";

import { useEffect, useState } from "react";
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

    const [activeUpperCurrency, setActiveUpperCurrency] = useState(searchParams.get('from_currency') ||'RUB');
    const [activeDownCurrency, setActiveDownCurrency] = useState(searchParams.get('to_currency') || 'THB');

    return <div className="rates-page">
        <Header/>
        <ToggleSwitchRates activeOption={activeOption} setActiveOption={setActiveOption}/>
        {activeOption === 'Курс' ? 
            <CourcesContainer rates={rates} setPageActiveOption={setActiveOption}/> : 
            <Calculator rates={rates} user={user} fiatSum={fiatSum} 
            setFiatSum={setFiatSum} resultSum={resultSum} setResultSum={setResultSum} 
            finalPercent={finalPercent} setFinalPercent={setFinalPercent}
            finalRate={finalRate} setFinalRate={setFinalRate}
            activeUpperCurrency={activeUpperCurrency} setActiveUpperCurrency={setActiveUpperCurrency}
            activeDownCurrency={activeDownCurrency} setActiveDownCurrency={setActiveDownCurrency}/>
        }
        <ExchangeSection isFixRate={activeOption === 'calc' ? true : false} dialogId={user?.dialog_id} fiatSum={fiatSum} resultSum={resultSum} finalPercent={finalPercent} finalRate={finalRate} activeUpperCurrency={activeUpperCurrency} activeDownCurrency={activeDownCurrency} rates={rates} user={user}/>
        <Breakline/>
        <Footer/>
    </div>
};

export default RatesPage;