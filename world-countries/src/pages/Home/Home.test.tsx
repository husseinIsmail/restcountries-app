import { render, screen, waitFor } from '@testing-library/react';
import { fakeCountries } from '../../testing-helpers/fakeCountries';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { formatPopulation } from '../../utils/formatPopulation';

describe('Home page', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(
        () => Promise.resolve({
          json: () => Promise.resolve(fakeCountries)
        }),
      ) as jest.Mock);
  });

  it('Renders country cards', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);

    expect(await screen.findAllByText('Population:')).toHaveLength(fakeCountries.length);
  });

  it('Shows filtered countries based on search', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Search for a country...'), 'B');

    await waitFor(() => {
      expect(screen.getAllByText('Population:')).toHaveLength(1);
    });

    await waitFor(() => {
      expect(screen.getByText('Brazil')).toBeTruthy();
    });
  });

  it('Shows filtered countries based on region', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    const user = userEvent.setup();
    await user.click(screen.getByText('Filter by Region'));
    await user.click(screen.getByText('Americas', { selector: 'a' }));

    await waitFor(async () => {
      expect(screen.getAllByText('Population:')).toHaveLength(1);
    });

    await waitFor(() => {
      expect(screen.getByText('Brazil')).toBeTruthy();
    });
  });

  it('Sorts the country cards based on population', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    const user = userEvent.setup();
    await user.click(screen.getByText('Sort by Population'));

    await waitFor(() => {
      expect(screen.getAllByAltText('Population:')).toHaveLength(fakeCountries.length);
    });

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.queryAllByText('Population:')[0].previousSibling?.textContent).toEqual(`Population: ${formatPopulation(212559409)}`);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});