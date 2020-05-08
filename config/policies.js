module.exports.policies = {
  'autolog/*': ['authenticateApp', 'authenticateUser'],
  'fastlang/*': ['authenticateApp', 'authenticateUser'],
  'global/users/*': ['optionalUser'],
};
