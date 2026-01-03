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
    let data;
    if (fiatCurrency && resultCurrency && baseRate && resultRate && gaveAmount && receivedAmount && resultPercent){
        content = `Новая заявка из клиентского мини апп\n\n
                    Меняем: ${fiatCurrency} на ${resultCurrency}\n
                    Уровень лояльности пользователя: ${userLoyalty || 0}\n
                    Итоговый процент: ${resultPercent.toFixed(3)}\n
                    Базовый курс: ${baseRate}\n
                    Итоговый Курс: ${resultRate}\n
                    Отдает: ${gaveAmount} ${fiatCurrency}\n
                    Получает: ${receivedAmount} ${resultCurrency}`
           
        data = {
            message: {
                dialog_id: dialog_id,
                sender_type: "client",
                content: content
            },
            from_currency: fiatCurrency,
            to_currency: resultCurrency,
            input_sum: String(gaveAmount),
            rate: String(resultRate),
            result_sum: String(receivedAmount)
        }
        }
    else {
        content = 'Новая заявка из клиентского мини апп'
        data = {
        message: {
            dialog_id: dialog_id,
            sender_type: "client",
            content: content
        },
        }
    }
    

    await fetch(process.env.REACT_APP_API_URL + '/api/v1/conversations/leads', {
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