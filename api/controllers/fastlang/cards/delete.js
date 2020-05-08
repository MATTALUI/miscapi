module.exports = {
  friendlyName: 'Card Delete',
  description: 'Action that will delete record for the card belonging to the ID passed.',
  inputs: {
    cardId : {
      description: 'The ID of the card that is going to be deleted.',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({ cardId }) {
    return await Cards.destroyOne({ id:  cardId  });
  }
};
