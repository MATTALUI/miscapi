const getStockData = require('./_getData.js');

module.exports = {
  friendlyName: 'Stock Show',
  description: 'Action returning the information for a specific Stock',
  inputs: {
    stockId : {
      description: 'The ticker symbol of the stock that is going to be looked up',
      type: 'string',
      required: true
    }
  },
  exits: {},
  fn: async function ({ stockId }) {
    const data = await getStockData([stockId.toUpperCase()]);

    return data[0];
  }
};
