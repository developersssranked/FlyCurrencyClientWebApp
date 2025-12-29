import '../../css/ProfilePage/referal_link.css'
import copyImage from '../../img/referal_link/copy_image.png'
import successCopyImage from '../../img/referal_link/success_copy.png'

import { useState } from 'react';

function ReferalLink({user}){
    const [isCopied, setIsCopied] = useState(false);
    const referralLink = `https://t.me/rateexpert_bot?start=user${user.tg_id}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        } catch (err) {
            console.error('Не удалось скопировать ссылку:', err);
        }
    };

    return <div className="referal-link-container">
        <div className='referal-link-title'>Ваша реферальная ссылка</div>
        <div className='referal-link-link-container'>
            <div className='referal-link-text'>{referralLink}</div>
            <div className='referal-link-copy-image-container' onClick={copyToClipboard}>
                <img className='referal-link-copy-image' src={isCopied ? successCopyImage : copyImage} alt='copy-image'/>
            </div>
        </div>
        <div className='referal-link-text-container'>
            <div className='referal-link-text-subitem'>
                <div className='referal-link-text-subitem-title'>{user.referals_count}</div>
                <div className='referal-link-text-subitem-value'>Друзья</div>
            </div>
            <div className='referal-link-text-subitem'>
                <div className='referal-link-text-subitem-title'>{user.referals_orders_count}</div>
                <div className='referal-link-text-subitem-value'>Сделки</div>
            </div>
            <div className='referal-link-text-subitem'>
                <div className='referal-link-text-subitem-title'>{user.bonus}</div>
                <div className='referal-link-text-subitem-value'>Бонусы</div>
            </div>
        </div>
        <div className='referal-link-additional-text'>Делитесь ссылкой-приглашением с друьями и получайте бонусы за их сделки.</div>
    </div>
};

export default ReferalLink;