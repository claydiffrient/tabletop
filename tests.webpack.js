var context = require.context('./client', true, /\.spec\.js$/);
context.keys().forEach(context);
