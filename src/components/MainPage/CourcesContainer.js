import CourcesTable from './CourcesTable';
import ToggleSwitch from './ToggleSwitch';

import '../../css/MainPage/cources_container.css'

import { useState } from 'react';
import { getUTCPlus7DateFormatted } from '../../heplers/Utils';
import { useLocation, useNavigate } from 'react-router-dom';
import growUpImage from '../../img/grow_up_calc.png'


function CourcesContainer({rates, setPageActiveOption}) {
    const [activeOption, setActiveOption] = useState('THB');
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    return <div className="main-page-cources-container">
        <div className='main-page-cources-container-actual-text'>Актуально<br/>на {getUTCPlus7DateFormatted()}</div>
        <ToggleSwitch activeOption={activeOption} setActiveOption={setActiveOption} setPageActiveOption={setPageActiveOption}/>
        {pathname === '/' &&
            <div className='main-page-cources-grow-up-image-container' onClick={() => navigate('/rates')}>
                <img className='main-page-cources-grow-up-image' src={growUpImage} alt='grow-up-image'/>
            </div>
        }
        <CourcesTable rates={rates} activeOption={activeOption} setPageActiveOption={setPageActiveOption}/>
    </div>
};

export default CourcesContainer;