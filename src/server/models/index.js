import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

export default function (app = {models: {}}) {
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) &&
             (file !== 'index.js') &&
             (file.indexOf('.map') === -1);
    })
    .forEach((file) => {
      let schema = require(path.join(__dirname, file));
      let splitLocation = file.indexOf('Schema');
      let modelName = file.substring(0, splitLocation);

      app.models[modelName] = mongoose.model(modelName, schema);
    });

}
