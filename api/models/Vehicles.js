module.exports = {
  attributes: {
    make: { type: 'string', required: true, },
    model: { type: 'string', required: true, },
    year: { type: 'string' },
    nickname: { type: 'string' },
    description: { type: 'string' },

    // Associations
    owner: { model: 'users', required: true },
    logs: { collection: 'autologs', via: 'vehicle' }
  },
};
