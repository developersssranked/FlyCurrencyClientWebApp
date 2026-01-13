import CourcesTable from './CourcesTable';
import ToggleSwitch from './ToggleSwitch';

import '../../css/MainPage/cources_container.css'

import { useState } from 'react';
import { getUTCPlus7DateFormatted } from '../../heplers/Utils';
import openRatesImage from '../../img/open_rates.png'
import { useLocation, useNavigate } from 'react-router-dom';


function CourcesContainer({rates, setPageActiveOption}) {
    const [activeOption, setActiveOption] = useState('THB');
    const navigate = useNavigate();
    const { pathname, search} = useLocation();

    return <div className="main-page-cources-container">
        <div className='main-page-cources-container-actual-text'>Актуально<br/>на {getUTCPlus7DateFormatted()}</div>
        {pathname !== '/rates' && 
            <div className='open-rates-image-container' onClick={() => navigate('/rates')}>
                <img className='open-rates-image' src={openRatesImage} alt='open-rates'/>
            </div>
        }
        <ToggleSwitch activeOption={activeOption} setActiveOption={setActiveOption} setPageActiveOption={setPageActiveOption}/>
        <CourcesTable rates={rates} activeOption={activeOption} setPageActiveOption={setPageActiveOption}/>
    </div>
};

export default CourcesContainer;