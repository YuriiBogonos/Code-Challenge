import React, { useEffect, useRef, useState } from "react";

const CurrencyItem = ({ currency, handleClick, selected }) => {
  return (
    <li
      className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-secondary-bg hover:text-white ${
        selected ? "text-white" : "text-gray-900"
      }`}
      onClick={() => handleClick(currency)}
    >
      <div className="flex items-center">
        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/b57bfe958afec7a3bd64f43f1fc3317225388050/tokens/${currency}.svg`}
          alt={currency}
          className="h-5 w-5 flex-shrink-0 rounded-full"
        />
        <span className="ml-3 block truncate">{currency}</span>
      </div>
    </li>
  );
};

const CurrencySelect = ({ selectedCurrency, handleCurrency, currencies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);

  const handleSelect = (currency) => {
    handleCurrency({ target: { value: currency } });
    setIsOpen(false);
  };

  return (
    <div className="relative mt-2 min-h-14 ">
      <button
        className="min-h-14 relative w-full cursor-default rounded-full bg-button-bg/90 hover:bg-button-bg py-1.5 pl-3 pr-10 text-left text-white shadow-sm outline-none sm:text-sm sm:leading-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <img
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/b57bfe958afec7a3bd64f43f1fc3317225388050/tokens/${selectedCurrency}.svg`}
            alt={selectedCurrency}
            className="h-5 w-5 flex-shrink-0 rounded-full"
          />
          <span className="ml-3 block truncate">{selectedCurrency}</span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ArrowSvg />
        </span>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          className="scrollable absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-button-bg py-1 text-base shadow-lg outline-none sm:text-sm"
        >
          {currencies.map((currency) => (
            <CurrencyItem
              key={currency}
              currency={currency}
              handleClick={handleSelect}
              selected={currency === selectedCurrency}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const ArrowSvg = () => (
  <svg
    className="h-5 w-5 text-white"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export default CurrencySelect;
