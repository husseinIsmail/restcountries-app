import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './BorderCountries.css';

interface BorderCountriesProps {
  borderCountryCodes: string[]
};

const BorderCountries = ({ borderCountryCodes }: BorderCountriesProps): JSX.Element => {
  const navigate = useNavigate();
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all(borderCountryCodes.map(borderCountryCode => fetch(`https://restcountries.com/v2/alpha//${borderCountryCode}?fields=name`)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then((borderCountries) => {
        return borderCountries.map(borderCountry => borderCountry.name);
      })
      .then(
        (borderCountryNames: string[]) => {
          setBorderCountries(borderCountryNames);
        },
        (error) => {
          setApiError(error);
        });
  }, [borderCountryCodes]);

  if (apiError) {
    console.error('Error fetching country borders: ', apiError);
    return <p>*Error fetching country borders*</p>
  } else {
    return (
      <div className='country-border-countries'>
        <span className='country-info-meta border-countries-meta'>Border Countries: </span>
        {borderCountries.map((borderCountry) =>
          <Button key={borderCountry} onClick={() => navigate(`/country/${borderCountry}`)} className='country-btn country-border-btn'>{borderCountry}</Button>
        )}
      </div>
    );
  }
}

export default BorderCountries;
