/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const resource = (app, resourceName) => ({
  [`GET /${app}/${resourceName}s`]: { action: `${app}/${resourceName}s/index` },
  [`GET /${app}/${resourceName}s/:${resourceName}Id`]: { action: `${app}/${resourceName}s/show` },
  [`POST /${app}/${resourceName}s`]: { action: `${app}/${resourceName}s/create` },
  [`PUT /${app}/${resourceName}s/:${resourceName}Id`]: { action: `${app}/${resourceName}s/update` },
  [`PATCH /${app}/${resourceName}s/:${resourceName}Id`]: { action: `${app}/${resourceName}s/update` },
  [`DELETE /${app}/${resourceName}s/:${resourceName}Id`]: { action: `${app}/${resourceName}s/delete` },
});

const routes = {
  /////////// MISCAPI ///////////
  '/': { action: 'miscapi' }, // TODO: I'd like to make this a small documentation react app.
  // Users
  'GET /global/user': { action: 'global/users/whoami' },
  'POST /global/users': { action: 'global/users/signup' },
  'POST /global/user/session': { action: 'global/users/login' },
  'DELETE /global/user/session': { action: 'global/users/logout' },

  ////////// AUTOLOGS //////////
  // Logs
  'GET /auto-logs/logs': { action: 'autolog/auto-log/index' },
  'GET /auto-logs/logs/:logId': { action: 'autolog/auto-log/show' },
  'GET /auto-logs/vehicles/:vehicleId/logs': { action: 'autolog/auto-log/vehicle-logs' },
  'POST /auto-logs/logs': { action: 'autolog/auto-log/create' },
  'PUT /auto-logs/logs/:logId': { action: 'autolog/auto-log/update' },
  'PATCH /auto-logs/logs/:logId': { action: 'autolog/auto-log/update' },
  'DELETE /auto-logs/logs/:logId': { action: 'autolog/auto-log/delete' },
  // Vehicles
  'GET /auto-logs/vehicles': { action: 'autolog/vehicles/index'},
  'GET /auto-logs/vehicles/:vehicleId': { action: 'autolog/vehicles/show' },
  'POST /auto-logs/vehicles': { action: 'autolog/vehicles/create' },
  'PUT /auto-logs/vehicles/:vehicleId': { action: 'autolog/vehicles/update' },
  'PATCH /auto-logs/vehicles/:vehicleId': { action: 'autolog/vehicles/update' },
  'DELETE /auto-logs/vehicles/:vehicleId': { action: 'autolog/vehicles/delete' },

  ////////// FASTLANG //////////
  '/fastlang/graphql': { action: 'fastlang/graphql' },
};
console.log(routes);

module.exports.routes = routes;
