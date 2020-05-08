module.exports = {
  friendlyName: 'Vehicle Create',
  description: 'Action for creating a Vehicle. The vehicle will be associated with the user that creates it.',
  inputs: {
    make: {
      description: 'A string describing the make of the vehicle',
      type: 'string',
      required: true
    },
    model: {
      description: 'A string describing the model of the vehicle',
      type: 'string',
      required: true
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
  fn: async function ({ make, model, year, nickname, description }) {
    return await Vehicles.create({
      make,
      model,
      year,
      nickname,
      description,
      owner: this.req.user.id
    }).fetch();
  }
};
