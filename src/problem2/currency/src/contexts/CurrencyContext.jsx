import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getCurrencies, getUser, swap as swapFromBack } from "../mock/backend";

const CurrencyContext = createContext({
  currencies: [],
  user: null,
  isLoading: false,
  error: null,
});

export function CurrencyProvider({ children, userId }) {
  const [currencies, setCurrencies] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [currenciesData, userData] = await Promise.all([
          getCurrencies(),
          getUser(userId),
        ]);
        setCurrencies(currenciesData);
        setUser(userData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const swap = useCallback(
    async ({ fromCurrency, toCurrency, amount }) => {
      const wallet = await swapFromBack({
        userId: user.id,
        fromCurrency,
        toCurrency,
        amount,
      });
      setUser({ ...user, wallet });
    },
    [user]
  );

  return (
    <CurrencyContext.Provider
      value={{ currencies, user, isLoading, error, swap }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
