'use strict';
const names = {
	deleted: 'deleted',
};

const tableInfo = {
	tableName: 'schedules',
};

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.addColumn(tableInfo.tableName, names.deleted, {
			type: Sequelize.INTEGER,
			defaultValue: 0,
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.removeColumn(tableInfo.tableName, names.deleted);
	},
};
