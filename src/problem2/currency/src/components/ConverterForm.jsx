import { useCallback, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import CurrencySelect from "./CurrencySelect";
import { useCurrency } from "../contexts/CurrencyContext";

const ConverterForm = ({ user, currencies, from, initialAmount, ...rest }) => {
  const { swap } = useCurrency();
  const [amount, setAmount] = useState(initialAmount || 0);
  const [fromCurrency, setFromCurrency] = useState(from || "USD");
  const [toCurrency, setToCurrency] = useState(from || "USD");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSwapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      await swap({ fromCurrency, toCurrency, amount: +amount });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    return false;
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="relative flex flex-col gap-1 mb-12">
        <div className="p-5 pt-3 bg-[#378ca1] grid grid-cols-2 gap-4 rounded-lg">
          <CurrencySelect
            currencies={currencies.map((currency) => currency.currency)}
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
          <span></span>
          <CurrencyInput
            className="outline-none min-h-14  text-2xl text-white font-medium bg-transparent border-white"
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(value) => {
              console.log(value);
              setAmount(value);
            }}
          />
          <p className="text-white text-end">
            Balance: {getUserBalance(user.wallet, fromCurrency)}
          </p>
        </div>

        <div
          className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 h-10 w-10 cursor-pointer flex items-center justify-center rounded-full bg-white/[.1] border border-white/[.5] transition duration-200 ease"
          onClick={handleSwapCurrencies}
        >
          <svg
            height="16"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

        <div className="p-5 pt-3 bg-[#378ca1] grid grid-cols-2 gap-4 rounded-lg">
          <CurrencySelect
            currencies={currencies.map((currency) => currency.currency)}
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
          <span></span>
          <CurrencyInput
            className="outline-none min-h-14  text-2xl text-white font-medium bg-transparent border-transparent"
            placeholder="Please enter a number"
            defaultValue={0}
            value={(
              amount *
              currencies.find((item) => item.currency === toCurrency).price
            ).toFixed(4)}
            decimalsLimit={2}
            disabled
          />
          <p className="text-white text-end">
            Balance: {getUserBalance(user.wallet, toCurrency)}
          </p>
        </div>

        {(amount === undefined ||
          amount > getUserBalance(user.wallet, fromCurrency)) && (
          <p className="text-xl font-semibold text-red-500 absolute bottom-0 translate-y-full pt-2">
            {amount === undefined
              ? "Please enter a valid amount"
              : "Insufficient balance"}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`w-full min-h-14 rounded-lg border-none outline-none text-white text-lg font-semibold cursor-pointer bg-[#074e6e] transition duration-200 ease
         disabled:bg-[#074d6ec0] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#074e6e]
        `}
        disabled={
          isLoading ||
          !(+amount) ||
          amount > getUserBalance(user.wallet, fromCurrency)
        }
      >
        {isLoading ? "Loading..." : "Swap"}
      </button>
    </form>
  );
};

export default ConverterForm;

const getUserBalance = (wallet, currency) =>
  wallet.find((item) => item.currency === currency)?.amount || 0;

