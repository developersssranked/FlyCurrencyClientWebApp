import '../../css/SuccessOrder/success_order.css'

import successOrderImage from '../../img/success_order/success_order.png'

function SuccessOrderContainer(){
    return <div className="success-order-container">
        <div className="success-order-text-t">Ваша заявка принята!<br/>Менеджер подключится в течение 5 минут.</div>
        <div className="success-order-image-container">
            <img className="success-order-image" src={successOrderImage} alt="success-order"/>
        </div>
        <div className="success-order-button">
            <div className="success-order-button-text">Перейти в чат с менеджером</div>
        </div>
    </div>
};

export default SuccessOrderContainer;