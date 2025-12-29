import Header from "../components/Header";
import Footer from "../components/Footer";
import CourcesContainer from "../components/MainPage/CourcesContainer";
import LoaltyProgramCard from "../components/LoyaltyCard/LoyaltyProgramCard";
import ExchangeSection from "../components/MainPage/ExchangeSection";

import '../css/MainPage/main_page.css'

function MainPage({user, rates}) {
    return <div className="main-page">
        <Header/>
        <CourcesContainer rates={rates}/>
        <LoaltyProgramCard user={user}/>
        <ExchangeSection dialogId={user?.dialog_id}/>
        <Footer/>
    </div>
};

export default MainPage;