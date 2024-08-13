const CurrencySelect = ({ selectedCurrency, handleCurrency, currencies }) => {
  return (
    <div className="currency-select">
      <select
        onChange={handleCurrency}
        className="currency-dropdown"
        value={selectedCurrency}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
