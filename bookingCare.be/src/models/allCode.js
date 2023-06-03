'use strict';
import { tableInfo, handleColTypes } from '../migrations/allCode-migration';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
	class Allcode extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */

		static associate(models) {
			Allcode.hasMany(models.users, {
				foreignKey: 'gender',
				as: 'genderData',
			});
			Allcode.hasMany(models.bookings, {
				foreignKey: 'gender',
				as: 'genderDataBooking',
			});
			Allcode.hasMany(models.schedules, {
				foreignKey: 'timeType',
				as: 'doctorWorkdateData',
			});
			Allcode.hasMany(models.doctor_infors, {
				foreignKey: 'priceId',
				as: 'getPriceValue',
			});
			Allcode.hasMany(models.doctor_infors, {
				foreignKey: 'provinceId',
				as: 'provinceVal',
			});
			Allcode.hasMany(models.bookings, {
				foreignKey: 'timeType',
				as: 'getTimetypeVal',
			});
		}
	}

	Allcode.init(
		{ ...handleColTypes(DataTypes, false) },
		{
			sequelize,
			modelName: tableInfo.tableName,
		},
	);
	return Allcode;
};
