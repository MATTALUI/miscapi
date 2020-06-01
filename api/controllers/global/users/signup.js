const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Signup',
  description: 'Registers a new user',
  inputs: {
    email: {
      description: 'The email of a new User. This will be unique for each created user.',
      type: 'string',
      required: true
    },
    firstName: {
      description: 'First name for a user',
      type: 'string',
      required: true
    },
    lastName: {
      description: 'Last name for a user',
      type: 'string',
      required: true
    },
    password: {
      description: 'Desired new password for created user',
      type: 'string',
      required: true
    },
    confirmPassword: {
      description: 'Used to confirm password for user',
      type: 'string',
      required: true
    },
    nickname: {
      description: 'Optional nickname for a user; available for client convenience',
      type: 'string',
    },
    description: {
      description: 'Optional description for a user; available for client convenience',
      type: 'string',
    },
  },
  exits: {},
  fn: async function ({ email, firstName, lastName, nickname, description, password, confirmPassword}) {
    if (!!this.req.user) {
      this.res.status(406);
      return { error: "Cannot register while logged in." };
    } else if (password !== confirmPassword) {
      this.res.status(406);
      return { error: "Confirmation password does not match." };
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    let newUser = {};
    try {
      newUser = await Users.create({
        passwordHash: hash,
        email,
        firstName,
        lastName,
        nickname,
        description,
      }).fetch();
      delete newUser.passwordHash;
    } catch (error){
      console.error(error);
      this.res.status(406);
      return { error: "User for that email already exists." };
    }

    const token = jwt.sign({ ...newUser }, process.env.JWTSECRET);
    this.res.cookie('identity', token, { signed: true, httpOnly: true });
    // TODO: add a token expiration when active development slows down...

    return {
      user: newUser,
      userToken: token,
    };
  }
};
