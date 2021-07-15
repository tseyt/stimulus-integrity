# stimulus_integrity
Using blockchain to enhance integrity within stimulus aid

A demo modeled after [New York State Department of Labor's Benefits Claim Process](https://dol.ny.gov/unemployment/file-your-first-claim-benefits) during the CoVid-19 pandemic.

# Usage:
- Download the project and run `cd /frontend`. From there, run `npm start` to launch the frontend.

*Note: this project is running on [Block.One's EOSIO Testnet](https://testnet.eos.io/)*

### Compile smart contracts with:
eosio-cpp -abigen "contracts/stimulus/stimulus.cpp" -o "contracts/stimulus/stimulus.wasm" --contract "stimulus"
