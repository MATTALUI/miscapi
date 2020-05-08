module.exports = {
  friendlyName: 'AutoLog Show',
  description: 'Action returning the information for a specific AutoLog',
  inputs: {
    logId : {
      description: 'The ID of the AutoLog that is going to be looked up',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({ logId }) {
    return await AutoLogs.findOne({ id: logId})
  }
};
