import '../../css/MainPage/loyalty_program_card.css'

import LoyaltyPossibilities from './LoyaltyPossibilities';
import LoyaltyLevels from './LoyaltyLevels';
import LoyaltyProgressBar from './LoyaltyProgressBar';
import { useState, Fragment } from 'react';

function LoaltyProgramCard({user}) {
    const [isFlipped, setIsFlipped] = useState(false);
    
    return <div
            className={`loyalty-program-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className="loyalty-program-card-inner">
                {user && user.loyalty > 0 ? (
                    <Fragment>
                        <LoyaltyProgressBar user={user} isFlipped={isFlipped}/>
                        <LoyaltyLevels user={user}/>
                    </Fragment>
                ) : (
                    <Fragment>
                        <LoyaltyPossibilities isFlipped={isFlipped}/>
                        <LoyaltyLevels/>
                    </Fragment>
                )}
            </div>
    </div>
};

export default LoaltyProgramCard;