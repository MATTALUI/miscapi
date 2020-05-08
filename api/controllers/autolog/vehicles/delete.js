module.exports = {
  friendlyName: 'Vehicle DESTRUCTIOOOON!!!',
  description: 'Action that will delete record for the vehicle belonging to the ID passed.',
  inputs: {
    vehicleId : {
      description: 'The ID of the Vehicle that is going to be deleted.',
      type: 'number',
      required: true
    }
  },
  exits: {},
  fn: async function ({vehicleId}) {
    return await Vehicles.destroyOne({ id: vehicleId });
  }
};
