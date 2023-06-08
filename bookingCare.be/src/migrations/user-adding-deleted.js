'use strict';

const names = {
	deleted: 'deleted',
};

const tableInfo = {
	tableName: 'users',
};

module.exports = {
	up: function (queryInterface, Sequelize) {
		// logic for transforming into the new state
		return queryInterface.addColumn(tableInfo.tableName, names.deleted, {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		});
	},

	down: function (queryInterface, Sequelize) {
		// logic for reverting the changes
		return queryInterface.removeColumn(tableInfo.tableName, names.deleted);
	},
};
