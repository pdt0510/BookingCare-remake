'use strict';

const names = {
 resetPasswordToken: 'resetPasswordToken',
};

const tableInfo = {
 tableName: 'users',
};

module.exports = {
 up: function (queryInterface, Sequelize) {
  // logic for transforming into the new state
  return queryInterface.addColumn(tableInfo.tableName, names.resetPasswordToken, Sequelize.TEXT);
 },

 down: function (queryInterface, Sequelize) {
  // logic for reverting the changes
  return queryInterface.removeColumn(tableInfo.tableName, names.resetPasswordToken);
 },
};
