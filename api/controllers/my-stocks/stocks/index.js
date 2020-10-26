const getStockData = require('./_getData.js');

module.exports = {
  friendlyName: 'Stocks Index',
  description: 'Action returning an array of all of the followed stock data for a user',
  fn: async function () {
    const stocks = await Stocks.find({ user: this.req.user.id });
    const symbols = stocks.map(stock => stock.ticker);
    
    return await getStockData(symbols);
  },
};
