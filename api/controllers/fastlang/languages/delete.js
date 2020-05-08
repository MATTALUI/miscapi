module.exports = {
  friendlyName: 'Language Delete',
  description: 'Action that will delete record for the language belonging to the ID passed.',
  inputs: {
    languageId : {
      description: 'The ID of the Language that is going to be deleted.',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({languageId}) {
    return await Languages.destroyOne({ id: languageId });
  }
};
