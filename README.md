# tabletop
A game chooser system

[![Build Status](https://travis-ci.org/claydiffrient/tabletop.svg)](https://travis-ci.org/claydiffrient/tabletop)
[![Test Coverage](https://codeclimate.com/github/claydiffrient/tabletop/badges/coverage.svg)](https://codeclimate.com/github/claydiffrient/tabletop)
[![Code Climate](https://codeclimate.com/github/claydiffrient/tabletop/badges/gpa.svg)](https://codeclimate.com/github/claydiffrient/tabletop)

Thanks for stopping by :smile: !  This is a system where when connected with the proper api can help you
select a game to play.  It's main purpose is to help Instructure's tabletop group decide what game will be
played in our daily games at lunch.

It uses Express to provide a server as well as a RESTful API through which all frontend actions take place.

To get started you need to have MongoDB installed, then simply running   
```
npm install
```    
from the repository's main directory will install all the dependencies.

There are a few scripts found within the `bin/` directory.  These are helpful for running things.  They are accessible easily
through `npm run`.

```
npm start - starts the server
npm test - runs all the tests
npm run compile - will compile all the JSX for the client side.
npm run coverage - runs the tests and outputs test coverage information
```
Something else that might come in handy is directly running `bin/clientdev` which does almost the same as `npm run compile` 
however it will watch for changes and recompile on the fly.  It also does not do any optimization to the output.




### Contributing

You can contribute by filing issues because obviously there are many.  I'm also super open to pull requests if you think you can solve
a problem, I'll try and respond to those quickly.  Just make sure you include the appropriate details in commit messages.
