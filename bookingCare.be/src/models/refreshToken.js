import { Model } from 'sequelize';
import { tableInfo, handleColTypes } from '../migrations/refreshToken-migration';

module.exports = (sequelize, DataTypes) => {
 class RefreshToken extends Model {
  static associate(models) {
   RefreshToken.belongsTo(models.users, {
    foreignKey: 'userId',
    as: 'refreshTokenData',
   });
  }
 }
 const colsTypes = handleColTypes(DataTypes, false);

 RefreshToken.init(
  {
   ...colsTypes,
  },
  {
   sequelize,
   modelName: `${tableInfo.tableName}`,
  },
 );
 return RefreshToken;
};
