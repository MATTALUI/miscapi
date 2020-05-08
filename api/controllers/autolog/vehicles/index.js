module.exports = {
  friendlyName: 'Vehicles Index',
  description: 'Action returning an array of all of the Vehicles Saved for a user',
  fn: async function() {
    const userId = this.req.user.id;
    return await Vehicles.find({ owner: userId });
  }
};
