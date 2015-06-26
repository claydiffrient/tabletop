var config = require('config');

module.exports = {
  development: {
    schema: {'migration': {} },
    modelName: 'Migration',
    db: config.get('Db.url')
  },
  test: {},
  production: {}
};
