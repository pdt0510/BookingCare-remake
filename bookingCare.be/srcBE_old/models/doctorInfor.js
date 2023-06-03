'use strict';
import { tableInfo, handleColTypes } from '../migrations/doctorInfor-migration';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
 class DoctorInfor extends Model {
  static associate(models) {
   DoctorInfor.belongsTo(models.allcodes, {
    foreignKey: 'priceId',
    targetKey: 'keymap',
    as: 'getPriceValue',
   });
   DoctorInfor.belongsTo(models.users, {
    foreignKey: 'doctorId',
    as: 'userInforData',
   });
   DoctorInfor.belongsTo(models.specialities, {
    foreignKey: 'specialityId',
    as: 'doctorInfoData',
   });
   DoctorInfor.belongsTo(models.allcodes, {
    foreignKey: 'provinceId',
    targetKey: 'keymap',
    as: 'provinceVal',
   });
  }
 }

 DoctorInfor.init(
  {
   ...handleColTypes(DataTypes, false),
  },
  {
   sequelize,
   modelName: tableInfo.tableName,
  },
 );
 return DoctorInfor;
};
