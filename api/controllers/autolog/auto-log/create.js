module.exports = {
  friendlyName: 'Create AutoLogs',
  description: 'Action used to create a new AutoLog record.',
  inputs: {
    miles: {
      description: "The miles count on the odometer",
      type: 'number'
    },
    fillupAmount: {
      description: "The amount in gallons that were used to fill the vehicle",
      type: 'number'
    },
    fillupCost: {
      description: "The cost of the fillup.",
      type: 'number'
    },
    note: {
      descriptions: "Any notes the user wants to include",
      type: 'string'
    },
    location: {
      description: "A user-defined description of where the log was filled out",
      type: 'string'
    },
    coords: {
      description: "Coordinates of where the log was filled out",
      type: "string"
    },
    vehicle: {
      description: "ID of the vehicle the record will be associated with",
      type: "number"
    }
  },
  exits: {},
  fn: async function (inputs) {
    return await AutoLogs.create({
      ...inputs,
      user: this.req.user.id
    }).fetch();
  }
};
