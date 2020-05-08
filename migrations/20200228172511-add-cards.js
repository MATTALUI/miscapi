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
  return db.createTable('cards', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    definition: { type: 'string', notNull: true },
    currentSet: { type: 'boolean', defaultValue: true, notNull: true, },
    user: { type: 'int', notNull: true },

    createdAt: 'bigint',
    updatedAt: 'bigint',
  })
  .then(function(results){
    return db.addIndex('cards', 'cards_user_index','user');
  })
  .then(function(results){
    db.addForeignKey('cards', 'users', 'user', { user: 'id' }, { onDelete: 'CASCADE'});
  });
};

exports.down = function(db) {
  return db.dropTable('cards');
};

exports._meta = {
  "version": 1
};
