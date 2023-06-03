'use strict';
import { tableInfo, handleColTypes } from '../migrations/history-migration';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {}
  }
  const colsTypes = handleColTypes(DataTypes, false);

  History.init(
    {
      ...colsTypes,
    },
    {
      sequelize,
      modelName: `${tableInfo.tableName}`,
    },
  );
  return History;
};
