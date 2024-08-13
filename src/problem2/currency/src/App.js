import ConverterForm from "./components/ConverterForm";
import { currencies } from "./data/currency";
import { user } from "./data/user";

const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="converter-title">Currency Swap</h2>
      <ConverterForm user={user} currencies={currencies} />
    </div>
  );
};

export default App;
