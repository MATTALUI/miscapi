module.exports = {
  friendlyName: 'Delete Stock Subscription',
  description: 'Action that will delete stock subscription belonging to the ID passed.',
  inputs: {
    stockId : {
      description: 'The ticker of the stock that is going to be deleted.',
      type: 'string',
      required: true
    }
  },
  exits: {},
  fn: async function ({ stockId }) {
    return await Stocks.destroyOne({ ticker: stockId.toUpperCase(), user: this.req.user.id });
  }
};
