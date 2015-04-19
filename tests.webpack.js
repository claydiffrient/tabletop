/*eslint no-unused-vars: [0] */
var ENV = window.ENV || {};
var context = require.context('./client', true, /\.spec\.js$/);
context.keys().forEach(context);
