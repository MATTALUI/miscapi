module.exports = {
  friendlyName: 'AutoLog Show',
  description: 'Action returning the information for a specific AutoLog',
  inputs: {
    vehicleId : {
      description: 'The ID of the Vehicle that is going to be looked up',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({vehicleId}) {
    return await Vehicles.findOne({ id: vehicleId });
  }
};
