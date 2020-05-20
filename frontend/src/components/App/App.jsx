// React core
import React, { Component } from "react";
import { connect } from "react-redux";
// Components
// import { Login } from 'components';
// Services and redux action
import { UserAction } from "actions";
import { ApiService } from "services";

class App extends Component {
  constructor(props) {
    // Inherit constructor
    super(props);
    // State for showing/hiding components when the API (blockchain) request is loading
    this.state = {
      loading: true,
    };
    // Bind functions
    this.getCurrentUser = this.getCurrentUser.bind(this);
    // Call getCurrentUser before mounting the app
    this.getCurrentUser();
  }

  getCurrentUser() {
    // Extract setUser of UserAction from redux
    const { setUser } = this.props;
    // Send a request to API (blockchain) to get the current logged in user
    return (
      ApiService.getCurrentUser()
        // If the server return a username
        .then((username) => {
          // Save the username to redux store
          // For structure, ref: ./frontend/src/reducers/UserReducer.js
          setUser({ name: username });
        })
        // To ignore 401 console error
        .catch(() => {})
        // Run the following function no matter the server return success or error
        .finally(() => {
          // Set the loading state to false for displaying the app
          this.setState({ loading: false });
        })
    );
  }

  render() {
    // Extract data from state and props (`user` is from redux)
    const { loading } = this.state;
    const {
      user: { name, survey },
    } = this.props;

    // Set class according to loading state, it will hide the app (ref to css file)
    // If the username is set in redux, display the Profile component
    // If the username is NOT set in redux, display the Login component
    return (
      <div className="App">
        <header className="App-header">
          <p>Stimulus Integrity</p>
        </header>
      </div>
    );
  }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = (state) => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(App);
