export const fetchUser = async (tg_id) => {

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/clients/get_client_mini_app/' + tg_id);
    if (!response.ok) {
        if (response.status === 404) {
            return null
        }
    }
    const result = await response.json();
    return result
};

export const createLead = async (dialog_id, fiatCurrency = null, resultCurrency = null, baseRate = null, resultRate = null, gaveAmount = null, receivedAmount = null, userLoyalty = null, resultPercent = null) => {
    let content;
    if (fiatCurrency && resultCurrency && baseRate && resultRate && gaveAmount && receivedAmount && resultPercent){
        content = `Новая заявка из клиентского мини апп\n\n
                    Меняем: ${fiatCurrency} на ${resultCurrency}\n
                    Уровень лояльности пользователя: ${userLoyalty || 0}\n
                    Итоговый процент: ${resultPercent}\n
                    Базовый курс: ${baseRate}\n
                    Итоговый Курс: ${resultRate}\n
                    Отдает: ${gaveAmount} ${fiatCurrency}\n
                    Получает: ${receivedAmount} ${resultCurrency}`
    }
    else {
        content = 'Новая заявка из клиентского мини апп'
    }
    
    const data = {
        dialog_id: dialog_id,
        sender_type: "client",
        content: content
    }

    await fetch(process.env.REACT_APP_API_URL + '/api/v1/conversations/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export const fetchRates = async () => {

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/rates/get_client_rates');
    const result = await response.json();
    return result
};