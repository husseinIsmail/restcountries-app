import { render, screen, waitFor } from '@testing-library/react';
import { fakeCountries } from '../../testing-helpers/fakeCountries';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
    await user.type(await screen.findByPlaceholderText('Search for a country...'), 'B');

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
    await user.click(await screen.findByText('Filter by Region'));
    await user.click(await screen.findByText('Americas', { selector: 'a' }));

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
    await user.click(await screen.findByText('Sort by Population'));

    await waitFor(() => {
      expect(screen.getAllByText('Population:')).toHaveLength(fakeCountries.length);
    });

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.queryAllByText('Population:')[0].parentElement?.textContent).toEqual(`Population: ${(212559409).toLocaleString('en-US')}`);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});