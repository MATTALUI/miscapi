const axios = require('axios');

module.exports = async function(symbols){
  const companyDataRequests = symbols.map(symbol => axios(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}`, {
    headers: {
      'X-Finnhub-Token': process.env.STOCKS_FINNHUBAPIKEY,
    }
  }));

  const companyFinanceRequests = symbols.map(symbol => axios(`https://finnhub.io/api/v1/quote?symbol=${symbol}`, {
    headers: {
      'X-Finnhub-Token': process.env.STOCKS_FINNHUBAPIKEY,
    }
  }));

  const datasets = 2;
  const data = [];
  const responseData = await Promise.all([...companyDataRequests, ...companyFinanceRequests]);
  const set = responseData.length / datasets;

  for (let i = 0; i < set; i++){
    const companyData = responseData[i].data;
    const companyQuote = responseData[i+set].data;
    // https://www.investopedia.com/trading/candlestick-charting-what-is-it/
    data.push({
      ...companyData,
      ticker: companyData.ticker || symbols[i],
      quotes: {
        openingPrice: companyQuote.o,
        dailyHigh: companyQuote.h,
        dailyLow: companyQuote.l,
        currentPrice: companyQuote.c,
        previousClosingPrice: companyQuote.pc,
      }
    });
  }

  return data;
}
