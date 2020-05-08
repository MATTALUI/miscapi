module.exports = {
  friendlyName: 'Who am I?',
  description: 'Action returning the current logged in user. Good for clients who need to check login status or get user data.',
  fn: async function () {
    if (!this.req.user) return {};

    const { id: userId } = this.req.user;
    return await Users.findOne({
      where: { id: userId },
      select: [ 'id', 'createdAt', 'updatedAt', 'email', 'firstName', 'lastName', 'nickname', 'description', ],
    });
  }
};
