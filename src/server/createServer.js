import debugLogger from 'debug';
let debug = debugLogger('tabletop');

/**
 * Used to create a server for testing
 */
function createServer (app) {
  var server = app.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
  });
  return server;
}

export default createServer;
