export function filterByPriority(balance: WalletBalance) {
  const balancePriority = getPriority(balance.blockchain);
  return balancePriority > -99 && balance.amount <= 0;
}

export function sortByPriority(lhs: WalletBalance, rhs: WalletBalance) {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  return leftPriority - rightPriority;
}
function getPriority(blockchain: any): number {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
}
