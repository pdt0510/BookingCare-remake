'use strict';
import { Model } from 'sequelize';
import { tableInfo, handleColTypes } from '../migrations/schedule-migration';

module.exports = (sequelize, DataTypes) => {
 class Schedule extends Model {
  static associate(models) {
   Schedule.belongsTo(models.allcodes, {
    foreignKey: 'timeType',
    targetKey: 'keymap',
    as: 'doctorWorkdateData',
   });
  }
 }
 const colsTypes = handleColTypes(DataTypes, false);

 Schedule.init(
  {
   ...colsTypes,
  },
  {
   sequelize,
   modelName: `${tableInfo.tableName}`,
  },
 );
 return Schedule;
};
