module.exports = {
  friendlyName: 'AutoLog Index',
  description: 'Action returning an array of all of the AutoLogs Saved for a user',
  fn: async function () {
    const userId = this.req.user.id;
    return await AutoLogs.find({user: userId});
  }
};
