const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Login',
  description: 'Action deleting the user session logging them out.',
  inputs: {
    email: {
      description: 'The email address identifying the user logging in.',
      type: 'string',
      required: true,
    },
    password: {
      description: 'Their password, duh.',
      type: 'string',
      required: true,
    },
  },
  fn: async function ({ email, password }) {
    if (!!this.req.user) {
      this.res.status(406);
      return { error: "Already logged in." };
    }

    const user = await Users.findOne({ email }) || { passwordHash: "" };
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      this.res.status(403);
      return { error: "Email or password is incorrect." };
    }

    delete user.passwordHash;
    const userToken = jwt.sign({ ...user }, process.env.JWTSECRET);
    this.res.cookie('identity', userToken, { signed: true, httpOnly: true });
    // TODO: add a token expiration when active development slows down...

    return {
      user,
      userToken
    };
  }
};
