/** @flow */
import React from 'react';
import { connect } from 'react-redux';

import GameCard from './GameCard';
import Header from './Header';

class App extends React.Component {
  render () : React.Element {
    return (
      <div>
        <Header />
        <div className='card-deck'>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
      </div>
    );
  }
};


export default App;