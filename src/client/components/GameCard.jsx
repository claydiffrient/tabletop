import React from 'react';

let GameCard = (props) => {
  return (
    <div className="card">
      <img className="card-img-top img-responsive" src="http://placehold.it/375x200" alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">Card title</h4>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  imageUrl: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
};

export default GameCard;