/** @flow */
import React from 'react';
import '../styles/GameCard.css';

type Props = {
  thumbnail: string,
  title: string,
  description: string
};

let GameCard = (props: Props): React.Element => {
  let srcImage = props.thumbnail || "http://placehold.it/375x200"
  let shortDesc = props.description.substring(0, 200)
  return (
    <div className="GameCard card">
      <img className="card-img-top img-responsive" src={srcImage} alt="Game image" />
      <div className="card-block">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text">{shortDesc}</p>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  thumbnail: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
};

export default GameCard;
