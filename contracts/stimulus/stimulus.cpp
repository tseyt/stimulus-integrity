#include "stimulus.hpp"
// following may be deprecated, used for calculating trx_id
// #include <eosiolib/crypto.h>
// #include <eosiolib/transaction.h>


void stimulus::login(name username) {
  // Ensure this action is authorized by the player
  require_auth(username);
  
  // Create a record in the table if the player doesn't exist in our app yet
  auto user_iterator = _users.find(username.value);
  if (user_iterator == _users.end()) {
    user_iterator = _users.emplace(username,  [&](auto& new_user) {
      new_user.username = username;
    });
  }
}

void stimulus::clearsurvey(name username) {
  require_auth(username);

  // Reset survey data of user
  auto user_itr = _users.begin();
  check( user_itr != _users.end(), "user does not exist in table" );
  _users.modify( user_itr, _self, [&]( auto& row ) {
    row.amount_owed = 0;
    row.survey_data = survey();
  });
}

// checksum256 get_trx_id() {
//     size_t size = transaction_size();
//     char buf[size];
//     size_t read = read_transaction( buf, size );
//     uint32_t length = 256;
//     check( size == read, "read_transaction failed");
//     return sha256( buf, length, (capi_checksum256 *)&read );
// }

void stimulus::submitsurvey(name username) {
  require_auth(username);

  // Submit survey data
  auto user_itr = _users.begin();
  check( user_itr != _users.end(), "user does not exist in table" );
  _users.modify( user_itr, _self, [&]( auto& row ) {
    row.amount_owed = 600; // every eligible recipient recieves $600
    survey& survey_data = row.survey_data;
    // change survey data
    survey_data.eligible = 1;
    row.survey_data = survey_data;
  });
}

