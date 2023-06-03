const types = {
 STRING: 'STRING',
 TEXT: 'TEXT',
 TEXTLONG: 'TEXTLONG',
 INTEGER: 'INTEGER',
 BIGINT: 'BIGINT',
 DATE: 'DATE',
 BLOBmedium: 'BLOBmedium',
 BLOBlong: 'BLOBlong',
 BOOLEAN: 'BOOLEAN',
};

const names = {
 doctorId: 'doctorId',
 currentNumber: 'currentNumber',
 maxNumber: 'maxNumber',
 workdate: 'workdate',
 timeType: 'timeType',
};

const tableInfo = {
 tableName: 'schedules',
 cols: [
  `${names.doctorId}-${types.INTEGER}`,
  `${names.currentNumber}-${types.INTEGER}`,
  `${names.maxNumber}-${types.INTEGER}`,
  `${names.workdate}-${types.BIGINT}`,
  `${names.timeType}-${types.STRING}`,
 ],
};

const handleColTypes = (dbType, isSequelize = true) => {
 let result = {};
 if (isSequelize) {
  tableInfo.cols.forEach((element) => {
   const [key, type] = element.split('-');
   if (type === types.STRING) {
    result[key] = { type: dbType.STRING };
   } else if (type === types.INTEGER) {
    result[key] = { type: dbType.INTEGER };
   } else if (type === types.BIGINT) {
    result[key] = { type: dbType.BIGINT };
   } else if (type === types.BOOLEAN) {
    result[key] = { type: dbType.BOOLEAN };
   } else if (type === types.DATE) {
    result[key] = { type: dbType.DATE };
   } else if (type === types.TEXT) {
    result[key] = { type: dbType.TEXT };
   } else if (type === types.TEXTLONG) {
    result[key] = { type: dbType.TEXT('long') };
   } else if (type === types.BLOBmedium) {
    result[key] = { type: dbType.BLOB('medium') };
   } else if (type === types.BLOBlong) {
    result[key] = { type: dbType.BLOB('long') };
   }
  });
 } else {
  tableInfo.cols.forEach((element) => {
   const [key, type] = element.split('-');
   if (type === types.STRING) {
    result[key] = dbType.STRING;
   } else if (type === types.INTEGER) {
    result[key] = dbType.INTEGER;
   } else if (type === types.BIGINT) {
    result[key] = dbType.BIGINT;
   } else if (type === types.BOOLEAN) {
    result[key] = dbType.BOOLEAN;
   } else if (type === types.DATE) {
    result[key] = dbType.DATE;
   } else if (type === types.TEXT) {
    result[key] = dbType.TEXT;
   } else if (type === types.TEXTLONG) {
    result[key] = dbType.TEXT('long');
   } else if (type === types.BLOBmedium) {
    result[key] = dbType.BLOB('medium');
   } else if (type === types.BLOBlong) {
    result[key] = dbType.BLOB('long');
   }
  });
 }
 return result;
};
