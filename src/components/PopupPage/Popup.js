import '../../css/PopupPage/popup.css'

function Popup() {
    return <div className="popup">
            <div className="popup-title">Перед началом</div>
            <div className="popup-text">Чтобы мини-апп работал корректно, нужно сначала запустить бота.</div>
            <div className="popup-button">
                <div className="popup-button-text">Запустить бота</div>
            </div>
            <div className="popup-additional-info">Это нужно только один раз</div>
        </div>
};

export default Popup;