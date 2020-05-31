// React core
import React, { Component } from "react";
import { connect } from "react-redux";
// components
import { Button } from "components";
// Services and redux action
import { UserAction } from "actions";
import { ApiService } from "services";

class Survey extends Component {
  constructor(props) {
    // Inherit constructor
    super(props);
    // State for showing/hiding components when the API (blockchain) request is loading
    this.state = {
      survey_progress: 0,
      submit_trxid: "",
      clear_trxid: "",
      loading: true,
    };
    // Bind functions
    this.loadUser = this.loadUser.bind(this);
    this.handleClearSurvey = this.handleClearSurvey.bind(this);
    this.handleSubmitSurvey = this.handleSubmitSurvey.bind(this);
    this.surveyNext = this.surveyNext.bind(this);
    // Call `loadUser` before mounting the app
    this.loadUser();
  }

  // Get latest user object from blockchain
  loadUser() {
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
    const {
      setUser,
      user: { name },
    } = this.props;
    // Send request the blockchain by calling the ApiService,
    // Get the user object and store the `win_count`, `lost_count` and `game_data` object
    return ApiService.getUserByName(name).then((user) => {
      setUser({
        amount_owed: user.amount_owed,
        survey: user.survey_data,
      });
      // Set the loading state to false for displaying the app
      this.setState({ loading: false });
    });
  }

  handleClearSurvey() {
    // Send a request to API (blockchain) to clear survey
    // And call `loadUser` again for react to render latest survey status to UI
    return ApiService.clearSurvey().then((response) => {
      this.setState({ submit_trxid: "" });
      if (response) {
        this.setState({ clear_trxid: response.transaction_id });
      }
      return this.loadUser();
    });
  }

  handleSubmitSurvey() {
    // Send a request to API (blockchain) to submit survey
    // And call `loadUser` again for react to render latest survey status to UI
    this.surveyNext();

    return ApiService.submitSurvey().then((response) => {
      this.setState({ clear_trxid: "" });
      if (response) {
        this.setState({ submit_trxid: response.transaction_id });
      }
      return this.loadUser();
    });
  }

  surveyNext() {
    const { submit_trxid } = this.state;

    if (this.state.survey_progress >= 4) {
      this.setState({ survey_progress: 0 });
    } else if (submit_trxid) {
      this.setState({ survey_progress: 4 });
    } else {
      this.setState({ survey_progress: this.state.survey_progress + 1 });
    }
  }

  render() {
    // Extract data from state and user data of `UserReducer` from redux
    const { clear_trxid, submit_trxid, survey_progress, loading } = this.state;
    const {
      user: { name, amount_owed, survey },
    } = this.props;

    return (
      <div className="Survey">
        {survey_progress === 0 && (
          <div>
            <br />
            <h1>Welcome, {name}</h1>
            <br />
            You are owed <b>${ amount_owed }</b> of aid.
            <p>
              If you have not taken the survey yet or your information has
              changed, then please
            </p>
            <h2>File a Claim</h2>
            <Button onClick={this.surveyNext} className="blue">
              {"FILE A CLAIM"}
            </Button>
            <br />
            <p>
              If the value for amount owed is not $0 or you want take the survey
              again, you must clear survey data first.
            </p>
            <Button onClick={this.handleClearSurvey} className="blue">
              {"CLEAR SURVEY DATA"}
            </Button>
            {clear_trxid && (
              <div>
                Cleared Survey Data!
                <br />
                Paste this id into the Block.One EOSIO Testnet to verify receipt
                of transaction:
                <br />
                {clear_trxid}
              </div>
            )}
          </div>
        )}
        {survey_progress === 1 && (
          <div>
            <br />
            <h1>Filing a New Claim</h1>
            <br />
            <h2>Can I apply for Stimulus Aid Benefits?</h2>
            <p>
              If you apply for Stimulus Aid benefits today, your claim will be
              effective 6/1/20.
            </p>
            <h2>What information do I need to know before filing a claim?</h2>
            <p>
              Before continuing to file your claim, please take note of the
              following:
            </p>
            <li>
              It is illegal in the state of EOSIO for an employer or
              governmental agency to discriminate on the basis of race, color,
              creed, age, percieved age, national origin, alienage, citizenship
              status, gender, gender identity and expression, sexual
              orientation, disability, national origin, military status, marital
              status, partnership status, pregnancy and caregiver status. See
              EOSIO Human Rights laws for more information (doesn't actually
              exist .. yet).
            </li>
            <li>
              To be eligible, you must admire the security, speed, and power of
              EOSIO technology.
            </li>
            <Button className="blue" onClick={this.surveyNext}>
              {"CONTINUE"}
            </Button>
          </div>
        )}
        {survey_progress === 2 && (
          <div>
            <br />
            Are you eligible for aid?
            <br />
            <Button className="green" onClick={this.surveyNext}>
              {"YES"}
            </Button>
          </div>
        )}
        {survey_progress === 3 && (
          <div>
            <br />
            Do you agree that this Governments should use an EOSIO Blockchain to
            distribute aid?
            <br />
            <Button className="green" onClick={this.handleSubmitSurvey}>
              {"I AGREE"}
            </Button>
            <Button className="red" onClick={this.handleSubmitSurvey}>
              {"I DO NOT AGREE"}
            </Button>
          </div>
        )}
        {survey_progress === 4 && (
          <div>
            <br />
            Thank you for completing your claim process. <br />
            {submit_trxid && (
              <div>
                <br />
                Survey Data was successfully submitted.
                <br />
                Paste this id into the Block.One EOSIO Testnet to verify receipt
                of transaction:
                <br />
                {submit_trxid}
                <br />
              </div>
            )}
            <br />
            You should see your balance update on the welcome page.
            <br />
            <br />
            <Button className="blue" onClick={this.surveyNext}>
              {"CONTINUE"}
            </Button>
          </div>
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Survey);
