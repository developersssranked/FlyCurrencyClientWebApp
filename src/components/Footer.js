import mainPageIcon from '../img/footer/main_page.png'
import ratesIcon from '../img/footer/rates.png'
import profileIcon from '../img/footer/profile.png'

import '../css/footer.css'
import { useNavigate } from 'react-router-dom'

function Footer() {
    
    const navigate = useNavigate();

    return <div className="footer">
        <div className="footer-items-container">
            <div className="footer-item" onClick={() => navigate('/')}>
                <div className="footer-item-image-container">
                    <img className="footer-item-image" alt='error' src={mainPageIcon}/>
                </div>    
                <div className='footer-item-title'>Главная</div>
            </div>
            <div className="footer-item" onClick={() => navigate('/rates')}>
                <div className="footer-item-image-container">
                    <img className="footer-item-image" alt='error' src={ratesIcon}/>
                </div>    
                <div className='footer-item-title'>Курс</div>
            </div>
            <div className="footer-item" onClick={() => navigate('/profile')}>
                <div className="footer-item-image-container">
                    <img className="footer-item-image" alt='error' src={profileIcon}/>
                </div>    
                <div className='footer-item-title'>Профиль</div>
            </div>
        </div>
    </div>
};

export default Footer;