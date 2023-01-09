import { useEffect, useState } from "react";
import { CountryExtendedInfo } from "../../interfaces/CountryExtendedInfo";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import './Country.css';
import Loader from "../../components/loader/Loader";
import { useNavigate } from 'react-router-dom';
import { formatPopulation } from "../../utils/formatPopulation";
import { Currency } from "../../interfaces/Currency";
import { Language } from "../../interfaces/Language";
import BorderCountries from "../../components/BorderCountries/BorderCountries";

const Country = (): JSX.Element => {
  const [countryInfo, setCountryInfo] = useState<CountryExtendedInfo | null>(null);
  const { countryName } = useParams();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v2/name/${countryName}?fulltext=true,fields=name,nativeName,region,subregion,capital,topLevelDomain,currencies,languages,borders,flag`)
      .then(res => res.json())
      .then(
        (fetchedCountryInfo) => {
          if (fetchedCountryInfo[0].name) {
            if (!fetchedCountryInfo[0].borders) fetchedCountryInfo[0].borders = [];
            setCountryInfo(fetchedCountryInfo[0]);
          } else {
            console.error('Error fetching country info from restcountries API: ', fetchedCountryInfo);
            setApiError('*Error fetching country info, please double check the name in the URL*');
          }
          setIsLoading(false);
        },
        (error) => {
          setApiError(error);
          setIsLoading(false);
        });
  }, [countryName]);

  const formatCurrencies = (currencies: Currency[]): string => {
    return currencies.map((currency: Currency) => currency.name).toString();
  };

  const formatLanguages = (languages: Language[]): string => {
    return languages.map((language: Language, idx) => {
      return idx > 0 ? ` ${language.name}` : `${language.name}`;
    }).toString();
  }

  if (isLoading) return <Loader />;
  else if (countryInfo) return (
    <Container>
      <Row>
        <Col sm={2} xs={4}>
          <Button onClick={() => navigate('/')} className='country-btn'><i className="fa-solid fa-arrow-left back-btn-icon"></i>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col sm={5} xs={12}>
          <img src={countryInfo?.flag} alt={`${countryInfo?.name} flag`} className='country-img' />
        </Col>
        <Col sm={1} xs={12}>
        </Col>
        <Col sm={6} xs={12}>
          <Row>
            <Col sm={12} xs={12}>
              <div className='country-name'>{countryInfo?.name}</div>
            </Col>
          </Row>
          <Row>
            <Col sm={6} xs={12} className='country-info'>
              <div className=''><span className='country-info-meta'>Native Name: </span>{countryInfo.nativeName}</div>
              <div className=''><span className='country-info-meta'>Population: </span>{formatPopulation(countryInfo.population)}</div>
              <div className=''><span className='country-info-meta'>Region: </span>{countryInfo.region}</div>
              <div className=''><span className='country-info-meta'>Sub Region: </span>{countryInfo.subregion}</div>
              <div className=''><span className='country-info-meta'>Capital: </span>{countryInfo.capital}</div>
            </Col>
            <Col sm={6} xs={12} className='country-info'>
              <div className=''><span className='country-info-meta'>Top Level Domain: </span>{countryInfo.topLevelDomain}</div>
              <div className=''><span className='country-info-meta'>Currencies: </span>{formatCurrencies(countryInfo.currencies)}</div>
              <div className=''><span className='country-info-meta'>Languages: </span>{formatLanguages(countryInfo.languages)}</div>
            </Col>
          </Row>
          <Row>
            <Col sm={12} xs={12}>
              <BorderCountries borderCountryCodes={countryInfo.borders} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
  else return <p>{apiError}</p>;
};

export default Country;