module.exports = {
  attributes: {
    value: { type: 'string', required: true },

    // Associations
    language: { model: 'languages', required: true },
    card: { model: 'cards', required: true },
  },
};
