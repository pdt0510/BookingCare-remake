'use strict';
import { Model } from 'sequelize';
import { tableInfo, handleColTypes } from '../migrations/speciality-migration';

module.exports = (sequelize, DataTypes) => {
 class Speciality extends Model {
  static associate(models) {
   Speciality.hasOne(models.doctor_infors, {
    foreignKey: 'specialityId',
    as: 'doctorInfoData',
   });
  }
 }
 const colsTypes = handleColTypes(DataTypes, false);

 Speciality.init(
  {
   ...colsTypes,
  },
  {
   sequelize,
   modelName: `${tableInfo.tableName}`,
  },
 );
 return Speciality;
};
