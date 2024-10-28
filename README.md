
-------------------------------------------------------------
#Nebula Token - (NBT)

NebulaToken Contract address : 0xD00Fc7BABDa872B2663F9Ab8672471C6c422027C
view on sepolia.etherscan.com


Token design : 
1. intial supply : 70% - 7,000,000  [Done]
2. max supply(capped) : 10,000,000 [Done]
3. make token burnable : [Done]
burning enables users or the contract owner to "burn" (destroy) a specified amount of tokens they own.
burning the tokens reduces the total supply, making the remaining tokens more valuable by increasing scarcity.
4. create block reward to distribute new supply to miners - blockReward , _beforeTokenTransfer , _minMinerReward [Done]

 * flattened the smart contract on Remix IDE
 * verified the smart contract through command : npx harhat ignition verify chain-11155111

