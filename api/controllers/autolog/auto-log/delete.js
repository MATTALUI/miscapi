module.exports = {
  friendlyName: 'Get That log outta my face!',
  description: 'Action that will delete record for the log belonging to the ID passed.',
  inputs: {
    logId : {
      description: 'The ID of the log that is going to be deleted.',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({ logId }) {
    return await AutoLogs.destroyOne({ id: logId });
  }
};
