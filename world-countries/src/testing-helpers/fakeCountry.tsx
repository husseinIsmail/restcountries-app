import { CountryExtendedInfo } from '../interfaces/CountryExtendedInfo';

export const fakeCountry: CountryExtendedInfo [] = [{
  name: 'Brazil',
  nativeName: 'Brasil',
  topLevelDomain: [
    '.br'
  ],
  capital: 'Brasília',
  subregion: 'South America',
  region: 'Americas',
  population: 212559409,
  borders: [
    'FRA'
  ],
  currencies: [
    {
      'code': 'BRL',
      'name': 'Brazilian real',
      'symbol': 'R$'
    }
  ],
  languages: [
    {
      'iso639_1': 'pt',
      'iso639_2': 'por',
      'name': 'Portuguese',
      'nativeName': 'Português'
    }
  ],
  flag: 'https://flagcdn.com/br.svg'
}];
