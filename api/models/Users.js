module.exports = {
  attributes: {
    email: { type: 'string', required: true, unique: true},
    passwordHash: {type: 'string', required: true },
    firstName: { type: 'string', required: true, },
    lastName: { type: 'string', required: true, },
    nickname: { type: 'string' },
    description: { type: 'string' },

    // Associations
    vehicles: { collection: 'vehicles', via: 'owner' },
    logs: { collection: 'autologs', via: 'user' },
    cards: { collection: 'cards', via: 'user' }
  },
};
