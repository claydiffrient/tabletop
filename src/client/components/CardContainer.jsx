/** @flow */
import React from 'react';
import { chunk } from 'lodash';
import GameCard from './GameCard';

const MAX_CARDS_PER_ROW = 5;

let CardContainer = (props) => {
  let chunks = chunk(props.games, MAX_CARDS_PER_ROW);
  return (
    <div>
      {
        chunks.map((gameChunk) => {
          return (
            <div className='card-deck'>
              {
                gameChunk.map((game) => {
                  console.log(game);
                  return (<GameCard {...game} />);
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}

export default CardContainer;