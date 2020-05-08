module.exports = {
  friendlyName: 'Vehicle Logs',
  description: 'Action returning all of the logs for a specific vehicle',
  inputs: {
    vehicleId : {
      description: 'The ID of the vehicle that is going to be looked up',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({ vehicleId }) {
    return await AutoLogs.find({ vehicle: vehicleId });
  }
};
