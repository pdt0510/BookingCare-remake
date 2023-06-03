'use strict';
import { Model } from 'sequelize';
import { tableInfo, handleColTypes } from '../migrations/clinic-migration';

module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  Clinic.init(
    { ...handleColTypes(DataTypes, false) },
    {
      sequelize,
      modelName: tableInfo.tableName,
    },
  );
  return Clinic;
};
