'use strict';
import {
  tableInfo,
  handleColTypes,
} from '../migrations/doctor_clinic_specialty-migration';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Specialty extends Model {
    static associate(models) {}
  }

  Doctor_Clinic_Specialty.init(
    { ...handleColTypes(DataTypes, false) },
    {
      sequelize,
      modelName: tableInfo.tableName,
    },
  );
  return Doctor_Clinic_Specialty;
};
