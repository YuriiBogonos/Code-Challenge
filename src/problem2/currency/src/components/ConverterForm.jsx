import { useCallback, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = ({ user, currencies, from, initialAmount, ...rest }) => {
  const [amount, setAmount] = useState(initialAmount || 0);
  const [fromCurrency, setFromCurrency] = useState(from || "USD");
  const [toCurrency, setToCurrency] = useState(from || "USD");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const handleFormSubmit = useCallback((e) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    e.preventDefault();
  }, []);

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <div className="form-section">
          <CurrencySelect
            currencies={currencies.map((currency) => currency.currency)}
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
          <CurrencyInput
            className="form-input"
            placeholder="Please enter a number"
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(value, name, values) => setAmount(value || 0)}
          />
          <p>
            Balance:
            {getUserBalance(user.wallet, fromCurrency)}
          </p>
        </div>

        <div className="swap-icon" onClick={handleSwapCurrencies}>
          <svg
            width="16"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

        <div className="form-section">
          <CurrencySelect
            currencies={currencies.map((currency) => currency.currency)}
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
          <CurrencyInput
            className="form-input"
            placeholder="Please enter a number"
            defaultValue={0}
            value={
              amount *
              currencies.find((item) => item.currency === toCurrency).price
            }
            decimalsLimit={2}
            disabled
          />
          <p>
            Balance:
            {getUserBalance(user.wallet, toCurrency)}
          </p>
        </div>

        {amount < getUserBalance(user.wallet, fromCurrency) && (
          <p className="error-message">Insufficient balance</p>
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        style={{ "--is-loading": isLoading }}
        disabled={
          isLoading || amount < getUserBalance(user.wallet, fromCurrency)
        }
      >
        Swap
      </button>
    </form>
  );
};

export default ConverterForm;

const getUserBalance = (wallet, currency) =>
  wallet.find((item) => item.currency === currency)?.amount || 0;
