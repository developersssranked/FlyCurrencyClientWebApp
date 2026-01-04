export const getPercentBySum = ({activeUpperCurrency, activeDownCurrency, rates, parsedFiatSum, direction}) => {
    let percentBySum;
    const currencyPair = `${activeUpperCurrency.toLowerCase()}_${activeDownCurrency.toLowerCase()}`

    if (['rub_uah', 'usdt_uah', 'usdt_usd', 'usdt_eur', 'thb_usd', 'thb_kzt', 'thb_eur', 'vnd_rub', 'vnd_thb', 'vnd_uah', 'usd_thb', 'usd_vnd', 'usd_usdt', 'eur_thb', 'eur_usdt', 'uah_thb', 'uah_usdt'].includes(currencyPair)){
        const currencyStaticPercentMapping = {
            'usdt_uah': 4,
            'usdt_usd': 2,
            'usdt_eur': 2,
            'thb_usd': 2,
            'thb_kzt': 4,
            'thb_eur': 2,
            'vnd_rub': 4,
            'vnd_thb': 4,
            'vnd_uah': 4,
            'usd_thb': 2,
            'usd_vnd': 4,
            'usd_usdt': 2,
            'eur_thb': 2,
            'eur_usdt': 2,
            'uah_thb': 4,
            'uah_usdt': 4,
            'rub_uah': 4
        }
        percentBySum = currencyStaticPercentMapping[currencyPair]
    }
    else if (currencyPair === 'rub_thb' || currencyPair === 'thb_rub'){
        let resultThbSum
        if (direction === 'from') {
            resultThbSum = currencyPair === 'rub_thb' ? parsedFiatSum / rates.rub_thb: parsedFiatSum;
        }
        else {
            resultThbSum = currencyPair === 'rub_thb' ? parsedFiatSum : parsedFiatSum / rates.rub_thb;
        }
        if (resultThbSum <= 5000){
            percentBySum = 6
        }
        else if (5000 < resultThbSum && resultThbSum <= 5500){
            percentBySum = 5.8
        }
        else if (5500 < resultThbSum && resultThbSum <= 6000){
            percentBySum = 5.6
        }
        else if (6000 < resultThbSum && resultThbSum <= 6500){
            percentBySum = 5.4
        }
        else if (6500 < resultThbSum && resultThbSum <= 7000){
            percentBySum = 5.2
        }
        else if (7000 < resultThbSum && resultThbSum <= 7500){
            percentBySum = 5
        }
        else if (7500 < resultThbSum && resultThbSum <= 8000){
            percentBySum = 4.8
        }
        else if (8000 < resultThbSum && resultThbSum <= 8500){
            percentBySum = 4.6
        }
        else if (8500 < resultThbSum && resultThbSum <= 9000){
            percentBySum = 4.4
        }
        else if (9000 < resultThbSum && resultThbSum <= 9500){
            percentBySum = 4.2
        }
        else if (9500 < resultThbSum && resultThbSum <= 15000){
            percentBySum = 3.8
        }
        else if (15000 < resultThbSum && resultThbSum <= 25000){
            percentBySum = 3.6
        }
        else if (25000 < resultThbSum && resultThbSum <= 35000){
            percentBySum = 3.2
        }
        else if (35000 < resultThbSum && resultThbSum <= 50000){
            percentBySum = 2.8
        }
        else if (50000 < resultThbSum && resultThbSum <= 65000){
            percentBySum = 2.6
        }
        else if (65000 < resultThbSum && resultThbSum <= 85000){
            percentBySum = 2.4
        }
        else if (85000 < resultThbSum && resultThbSum <= 95000){
            percentBySum = 2.2
        }
        else if (95000 < resultThbSum && resultThbSum <= 150000){
            percentBySum = 1.9
        }
        else if (150000 < resultThbSum && resultThbSum <= 200000){
            percentBySum = 1.8
        }
        else if (200000 < resultThbSum && resultThbSum <= 250000){
            percentBySum = 1.7
        }
        else if (250000 < resultThbSum){
            percentBySum = 1.6
        }
    }
    else if (currencyPair === 'rub_vnd'){
        let usdtSum;
        if (direction === 'from') {
            usdtSum = parsedFiatSum / rates.rub_usdt;
        }
        else {
            usdtSum = parsedFiatSum / rates.vnd_usdt;
        }
        if (usdtSum <= 100){
            percentBySum = 7
        }
        else if (100 < usdtSum && usdtSum <= 1000){
            percentBySum = 4
        }
        else if (1000 < usdtSum && usdtSum <= 1500){
            percentBySum = 3.5
        }
        else if (15000 < usdtSum && usdtSum <= 3000){
            percentBySum = 3
        }
        else if (3000 < usdtSum){
            percentBySum = 2.5
        }
    }
    else if (currencyPair === 'rub_usdt'){
        let resSum;
        if (direction === 'from') {
            resSum = parsedFiatSum;
        }
        else {
            resSum = parsedFiatSum * rates.rub_usdt;
        }
        if (resSum <= 10000){
            percentBySum = 3
        }
        else if (10000 < resSum && resSum <= 150000){
            percentBySum = 2.5
        }
        else if (150000 < resSum){
            percentBySum = 2
        }
    }
    else if (currencyPair === 'usdt_thb') {
        let resultThbSum;
        if (direction === 'from'){
            resultThbSum = parsedFiatSum * rates.usdt_thb;
        }
        else {
            resultThbSum = parsedFiatSum;
        }
        if (resultThbSum <= 5000){
            percentBySum = 6
        }
        else if (5000 < resultThbSum && resultThbSum <= 5500){
            percentBySum = 5.8
        }
        else if (5500 < resultThbSum && resultThbSum <= 6000){
            percentBySum = 5.6
        }
        else if (6000 < resultThbSum && resultThbSum <= 6500){
            percentBySum = 5.4
        }
        else if (6500 < resultThbSum && resultThbSum <= 7000){
            percentBySum = 5.2
        }
        else if (7000 < resultThbSum && resultThbSum <= 7500){
            percentBySum = 5
        }
        else if (7500 < resultThbSum && resultThbSum <= 8000){
            percentBySum = 4.8
        }
        else if (8000 < resultThbSum && resultThbSum <= 8500){
            percentBySum = 4.6
        }
        else if (8500 < resultThbSum && resultThbSum <= 9000){
            percentBySum = 4.4
        }
        else if (9000 < resultThbSum && resultThbSum <= 9500){
            percentBySum = 4.2
        }
        else if (9500 < resultThbSum && resultThbSum <= 15000){
            percentBySum = 3.8
        }
        else if (15000 < resultThbSum && resultThbSum <= 25000){
            percentBySum = 3.6
        }
        else if (25000 < resultThbSum && resultThbSum <= 35000){
            percentBySum = 3.2
        }
        else if (35000 < resultThbSum && resultThbSum <= 50000){
            percentBySum = 2.8
        }
        else if (50000 < resultThbSum && resultThbSum <= 65000){
            percentBySum = 2.6
        }
        else if (65000 < resultThbSum && resultThbSum <= 85000){
            percentBySum = 2.4
        }
        else if (85000 < resultThbSum && resultThbSum <= 95000){
            percentBySum = 2.2
        }
        else if (95000 < resultThbSum && resultThbSum <= 150000){
            percentBySum = 1.9
        }
        else if (150000 < resultThbSum && resultThbSum <= 200000){
            percentBySum = 1.8
        }
        else if (200000 < resultThbSum && resultThbSum <= 250000){
            percentBySum = 1.7
        }
        else if (250000 < resultThbSum){
            percentBySum = 1.6
        }
    }
    else if (currencyPair === 'usdt_vnd'){
        let usdtSum;
        if (direction === 'from') {
            usdtSum = parsedFiatSum;
        }
        else {
            usdtSum = parsedFiatSum / rates.usdt_vnd
        }
        if (usdtSum <= 100){
            percentBySum = 7
        }
        else if (100 < usdtSum && usdtSum <= 1000){
            percentBySum = 4
        }
        else if (1000 < usdtSum && usdtSum <= 1500){
            percentBySum = 3.5
        }
        else if (15000 < usdtSum && usdtSum <= 3000){
            percentBySum = 3
        }
        else if (3000 < usdtSum){
            percentBySum = 2.5
        }
    }
    else if (currencyPair === 'usdt_rub'){
        let rubSum;
        if (direction === 'from') {
            rubSum = parsedFiatSum * rates.usdt_rub;
        }
        else {
            rubSum = parsedFiatSum
        }

        if (rubSum <= 10000){
            percentBySum = 3
        }
        else if (10000 < rubSum && rubSum <= 40000){
            percentBySum = 2.5
        }
        else if (40000 < rubSum && rubSum <= 150000){
            percentBySum = 2
        }
        else if (150000 < rubSum && rubSum <= 500000){
            percentBySum = 1.5
        }
        else if (500000 < rubSum){
            percentBySum = 1
        }
    }
    else if (currencyPair === 'thb_usdt'){
        let usdtSum;
        if (direction === 'from') {
            usdtSum = parsedFiatSum / rates.thb_usdt;
        }
        else {
            usdtSum = parsedFiatSum;
        }
        
        if (usdtSum <= 100){
            percentBySum = 5
        }
        else if (100 < usdtSum && usdtSum <= 1000){
            percentBySum = 4
        }
        else if (1000 < usdtSum && usdtSum <= 2000){
            percentBySum = 3
        } 
        else if (2000 < usdtSum && usdtSum <= 4000){
            percentBySum = 2
        }
        else if (4000 < usdtSum){
            percentBySum = 1.8
        }
    }
    else if (currencyPair === 'vnd_usdt'){
        let usdtSum;
        if (direction === 'from') {
            usdtSum = parsedFiatSum / rates.vnd_usdt;
        }
        else {
            usdtSum = parsedFiatSum;
        }

        if (usdtSum <= 100){
            percentBySum = 5
        }
        else if (100 < usdtSum && usdtSum <= 1000){
            percentBySum = 4
        }
        else if (1000 < usdtSum && usdtSum <= 2000){
            percentBySum = 3
        } 
        else if (2000 < usdtSum && usdtSum <= 4000){
            percentBySum = 2
        }
        else if (4000 < usdtSum){
            percentBySum = 1.8
        }
    }

    return percentBySum
}


export const calculateExchange = ({
  amount, from, to, rates, user,
  direction // 'from' или 'to'
}) => {
  const currencyPair = `${from.toLowerCase()}_${to.toLowerCase()}`;
  let percentBySum = getPercentBySum({
    activeUpperCurrency: from, 
    activeDownCurrency: to, 
    rates, 
    parsedFiatSum: amount, 
    direction});

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
    if (isInverseCalculation) {
      rate = Number((rates[currencyPair] * (1 + resultPercent / 100)).toFixed(3));
      convertedAmount = Math.round(amount / rate);
      rateDisplay = `Курс ${rate} ${from} = 1 ${to}`;
    } else {
      rate = Number((rates[currencyPair] * (1 - resultPercent / 100)).toFixed(3));
      convertedAmount = Math.round(amount * rate);
      rateDisplay = `Курс 1 ${from} = ${rate} ${to}`;
    }
  }
  else if (direction === 'to') {
    if (isInverseCalculation) {
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