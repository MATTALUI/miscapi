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
  return db.createTable('vehicles', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    make: {type: 'string', notNull: true},
    model: {type: 'string', notNull: true},
    year: 'string',
    nickname: 'string',
    description: 'string',
    createdAt: 'bigint',
    updatedAt: 'bigint',

    owner: 'integer'
  })
  .then(function(results){
    return db.addIndex('vehicles', 'vehicles_owner_index','owner');
  })
  .then(function(results){
    db.addForeignKey('vehicles', 'users', 'owner', { owner: 'id' }, { onDelete: 'CASCADE'});
  });
};

exports.down = function(db) {
  return db.dropTable('vehicles');
};

exports._meta = {
  "version": 1
};
