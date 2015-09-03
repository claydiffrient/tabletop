import Waterline from 'waterline';

export default Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    username: {type: 'string', required: true, unique: true},
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string'},
    password: {type: 'string'},
    games: {
      collection: 'game',
      via: 'owners',
      dominant: true
    }
  }
});
