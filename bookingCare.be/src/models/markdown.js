'use strict';
import { Model } from 'sequelize';
import { tableInfo, handleColTypes } from '../migrations/markdown-migration';

module.exports = (sequelize, DataTypes) => {
 class Markdown extends Model {
  static associate(models) {
   Markdown.belongsTo(models.users, {
    foreignKey: 'doctorId',
    as: 'doctorMarkdownData',
   });
  }
 }
 const colsTypes = handleColTypes(DataTypes, false);

 Markdown.init(
  {
   ...colsTypes,
  },
  {
   sequelize,
   modelName: `${tableInfo.tableName}`,
  },
 );
 return Markdown;
};
