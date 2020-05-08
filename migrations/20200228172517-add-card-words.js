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
  return db.createTable('cardwords', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },

    value: { type: 'string', notNull: true },

    card: { type: 'int', notNull: true },
    language: { type: 'int', notNull: true },

    createdAt: 'bigint',
    updatedAt: 'bigint',
  })
  .then(function(results){
    return db.addIndex('cardwords', 'cardwords_card_index','card');
  })
  .then(function(results){
    return db.addIndex('cardwords', 'cardwords_language_index','language');
  })
  .then(function(results){
    return db.addForeignKey('cardwords', 'cards', 'card', { card: 'id' }, { onDelete: 'CASCADE'});
  })
  .then(function(results){
    return db.addForeignKey('cardwords', 'languages', 'language', { language: 'id' }, { onDelete: 'CASCADE'});
  });
};

exports.down = function(db) {
  return db.dropTable('cardwords');
};

exports._meta = {
  "version": 1
};
