import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

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

    mongoose.model(modelName, schema);
  });
