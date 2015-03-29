import React from 'react';
import _ from 'lodash';


class EditAvailability extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state = this.getStateFromStores();
  }

  getStateFromStores() {
    let stores = this.context.flux.stores;
    let params = this.context.router.getCurrentParams();
    return {
      game: stores.games.getGameById(params.id),
    };
  }

  setStateFromStores() {
    this.setState(this.getStateFromStores());
  }

  componentDidMount() {
    let stores = this.context.flux.stores;
    stores.games.addListener('change', this.onChange);
  }

  componentWillUnmount() {
    let stores = this.context.flux.stores;
    stores.games.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(this.getStateFromStores());
  }

  renderButtons() {
    let owners = this.state.game.owners;
    let ownerObj = _.find(owners, (ownerObj) => {
      return ownerObj.owner._id == ENV.user._id;
    });
    let available = false;
    if (ownerObj) {
      available = ownerObj.available;
    }
    let toRender = [];
    if (ownerObj && available) {
      toRender.push(<div className="row center-xs">
          <div className="col-xs-6">
            <button type="button" className="btn">This game is no longer in the office.</button>
          </div>
        </div>);
    }
    if (ownerObj) {
      toRender.push(<div className="row center-xs">
          <div className="col-xs-6">
            <button type="button" className="btn">I no longer own this game.</button>
          </div>
        </div>);
    }
    if (ownerObj && !available) {
      toRender.push(<div className="row center-xs">
          <div className="col-xs-6">
            <button type="button" className="btn">I brought this game into the office.</button>
          </div>
        </div>);
    }
    if (!ownerObj) {
      toRender.push(<div className="row center-xs">
          <div className="col-xs-6">
            <button type="button" className="btn">I own this game now.</button>
          </div>
        </div>);
    }
    return toRender;
  }

  render() {
    return (
      <div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Modify Availability</h2>
          </div>
        </div>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h3>{this.state.game.title}</h3>
          </div>
        </div>
        {this.renderButtons()}
        <div className="row center-xs">
          <div className="col-xs-6">

          </div>
        </div>
      </div>
    );
  }

}

EditAvailability.contextTypes = {
  flux: React.PropTypes.object,
  router: React.PropTypes.func
}

export default EditAvailability;