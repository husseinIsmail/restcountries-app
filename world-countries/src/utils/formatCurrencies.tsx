import { Currency } from "../interfaces/Currency";

export const formatCurrencies = (currencies: Currency[]): string => {
  return currencies.map((currency: Currency) => currency.name).toString();
};
