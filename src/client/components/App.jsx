/** @flow */
import React from 'react';
import { connect } from 'react-redux';

import GameCard from './GameCard';
import Header from './Header';

class App extends React.Component {

  componentWillMount () {
    this.props.onLoad();
  }

  render () : React.Element {
    console.log(this.props);
    return (
      <div>
        <Header />
        <div className='card-deck'>
          {this.props.gameList.games.map((game, index) => {
            return (<GameCard {...game} />);
          })}
        </div>
      </div>
    );
  }
};


export default App;