module.exports = {
  friendlyName: 'Vehicle Create',
  description: 'Action for creating a Vehicle. The vehicle will be associated with the user that creates it.',
  inputs: {
    vehicleId : {
      description: 'The ID of the Vehicle that is going to be updated',
      type: 'number',
      required: true
    },
    make: {
      description: 'A string describing the make of the vehicle',
      type: 'string',
    },
    model: {
      description: 'A string describing the model of the vehicle',
      type: 'string',
    },
    year: {
      description: 'A string describing the year the vehicle was manufactured',
      type: 'string',
    },
    nickname: {
      description: 'A string that can be used to help the user easily identify the vhicle',
      type: 'string',
    },
    description: {
      description: 'A string describing the the vehicle',
      type: 'string',
    },
  },
  exits: {},
  fn: async function ({ vehicleId, make, model, year, nickname, description }) {
    return await Vehicles.updateOne({id: vehicleId})
    .set({ make, model, year, nickname, description });
  }
};
