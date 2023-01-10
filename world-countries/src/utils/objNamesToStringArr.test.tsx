import { objArrNamesToString } from "./objArrNamesToString";

describe('Given an array of Objects with name property', () => {
  const currencies = [
    {
      code: 'USD',
      name: 'United States Dollar',
      symbol: '$'
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€'
    }
  ];

  it('Formats the Object array names as a comma separated string', () => {
    const formattedCurrencies = objArrNamesToString(currencies);
    const expectedFormattedCurrencies = 'United States Dollar, Euro';
    expect(formattedCurrencies).toEqual(expectedFormattedCurrencies);
  });
});

describe('Given an array of one object with name property', () => {
  const currencies = [
    {
      code: 'USD',
      name: 'United States Dollar',
      symbol: '$'
    }
  ];

  it('Returns the only Object name as string with no commas', () => {
    const formattedCurrencies = objArrNamesToString(currencies);
    const expectedFormattedCurrencies = 'United States Dollar';
    expect(formattedCurrencies).toEqual(expectedFormattedCurrencies);
  });

  describe('Given an empty array', () => {
    it('Returns an empty string', () => {
      const formattedCurrencies = objArrNamesToString([]);
      const expectedFormattedCurrencies = '';
      expect(formattedCurrencies).toEqual(expectedFormattedCurrencies);
    });
  });
});