# stimulus_integrity
Bringing Integrity within Stimulus Aid

# EOSIO Testnet
This app is running on the EOSIO Testnet. For the demo you can just `cd` into the frontend folder,
and run `npm start` to see the demo.


## Compile in `/contracts/stimulus` folder with
eosio-cpp -abigen "contracts/stimulus/stimulus.cpp" -o "contracts/stimulus/stimulus.wasm" --contract "stimulus"

# OR

# Building dApp
## $1 smart contract name
## $2 account holder name of the smart contract
## $3 wallet for unlock the account
## $4 password for unlocking the wallet
For example:
`quick_start.sh stimulus stimulusacc stimuluswal $(cat stimulus_wallet_password.txt)`