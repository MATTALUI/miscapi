module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    shortCode: { type: 'string', required: true },
    color: { type: 'string' },
    description: { type: 'string' },

    // Associations
    words: { collection: 'cardwords', via: 'language' }
  },
};
