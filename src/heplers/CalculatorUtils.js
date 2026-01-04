export const calculateExchange = ({
  amount, from, to, rates, user, 
  direction // 'from' или 'to'
}) => {
  const currencyPair = `${from.toLowerCase()}_${to.toLowerCase()}`;
  const reversePair = `${to.toLowerCase()}_${from.toLowerCase()}`;

  // 1️⃣ Определи `percentBySum` (как у тебя — перенеси весь этот блок в функцию)
  let percentBySum = getPercentBySum({ amount, from, to, rates, currencyPair });

  // 2️⃣ Примени лояльность
  const userLoyaltyMapping = { 0: 0, 1: 0.2, 2: 0.5, 3: 0.75 };
  const resultPercent = percentBySum - (userLoyaltyMapping[user.loyalty] ?? 0);

  // 3️⃣ Определи, как считать: по курсу `from→to` или наоборот
  const isInverseCalculation = [
    'rub_thb', 'thb_usdt', 'thb_usd', 'thb_eur', 'uah_thb',
    'vnd_rub', 'vnd_usdt', 'vnd_usd', 'rub_usdt', 'rub_uah',
    'usdt_eur', 'vnd_thb', 'usd_usdt', 'uah_usdt'
  ].includes(currencyPair);

  let rate, convertedAmount, rateDisplay;

  if (direction === 'from') {
    // Считаем `to` из `from`
    if (isInverseCalculation) {
      // Например: 1 THB = X RUB → вводим RUB → получаем THB = RUB / rate
      rate = Number((rates[currencyPair] * (1 + resultPercent / 100)).toFixed(3));
      convertedAmount = Math.round(amount / rate);
      rateDisplay = `Курс ${rate} ${from} = 1 ${to}`;
    } else {
      rate = Number((rates[currencyPair] * (1 - resultPercent / 100)).toFixed(3));
      convertedAmount = Math.round(amount * rate);
      rateDisplay = `Курс 1 ${from} = ${rate} ${to}`;
    }
  } else if (direction === 'to') {
    // Считаем `from` из `to`
    if (isInverseCalculation) {
      // Вводим `to` → восстанавливаем `from = to * rate`
      rate = Number((rates[currencyPair] * (1 + resultPercent / 100)).toFixed(3));
      convertedAmount = Math.round(amount * rate);
      rateDisplay = `Курс ${rate} ${from} = 1 ${to}`;
    } else {
      rate = Number((rates[currencyPair] * (1 - resultPercent / 100)).toFixed(3));
      convertedAmount = Math.round(amount / rate);
      rateDisplay = `Курс 1 ${from} = ${rate} ${to}`;
    }
  }

  return {
    convertedAmount,
    finalRate: rate,
    finalPercent: resultPercent,
    rateDisplay
  };
};