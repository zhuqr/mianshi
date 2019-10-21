const mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.createMongo = function () {
  return new Promise((resolve, reject) => {
    mongoose.connect("mongodb://localhost/demo", function (err) { //链接数据库
      if (err) {
        console.log('mongodb connerct fail...');
        reject()
      } else {
        console.log('mongodb connerct success...');
        resolve()
      }
    });
  })
}
exports.disconnect = function () {
  mongoose.disconnect();
  console.log('断开数据库...');
}

exports.createSchema = function (SchemaName, schemaObj) {
  var mySchema = new Schema(schemaObj);
  SchemaName = mongoose.model(SchemaName, mySchema);
}