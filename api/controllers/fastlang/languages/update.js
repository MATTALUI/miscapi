module.exports = {
  friendlyName: 'Vehicle Create',
  description: 'Action for creating a Vehicle. The vehicle will be associated with the user that creates it.',
  inputs: {
    languageId : {
      description: 'The ID of the Language that is going to be updated',
      type: 'number',
      required: true
    },
    name: {
      description: 'The name of a Language.',
      type: 'string',
    },
    shortCode: {
      description: 'A shorthand name for a Language',
      type: 'string',
    },
    color: {
      description: 'A color that\'s desired to be associated with a Language.',
      type: 'string',
    },
    description: {
      description: 'A description of the Language.',
      type: 'string',
    },
  },
  exits: {},
  fn: async function ({ languageId, name, shortCode, color, description }) {
    return await Languages.updateOne({ id: languageId })
    .set({ name, shortCode, color, description });
  }
};
