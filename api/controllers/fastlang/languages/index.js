module.exports = {
  friendlyName: 'Languages Index',
  description: 'Action returning an array of all of the Languages Saved',
  fn: async function () {
    return await Languages.find(); // All
  }
};
