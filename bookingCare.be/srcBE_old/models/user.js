import { Model } from 'sequelize';
import { tableInfo, handleColTypes } from '../migrations/user-migration';

module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  static associate(models) {
   User.hasOne(models.markdowns, {
    foreignKey: 'doctorId',
    as: 'doctorMarkdownData',
   });
   User.belongsTo(models.allcodes, {
    foreignKey: 'gender',
    targetKey: 'keymap',
    as: 'genderData',
   });
   User.hasOne(models.doctor_infors, {
    foreignKey: 'doctorId',
    as: 'userInforData',
   });
   User.hasMany(models.bookings, {
    foreignKey: 'patientId',
    as: 'patientInfoData',
   });
   User.hasMany(models.refreshtokens, {
    foreignKey: 'userId',
    as: 'refreshTokenData',
   });
  }
 }
 const colsTypes = handleColTypes(DataTypes, false);

 User.init(
  {
   ...colsTypes,
  },
  {
   sequelize,
   modelName: `${tableInfo.tableName}`,
  },
 );
 return User;
};
