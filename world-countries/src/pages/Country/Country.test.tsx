import { render, screen, waitFor } from '@testing-library/react';
import { fakeCountry } from '../../testing-helpers/fakeCountry';
import Country from './Country';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { formatPopulation } from '../../utils/formatPopulation';
import { fakeBorderCountry } from '../../testing-helpers/fakeBorderCountry';
import { formatCurrencies } from '../../utils/formatCurrencies';
import { formatLanguages } from '../../utils/formatLanguages';

describe('Home page', () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(fakeCountry)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(fakeBorderCountry)
      }));
  });

  describe('Renders country info', () => {
    it("Renders country's flag image", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);

      await waitFor(() => {
        expect(screen.getByRole('img')).toHaveAttribute('src', fakeCountry[0].flag);
      });
    });

    it("Renders country's name", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);

      await waitFor(() => {
        expect(screen.getByText(fakeCountry[0].name)).toBeInTheDocument();
      });
    });

    it("Renders country's native name", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);

      await waitFor(() => {
        expect(screen.getByText(fakeCountry[0].nativeName)).toBeInTheDocument();
      });
    });

    it("Renders country's population", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);

      await waitFor(() => {
        expect(screen.getByText(formatPopulation(fakeCountry[0].population))).toBeInTheDocument();
      });
    });

    it("Renders country's region", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);

      await waitFor(() => {
        expect(screen.getByText(fakeCountry[0].region)).toBeInTheDocument();
      });
    });

    it("Renders country's sub region", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);

      await waitFor(() => {
        expect(screen.getByText(fakeCountry[0].subregion)).toBeInTheDocument();
      });
    });

    it("Renders country's capital", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);
      await waitFor(() => {
        expect(screen.getByText(fakeCountry[0].capital)).toBeInTheDocument();
      });
    });

    it("Renders country's top level domain", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);
      await waitFor(() => {
        expect(screen.getByText(fakeCountry[0].topLevelDomain[0])).toBeInTheDocument();
      });
    });

    it("Renders country's currencies", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);
      await waitFor(() => {
        expect(screen.getByText(formatCurrencies(fakeCountry[0].currencies))).toBeInTheDocument();
      });
    });

    it("Renders country's languages", async () => {
      render(<BrowserRouter><Country /></BrowserRouter>);
      await waitFor(() => {
        expect(screen.getByText(formatLanguages(fakeCountry[0].languages))).toBeInTheDocument();
      });
    });
  });

  it('Renders back button', async () => {
    render(<BrowserRouter><Country /></BrowserRouter>);
    const user = userEvent.setup();
    await user.click(await screen.findByText('Back'));

    await waitFor(() => {
      expect(global.window.location.pathname).toBe('/');
    });
  });

  it('Renders navigatable border country buttons', async () => {
    render(<BrowserRouter><Country /></BrowserRouter>);
    const user = userEvent.setup();
    await user.click(await screen.findByText(fakeBorderCountry.name));

    await waitFor(async () => {
      expect(global.window.location.pathname).toBe(`/country/${fakeBorderCountry.name}`);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});