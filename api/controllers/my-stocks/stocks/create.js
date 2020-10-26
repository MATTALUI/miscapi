const getStockData = require('./_getData.js');

module.exports = {
  friendlyName: 'Create Stock',
  description: 'Create a subscription for a stock for a user.',
  inputs: {
    stockId : {
      description: 'The ticker symbol of the stock that is going to be looked up',
      type: 'string',
      required: true
    }
  },
  exits: {},
  fn: async function ({ stockId }) {
    Stocks.create({
      ticker: stockId.toUpperCase(),
      user: this.req.user.id,
    });
    const data = await getStockData([stockId.toUpperCase()]);
    
    return data[0];
  }
};
