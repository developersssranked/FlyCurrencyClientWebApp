import logo from '../img/logo.png'

import '../css/header.css'

function Header() {
    return <div className="header">
        <div className="logo-container">
            <img className="logo" src={logo} alt="logo"/>
        </div>
    </div>
};

export default Header;