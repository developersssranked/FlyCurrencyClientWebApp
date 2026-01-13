import mainPageIcon from '../img/footer/main_page.png'
import mainPageInactiveIcon from '../img/footer/main_page_inactive.png'
import ratesIcon from '../img/footer/rates.png'
import ratesInactiveIcon from '../img/footer/rate_inactive.png'
import profileIcon from '../img/footer/profile.png'
import profileInactiveIcon from '../img/footer/profile_inactive.png'

import '../css/footer.css'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer() {
    
    const navigate = useNavigate();
    const {pathname, search} = useLocation();

    return <div className="footer">
        <div className="footer-items-container">
            <div className="footer-item" onClick={() => navigate('/')}>
                <div className="footer-item-image-container">
                    <img className="footer-item-image" alt='error' src={pathname === '/' ? mainPageIcon : mainPageInactiveIcon}/>
                </div>    
                <div className='footer-item-title' style={{color: pathname === '/' ? '#010055' : '#6F747C99'}}>Главная</div>
            </div>
            <div className="footer-item" onClick={() => navigate('/rates')}>
                <div className="footer-item-image-container">
                    <img className="footer-item-image" alt='error' src={pathname === '/rates' ? ratesIcon : ratesInactiveIcon}/>
                </div>    
                <div className='footer-item-title' style={{color: pathname === '/rates' ? '#010055' : '#6F747C99'}}>Курс</div>
            </div>
            <div className="footer-item" onClick={() => navigate('/profile')}>
                <div className="footer-item-image-container">
                    <img className="footer-item-image" alt='error' src={pathname === '/profile' ? profileIcon : profileInactiveIcon}/>
                </div>    
                <div className='footer-item-title' style={{color: pathname === '/profile' ? '#010055' : '#6F747C99'}}>Профиль</div>
            </div>
        </div>
    </div>
};

export default Footer;