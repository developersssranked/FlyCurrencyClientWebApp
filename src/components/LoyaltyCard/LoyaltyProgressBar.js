import ProgressBar from "@ramonak/react-progress-bar";
import handImage from '../../img/main_page_loyalty_program_card/hand.png'

import '../../css/MainPage/loyalty_progress_bar.css'
import React from "react";

function LoyaltyProgressBar({user}) {

    const textEnum = {
        1: 'STARTER 0,2% от суммы',
        2: 'ACTIVE 0,5% от суммы',
        3: 'VIP 0,75% от суммы'
    }

    const sumEnum = {
        1: 100,
        2: 6000,
        3: 15000,
    }

    const calcCompleted = () => {
        return user.orders_sum / sumEnum[user.loyalty + 1] * 100 
    };

    const calcSumLeft = () => {
        return sumEnum[user.loyalty + 1] - user.orders_sum
    }


    return <div className="loyalty__face">
        <div className='loyalty-program-card-hand-image-container'>
            <img className='loyalty-program-card-hand-image' src={handImage} alt='hand'/>
        </div>
        <div className="loyalty-progress-bar-text-section">
            <div className="loyalty-progress-bar-title">Rate.Pro</div>
            <div className="loyalty-progress-bar-text">{textEnum[user.loyalty]}</div>
            <div className="loyalty-progress-bar-area" style={{ '--progress-width': `${calcCompleted()}%` }}>
                <ProgressBar customLabel={""} completed={calcCompleted()} isLabelVisible={false} completedClassName="loyalty-progress-bar-completed" barContainerClassName="loyalty-progress-bar-container"/>
            </div>
            <div className="loyalty-progress-bar-progress-text-container" style={{justifyContent: user.loyalty === 3 ? 'center': 'space-between'}}>
                <div className="loyalty-progress-bar-subitem-container">
                    <div className="loyalty-progress-bar-subitem-text">Ваши сделки:</div>
                    <div className="loyalty-progress-bar-subitem-value">${user.orders_sum}</div>
                </div>
                {user.loyalty !== 3  && (
                    <div className="loyalty-progress-bar-subitem-container">
                        <div className="loyalty-progress-bar-subitem-text">Осталось:</div>
                        <div className="loyalty-progress-bar-subitem-value">${calcSumLeft()}</div>
                    </div>
                )}
            </div>
        </div>

    </div>
};

export default LoyaltyProgressBar;
