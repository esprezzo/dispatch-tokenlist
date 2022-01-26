const { version } = require("../package.json");

const ethereum = require("./tokens/ethereum.tokenlist.json");
const binance = require("./tokens/binance.tokenlist.json");
const avalanche = require("./tokens/avalanche.tokenlist.json");
const harmony = require("./tokens/harmony.tokenlist.json");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "Dispatch Token List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "https://s3-us-west-1.amazonaws.com/tokens.mochiswap.io/images/esprezzo-logo-sm.png",
    keywords: ["esprezzo", "dispatch", "default"],
    tokens: [...ethereum, ...binance, ...avalanche, ...harmony] // add more if needed
    .sort((t1, t2) => {
      if (t1.chainId === t2.chainId) {
        return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
      }
      return t1.chainId < t2.chainId ? -1 : 1;
    }),
  };
};
