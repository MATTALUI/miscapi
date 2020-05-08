'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('autologs', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    miles: 'decimal',
    fillupAmount: 'decimal',
    fillupCost: 'decimal',
    note: 'string',
    location: 'string',
    coords: 'string',
    createdAt: 'bigint',
    updatedAt: 'bigint',

    user: { type: 'int', notNull: true },
    vehicle: { type: 'int', notNull: true }
  })
  .then(function(results){
    return db.addIndex('autologs', 'autologs_user_index', 'user');
  })
  .then(function(results){
    return db.addIndex('autologs', 'autologs_vehicle_index', 'vehicle');
  })
  .then(function(results){
    return db.addForeignKey('autologs', 'users', 'user', {user: 'id'}, { onDelete: 'CASCADE'});
  })
  .then(function(results){
    return db.addForeignKey('autologs', 'vehicles', 'vehicle', {vehicle: 'id'}, { onDelete: 'CASCADE'});
  });
};

exports.down = function(db) {
  return db.dropTable('autologs');
};

exports._meta = {
  "version": 1
};
