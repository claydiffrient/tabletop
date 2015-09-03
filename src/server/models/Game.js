import Waterline from 'waterline';

export default Waterline.Collection.extend({
  identity: 'game',
  connection: 'default',
  attributes: {
    bggId: {
      type: 'integer',
      index: true,
      unique: true,
      required: true
    },
    title: {
      type: 'string',
      unique: true,
      required: true,
      index: true
    },
    owners: {
      collection: 'user',
      via: 'games'
    },
    thumbnailUrl: {type: 'string'},
    minPlayers: {type: 'integer'},
    maxPlayers: {type: 'integer'},
    description: {type: 'string'},
    mechanics: {type: 'array'},
    playTime: {type: 'integer'}
  }
});
