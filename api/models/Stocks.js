
module.exports = {
  attributes: {
    ticker: {type: 'string', required: true },

    // Associations
    user: { model: 'users', required: true },
  },
};
