interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances() || [];
  const prices = usePrices() || {};

  // I kept the logic divided into two parts to improve efficiency and reduce the number of computations during re-renders. For example, if prices change, we won't need to sort everything from scratch. This approach also makes it easier to modify the logic in the future

  const formattedBalances = useMemo(() => {
    return balances
      .filter(filterByPriority)
      .sort(sortByPriority)
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  const rows = useMemo(() => {
    return formattedBalances.map(
      (balance: FormattedWalletBalance, index: number) => (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      )
    );
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};
