import { currencies } from "./currency";
import { users } from "./user";

export async function swap({ userId, fromCurrency, toCurrency, amount }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = users.find((user) => user.id === userId);
  const fromCurrencyBalance = getWallet(user.wallet, fromCurrency)?.amount || -1;
  if (fromCurrencyBalance < amount) {
    throw new Error("Insufficient balance");
  }
  const toCurrencyPrice = await getCurrencyPrice(toCurrency);

  user.wallet = updateUserWallet(
    [...user.wallet],
    fromCurrency,
    toCurrency,
    amount,
    toCurrencyPrice
  );
  return user.wallet;
}

export async function getUser(userId) {
  return users.find((user) => user.id === userId);
}

export async function getCurrencies() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return currencies;
}

function getWallet(wallet, currency) {
  return wallet.find((item) => item.currency === currency);
}

async function getCurrencyPrice(currency) {
  return currencies.find((item) => item.currency === currency).price;
}

// Mutetes the wallet
function updateUserWallet(
  wallet,
  fromCurrency,
  toCurrency,
  amount,
  toCurrencyPrice
) {
  getWallet(wallet, fromCurrency).amount -= amount;
  const to = getWallet(wallet, toCurrency);
  if (!to) {
    wallet.push({ currency: toCurrency, amount: amount * toCurrencyPrice });
  } else {
    to.amount += amount * toCurrencyPrice;
  }
  return wallet;
}
