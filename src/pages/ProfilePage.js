import Header from "../components/Header";
import Footer from "../components/Footer";
import ReferalLink from "../components/Profile/ReferalLink";
import LoaltyProgramCard from "../components/LoyaltyCard/LoyaltyProgramCard";
import ExchangeSection from "../components/MainPage/ExchangeSection";

import { Fragment } from "react/jsx-runtime";

function ProfilePage({user}){
    return <div className="profile-page">
        {user.loyalty > 0 ? (
            <Fragment>
                <Header/>
                <ReferalLink user={user}/>
                <LoaltyProgramCard user={user}/>
                <ExchangeSection dialogId={user?.dialog_id}/>
                <Footer/>
            </Fragment>
        ) : (
            <Fragment>
                <Header/>
                <LoaltyProgramCard user={user}/>
                <ExchangeSection dialogId={user?.dialog_id}/>
                <Footer/>
            </Fragment>
        )}
    </div>
};

export default ProfilePage;