import { useEffect, useState } from "react";
import { CountryExtendedInfo } from "../../interfaces/CountryExtendedInfo";
import { useParams } from "react-router-dom";
import './Country.css';

const Country = (): JSX.Element => {
  const [countryInfo, setCountryInfo] = useState<CountryExtendedInfo | null>(null);
  const { countryName } = useParams();
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v2/name/${countryName}?fulltext=true,fields=name,nativeName,region,subregion,capital,topLevelDomain,currencies,languages,borders,flag`)
      .then(res => res.json())
      .then(
        (fetchedCountryInfo) => {
          if (fetchedCountryInfo[0].name) {
            setCountryInfo(fetchedCountryInfo[0]);
          } else {
            console.error('Error fetching country info from restcountries API: ', fetchedCountryInfo);
            setApiError('*Error fetching country info, please double check the name in the URL*');
          }
        },
        (error) => {
          setApiError(error);
        });
  }, [countryName]);

  if (apiError) return <p>{apiError}</p>
  else return (
    <p>{JSON.stringify(countryInfo)}</p>
  )
};

export default Country;