import React from "react";
import { useCurrency } from "../contexts/CurrencyContext";
import ConverterForm from "./ConverterForm";
import { Loader } from "./UI/Loader";
import { Error } from "./UI/Error";

function CurrencySwap() {
  const { currencies, user, isLoading, error } = useCurrency();

  if (isLoading) return <Loader />;

  if (error)
    return <Error className="w-full text-center">Error loading data</Error>;

  return (
    <div className="max-w-lg mx-auto p-10 bg-primary-bg border border-border-color rounded-lg shadow-lg backdrop-blur-lg">
      <h2 className="text-2xl font-semibold text-white text-center mb-8">
        Currency Swap
      </h2>
      <ConverterForm user={user} currencies={currencies} />
    </div>
  );
}

export default CurrencySwap;
