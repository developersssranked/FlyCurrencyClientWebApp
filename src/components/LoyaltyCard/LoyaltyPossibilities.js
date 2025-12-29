import '../../css/MainPage/loyalty_program_card.css'

import betterRateIcon from '../../img/main_page_loyalty_program_card/better_rate.png'
import priorityServiceIcon from '../../img/main_page_loyalty_program_card/priority_service.png'
import fastTransactionsIcon from '../../img/main_page_loyalty_program_card/fast_transactions.png'
import bonusIcon from '../../img/main_page_loyalty_program_card/bonus.png'

import handImage from '../../img/main_page_loyalty_program_card/hand.png'

function LoyaltyPossibilities({isFlipped}) {
    return <div className="loyalty__face">
        <div className='loyalty-program-card-title'>Возможности с Rate.pro</div>
        {!isFlipped && 
            <div className='loyalty-program-card-hand-image-container'>
                <img className='loyalty-program-card-hand-image' src={handImage} alt='hand'/>
            </div>
        }
        <div className='loyalty-program-card-text-section'>
            <div className='loyalty-program-card-text-row'>
                <div className='loyalty-program-card-text-row-image-container'>
                    <img className='loyalty-program-card-text-row-image' src={betterRateIcon} alt='better-rate'/>
                </div>
                <div className='loyalty-program-card-text'>Улучшенный курс</div>
            </div>
            <div className='loyalty-program-card-text-row'>
                <div className='loyalty-program-card-text-row-image-container'>
                    <img className='loyalty-program-card-text-row-image' src={priorityServiceIcon} alt='priority-service'/>
                </div>
                <div className='loyalty-program-card-text'>Приоритетное обслуживание</div>
            </div>
            <div className='loyalty-program-card-text-row'>
                <div className='loyalty-program-card-text-row-image-container'>
                    <img className='loyalty-program-card-text-row-image' src={fastTransactionsIcon} alt='fast-transactions'/>
                </div>
                <div className='loyalty-program-card-text'>Быстрые сделки</div>
            </div>
            <div className='loyalty-program-card-text-row'>
                <div className='loyalty-program-card-text-row-image-container'>
                    <img className='loyalty-program-card-text-row-image' src={bonusIcon} alt='bonus'/>
                </div>
                <div className='loyalty-program-card-text'>Бонус за приглашенных друзей</div>
            </div>
        </div>
    </div>
};

export default LoyaltyPossibilities;