#!/bin/sh
./node_modules/.bin/webpack --watch --devtool inline-source-map &
supervisor app.js
kill %2
kill %1