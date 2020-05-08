module.exports = {
  friendlyName: 'Logout',
  description: 'Action deleting the user session logging them out.',
  fn: async function () {
    this.res.clearCookie('identity');
    return true;
  }
};
