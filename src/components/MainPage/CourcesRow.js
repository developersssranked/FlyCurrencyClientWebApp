import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/MainPage/cources_row.css'

import subImage from '../../img/main_page_cources/subimage.png'


function CourcesRow({image, alt, title, courceBuy, courceSell, activeOption, setPageActiveOption}){
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const handleRowClick = () => {
        if (title !== 'KZT' && title !== 'UAH') {
            const urlToNavigate = `/rates?page=calc&from_currency=${title}&to_currency=${activeOption}`
            const pathWithQuery = pathname + search;
            if ((pathWithQuery === urlToNavigate) && setPageActiveOption){
                setPageActiveOption('calc')
            }
            else {
                navigate(urlToNavigate)
            }
        }
    }

    return <div className='main-page-cources-row'>
                <div className='main-page-cources-currency-container'>
                    <div className='main-page-cources-currency-image-container'>
                        <img className='main-page-cources-currency-image' src={image} alt={alt}/>
                    </div>
                    <div className='main-page-cources-currency-title'>{title}</div>
                </div>
                <div className='main-page-cources-subimage-container' onClick={handleRowClick}>
                    <img className='main-page-cources-subimage' src={subImage} alt='subimage'/>
                </div>
                <div className='main-page-cources-subcolumns-container' style={{justifyContent: courceBuy && courceSell ? 'space-between': courceBuy ? 'left': 'right'}}>
                    <div className='main-cources-subcolumn'>{courceBuy}</div>
                    <div className='main-cources-subcolumn'>{courceSell}</div>
                </div>
            </div>
};

export default CourcesRow;