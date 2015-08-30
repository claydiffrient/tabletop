# tabletop
A game chooser system

**NOTE:**The application is currently going through a transition to new technologies
and a better setup.  This includes transitioning to use Waterline instead of Mongoose
and to use Redux instead of minimal-flux.  I'm branching what is currently on master
over to a branch called semi-stable.  Feel free to use it if you want something that
is somewhat working.

[![Build Status](https://travis-ci.org/claydiffrient/tabletop.svg)](https://travis-ci.org/claydiffrient/tabletop)
[![Test Coverage](https://codeclimate.com/github/claydiffrient/tabletop/badges/coverage.svg)](https://codeclimate.com/github/claydiffrient/tabletop)
[![Code Climate](https://codeclimate.com/github/claydiffrient/tabletop/badges/gpa.svg)](https://codeclimate.com/github/claydiffrient/tabletop)
[![Dependencies](https://david-dm.org/claydiffrient/tabletop.svg)](https://david-dm.org/claydiffrient/tabletop)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

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

### Slack Reporting

Inside the `bin/` directory one of the scripts is `postWinningVote` this is ideal to put on a scheduler so that you can announce in a slack channel what the winning vote on a given day is.  I use Heroku Scheduler to perform this each day just before our groups lunch game time.  All settings are configured via environment variables or through settings in the `node-config` files described below.


### Contributing

You can contribute by filing issues because obviously there are many.  I'm also super open to pull requests if you think you can solve
a problem, I'll try and respond to those quickly.  Just make sure you include the appropriate details in commit messages.

If you are adding something that can be configured, we use `node-config` for configuation.  If the configuration setting is not sensitive, such as a simple boolean value, please add it directly to `config/default.json`.  If the data is sensitive, please add it to your own `config/local.json` so that it doesn't end up in the repository.  Ideally, you can provide a example bit of data in the `config/default.json` so that further work on that particular feature can be jump started with an example.  Regardless, all config variables should also be defined in the `config/custom-environment-variables.json` file so that they can be overriden with environment variables in production environments.

Pull requests should maintain a clean git history.  Therefore, please do not include "line of thought" commits or merge commits.
If you have things that contribute in a meaningful way, feel free to leave them.  The best rule of thumb to follow
however is to squash all your commits to one commit and include a detailed commit message.
