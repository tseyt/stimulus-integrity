import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components
import { Button } from 'components';

class Signup extends Component {
 
  render() {

    return (
      <div className="Signup">
        <div>
          <p>
            If you feel you are an eligible recipient of aid from the EOSIO Dept of Labor,
            please follow the instructions to set up your account.
          </p>
          <br />
          <p>
            This account will allow you to track and verify any actions regarding your aid compensation.
          </p>
          <br />
          <p>
            To create your account, you will need to go through a short KYC process.
            <br />
            Please have your license and/or passport in hand during verification.
          </p>
          <br />
          <p>
            ... Pretend you went through the KYC Process ...
          </p>
          <br />
          <p>
            Thank you for completing verification. Please note the following account name and key to login:
            <br/><br />
            <h2>account name:</h2><br />ambbzdxueroy
            <br /><br />
            <h2>private key:</h2><br />5KXyoe7TFSXxE3ceYQTymY78A87VXSbDuMqey1jeYoi7BZtch3F
            <br /><br />
            (This demo is using the EOSIO Testnet. An actual Dept of Labor would want to spin up their own EOSIO Blockchain to distribute accounts)
          </p>
          <br />
          <Link to="/"><Button>{ "LOGIN" }</Button></Link>
        </div>
      </div>
    )
  }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Export a redux connected component
export default connect(mapStateToProps)(Signup);
