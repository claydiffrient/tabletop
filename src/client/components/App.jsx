/** @flow */
import React from 'react';
import { connect } from 'react-redux';

import GameCard from './GameCard';
import Header from './Header';
import CardContainer from './CardContainer';

class App extends React.Component {

  componentWillMount () {
    this.props.onLoad();
  }

  render () : React.Element {
    console.log(CardContainer);
    return (
      <div>
        <Header />
        <CardContainer games={this.props.gameList.games} />
      </div>
    );
  }
};


export default App;