import React from 'react';
import { connect } from 'react-redux';

import GameCard from './GameCard';

class App extends React.Component {
  render () {
    return (
      <div>
        <div className='card-deck'>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
        <div className='card-deck'>
          <GameCard />
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