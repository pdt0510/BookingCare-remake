'use strict';
import { tableInfo, handleColTypes } from '../migrations/booking-migration';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		static associate(models) {
			Booking.belongsTo(models.allcodes, {
				foreignKey: 'timeType',
				targetKey: 'keymap',
				as: 'getTimetypeVal',
			});
			Booking.belongsTo(models.allcodes, {
				foreignKey: 'gender',
				targetKey: 'keymap',
				as: 'genderDataBooking',
			});
		}
	}

	Booking.init(
		{ ...handleColTypes(DataTypes, false) },
		{
			sequelize,
			modelName: tableInfo.tableName,
		},
	);
	return Booking;
};
