const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("NebulaToken" , (m) => {
    const tokenArgs = [10000000 , 50];
    const token = m.contract("NebulaToken" , tokenArgs);
    console.log("NebulaToken deployed successfully !!");
    return {token};
})

module.exports = TokenModule;