import handImage from '../../img/main_page_loyalty_program_card/hand.png'

function LoyaltyLevels() {
    return <div className="loyalty__face">
            <div className='loyalty-program-card-hand-image-container'>
                <img className='loyalty-program-card-hand-image' src={handImage} alt='hand'/>
            </div>
            <div className='loyalty-program-card-title'>Уровни лояльности:</div>
            <div className="loyalty-program-card-levels-section">
                <div className="loyalty-program-card-levels-row">
                    <div className="loyalty-program-card-level-title">STARTER</div>
                    <div className="loyalty-program-card-level-percent">0,2%</div>
                    <div className="loyalty-program-card-level-sum">от $100</div>
                </div>
                <div className="loyalty-program-card-levels-row">
                    <div className="loyalty-program-card-level-title">ACTIVE</div>
                    <div className="loyalty-program-card-level-percent">0,5%</div>
                    <div className="loyalty-program-card-level-sum">от $6000</div>
                </div>
                <div className="loyalty-program-card-levels-row">
                    <div className="loyalty-program-card-level-title">VIP</div>
                    <div className="loyalty-program-card-level-percent">0,75%</div>
                    <div className="loyalty-program-card-level-sum">от $15000</div>
                </div>
            </div>
        </div>
};

export default LoyaltyLevels;