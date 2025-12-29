import CourcesTable from './CourcesTable';
import ToggleSwitch from './ToggleSwitch';

import '../../css/MainPage/cources_container.css'

import { useState } from 'react';
import { getUTCPlus7DateFormatted } from '../../heplers/Utils';

function CourcesContainer({rates, setPageActiveOption}) {
    const [activeOption, setActiveOption] = useState('THB');

    return <div className="main-page-cources-container">
        <div className='main-page-cources-container-actual-text'>Актуально<br/>на {getUTCPlus7DateFormatted()}</div>
        <ToggleSwitch activeOption={activeOption} setActiveOption={setActiveOption} setPageActiveOption={setPageActiveOption}/>
        <CourcesTable rates={rates} activeOption={activeOption} setPageActiveOption={setPageActiveOption}/>
    </div>
};

export default CourcesContainer;