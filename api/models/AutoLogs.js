module.exports = {
  attributes: {
    miles: {type: 'number'},
    fillupAmount: {type: 'number'},
    fillupCost: {type: 'number'},
    note: { type: 'string' },
    location: { type: 'string' },
    coords: { type: 'string' },

    // Associations
    user: { model: 'users', required: true },
    vehicle: { model: 'vehicles', required: true }
  },
};
