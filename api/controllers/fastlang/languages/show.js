module.exports = {
  friendlyName: 'Language Show',
  description: 'Action returning the information for a specific Language',
  inputs: {
    languageId : {
      description: 'The ID of the Language that is going to be looked up',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({languageId}) {
    return await Languages.findOne({ id: languageId });
  }
};
