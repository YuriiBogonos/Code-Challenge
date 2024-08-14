import React from "react";
import CurrencySwap from "./components/CurrencySwap";
import "./App.css";
import { CurrencyProvider } from "./contexts/CurrencyContext";

export default function App() {
  const userId = "1";
  return (
    <CurrencyProvider userId={userId}>
      <CurrencySwap />
    </CurrencyProvider>
  );
}
