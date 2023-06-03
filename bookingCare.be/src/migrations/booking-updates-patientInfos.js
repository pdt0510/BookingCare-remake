'use strict';

const additionalCols = {
	firstname: 'firstname',
	lastname: 'lastname',
	phone: 'phone',
	gender: 'gender',
	email: 'email',
	address: 'address',
};

const tableInfo = {
	tableName: 'bookings',
};

module.exports = {
	up: function (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(tableInfo.tableName, additionalCols.firstname, {
				type: Sequelize.STRING,
			}),
			queryInterface.addColumn(tableInfo.tableName, additionalCols.lastname, {
				type: Sequelize.STRING,
			}),
			queryInterface.addColumn(tableInfo.tableName, additionalCols.phone, {
				type: Sequelize.STRING,
			}),
			queryInterface.addColumn(tableInfo.tableName, additionalCols.gender, {
				type: Sequelize.STRING,
			}),
			queryInterface.addColumn(tableInfo.tableName, additionalCols.email, {
				type: Sequelize.STRING,
			}),
			queryInterface.addColumn(tableInfo.tableName, additionalCols.address, {
				type: Sequelize.STRING,
			}),
		]);
	},

	down: function (queryInterface, Sequelize) {
		return Promise.all();
	},
};
