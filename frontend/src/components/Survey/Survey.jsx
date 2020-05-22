// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Game subcomponents
// import { GameInfo, GameMat, PlayerProfile, Resolution } from './components';
// Services and redux action
import { UserAction } from 'actions';
import { ApiService } from 'services';

class Survey extends Component {

  constructor(props) {
    // Inherit constructor
    super(props);
    // State for showing/hiding components when the API (blockchain) request is loading
    this.state = {
      loading: true,
    };
    // Bind functions
    // this.loadUser = this.loadUser.bind(this);
    // this.handleStartGame = this.handleStartGame.bind(this);
    // this.handlePlayCard = this.handlePlayCard.bind(this);
    // this.handleNextRound = this.handleNextRound.bind(this);
    // this.handleEndGame = this.handleEndGame.bind(this);
    // Call `loadUser` before mounting the app
    this.loadUser();
  }

  // Get latest user object from blockchain
  loadUser() {
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
    const { setUser, user: { name } } = this.props;
    // Send request the blockchain by calling the ApiService,
    // Get the user object and store the `win_count`, `lost_count` and `game_data` object
    return ApiService.getUserByName(name).then(user => {
      setUser({
        amount_owed: user.amount_owed,
        survey: user.survey_data,
      });
      // Set the loading state to false for displaying the app
      this.setState({ loading: false });
    });
  }

  render() {
    // Extract data from state and user data of `UserReducer` from redux
    const { loading } = this.state;
    const { user: { name, amount_owed, survey } } = this.props;

    // If game hasn't started, display `PlayerProfile`
    // If game has started, display `GameMat`, `Resolution`, `Info` screen
    return (
      <div>
        This is the survey.
      </div>
    )
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Survey);
