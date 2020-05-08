module.exports = {
  friendlyName: 'Update AutoLogs',
  description: 'Action used to update an AutoLog record.',
  inputs: {
    logId: {
      description: "the ID of the log that is to be updated",
      type: "number",
      required: true
    },
    miles: {
      description: "The miles count on the odometer",
      type: 'number'
    },
    fillupAmount: {
      description: "The amount in gallons that were used to fill the vehicle",
      type: 'number'
    },
    fillupCost: {
      description: "Thos cost of the fillup.",
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
    console.log(inputs);
    return await AutoLogs.updateOne({
      id: inputs.logId
    }).set({...inputs});
  }
};
