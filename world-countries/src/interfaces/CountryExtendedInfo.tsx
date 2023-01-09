import { Currency } from "./Currency";
import { Language } from "./Language";

export interface CountryExtendedInfo {
  name: string,
  nativeName: string,
  population: number,
  region: string,
  subregion: string,
  capital: string,
  topLevelDomain: string,
  currencies: Currency[],
  languages: Language[],
  borders: string[],
  flag: string
};
