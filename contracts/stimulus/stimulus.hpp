#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

class [[eosio::contract]] stimulus : public eosio::contract {

  private:
    
    struct survey {
      int8_t          eligible = 0;
    };

    struct [[eosio::table]] user_info {
      name            username;
      uint16_t        amount_owed = 0;
      survey          survey_data;

      auto primary_key() const { return username.value; }
    };

    typedef eosio::multi_index<name("users"), user_info> users_table;
    users_table _users;
    

  public:

    stimulus(name receiver, name code, datastream<const char*> ds ):contract(receiver, code, ds),
                       _users(receiver, receiver.value) {}

    [[eosio::action]]
    void login(name username);

    [[eosio::action]]
    void clearsurvey(name username);
    
    [[eosio::action]]
    void submitsurvey(name username);

};
