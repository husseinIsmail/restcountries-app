import { useEffect, useState } from "react";
import { CountryExtendedInfo } from "../../interfaces/CountryExtendedInfo";
import { useParams } from "react-router-dom";

const Country = (): JSX.Element => {

  const [countryInfo, setCountryInfo] = useState<CountryExtendedInfo | {}>({});
  const { countryName } = useParams();

  useEffect(() => {
    const fetchCountryInfo = async () => {
      const fetchedCountryInfo = await fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,nativeName,region,subregion,capital,topLevelDomain,currencies,languages,borders`);
      setCountryInfo(await fetchedCountryInfo.json());
    };

    fetchCountryInfo();
  }, [countryName]);

  return (
    <h1>{JSON.stringify(countryInfo)}</h1>
  );
};

export default Country;