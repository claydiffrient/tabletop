#!/bin/sh
NODE_ENV=production node_modules/.bin/webpack
node_modules/.bin/uglifyjs public/js/main.js --mangle --compress warnings=false > public/js/main.min.js
mv public/js/main.min.js public/js/main.js
node app.js