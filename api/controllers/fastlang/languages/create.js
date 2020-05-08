module.exports = {
  friendlyName: 'Language Create',
  description: 'Action for creating a Language.',
  inputs: {
    name: {
      description: 'The name of a Language.',
      type: 'string',
      required: true
    },
    shortCode: {
      description: 'A shorthand name for a Language',
      type: 'string',
      required: true
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
  fn: async function ({ name, shortCode, color, description }) {
    return await Languages.create({ name, shortCode, color, description}).fetch();
  }
};
