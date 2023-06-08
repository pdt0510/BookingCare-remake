'use strict';
const names = {
	deleted: 'deleted',
};

const tableInfo = {
	markdowns: 'markdowns',
	doctor_infors: 'doctor_infors',
};

// src33xx2
module.exports = {
	up: function (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.addColumn(tableInfo.markdowns, names.deleted, {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			}),
			queryInterface.addColumn(tableInfo.doctor_infors, names.deleted, {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			}),
		]);
	},

	down: function (queryInterface, Sequelize) {
		return Promise.all([
			queryInterface.removeColumn(tableInfo.markdowns, names.deleted),
			queryInterface.removeColumn(tableInfo.doctor_infors, names.deleted),
		]);
	},
};
