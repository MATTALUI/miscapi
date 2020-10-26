module.exports.policies = {
  'autolog/*': ['authenticateApp', 'authenticateUser'],
  'fastlang/*': ['authenticateApp', 'authenticateUser'],
  'my-stocks/*': ['authenticateApp', 'authenticateUser'],
  'global/users/*': ['optionalUser'],
};
