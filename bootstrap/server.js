

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('express-app:server');
var http = require('http');


//##################################################
//##################################################
//################  Server Config ####################
//##################################################
//##################################################


/* We can use app.set & app.use before createServer */


//-- Set Config
const port=process.env.APP_PORT || 3000;
const host=process.env.APP_HOST;

app.set('port', port);
app.set('env', process.env.APP_ENV); // test - production - development
app.set('trust proxy', true); //-- for nginx & varnish


//-- Create HTTP server.
var server = http.createServer(app);





//-- Run Server
server.listen(port,host,()=>{
	console.log("Express is Running in : http://"+host+":"+port);
})




//################## Express Config ##################

//--------------------------------------------------
//--------------------------------------------------
//----------------- Server Error Console Log
//--------------------------------------------------
//--------------------------------------------------

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}