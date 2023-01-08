import { render, screen } from '@testing-library/react';
import { fakeCountries } from '../../testing-helpers/fakeCountries';
import CountryCards from './CountryCards';
import { BrowserRouter } from 'react-router-dom';
import { formatPopulation } from '../../utils/formatPopulation';

describe('CountryCards component', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(
        () => Promise.resolve({
          json: () => Promise.resolve(fakeCountries)
        }),
      ) as jest.Mock);
  });

  it('Renders all country cards', async () => {
    render(<BrowserRouter><CountryCards countries={fakeCountries} /></BrowserRouter>);

    expect(screen.queryAllByText('Population:')).toHaveLength(fakeCountries.length);
  });


  describe('Renders a country card with all info', () => {
    it("Renders country's flag image", async () => {
      render(<BrowserRouter> <CountryCards countries={fakeCountries} /></BrowserRouter >);

      const countryCardImgs = screen.queryAllByRole('img');

      expect(countryCardImgs).toHaveLength(3);
      expect(countryCardImgs[0]).toHaveAttribute('src', fakeCountries[0].flag);
      expect(countryCardImgs[countryCardImgs.length - 1]).toHaveAttribute('src', fakeCountries[fakeCountries.length - 1].flag);
    });

    it("Renders country's name", async () => {
      render(<BrowserRouter> <CountryCards countries={fakeCountries} /></BrowserRouter >);

      const firstCountryCardName = screen.queryByText(fakeCountries[0].name);
      const lastCountryCardName = screen.queryByText(fakeCountries[fakeCountries.length - 1].name);

      expect(firstCountryCardName).toBeTruthy();
      expect(lastCountryCardName).toBeTruthy();
    });

    it("Renders country's population", async () => {
      render(<BrowserRouter> <CountryCards countries={fakeCountries} /></BrowserRouter >);

      const firstCountryPopulation = screen.queryByText(formatPopulation(fakeCountries[0].population));
      const lastCountryPopulation = screen.queryByText(formatPopulation(fakeCountries[fakeCountries.length - 1].population));

      expect(firstCountryPopulation).toBeTruthy();
      expect(lastCountryPopulation).toBeTruthy();
    });

    it("Renders country's region", async () => {
      render(<BrowserRouter><CountryCards countries={fakeCountries} /></BrowserRouter >);

      const firstCountryPopulation = screen.queryByText(fakeCountries[0].region);
      const lastCountryPopulation = screen.queryByText(fakeCountries[fakeCountries.length - 1].region);

      expect(firstCountryPopulation).toBeTruthy();
      expect(lastCountryPopulation).toBeTruthy();
    });

    it("Renders country's capital", async () => {
      render(<BrowserRouter><CountryCards countries={fakeCountries} /></BrowserRouter >);

      const firstCountryPopulation = screen.queryByText(fakeCountries[0].capital);
      const lastCountryPopulation = screen.queryByText(fakeCountries[fakeCountries.length - 1].capital);

      expect(firstCountryPopulation).toBeTruthy();
      expect(lastCountryPopulation).toBeTruthy();
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});