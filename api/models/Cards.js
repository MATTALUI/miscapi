module.exports = {
  attributes: {
    definition: { type: 'string', required: true },
    currentSet: { type: 'boolean', defaultsTo: true },

    // Associations
    user: { model: 'users', required: true },
    words: { collection: 'cardwords', via: 'card' }
  },
};
