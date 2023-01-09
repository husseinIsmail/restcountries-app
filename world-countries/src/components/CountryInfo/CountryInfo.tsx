import { CountryExtendedInfo } from "../../interfaces/CountryExtendedInfo";
import { Language } from "../../interfaces/Language";
import { formatPopulation } from "../../utils/formatPopulation";
import BorderCountries from "../../components/BorderCountries/BorderCountries";
import { Row, Col } from "react-bootstrap";
import { formatCurrencies } from "../../utils/formatCurrencies";
import { formatLanguages } from "../../utils/formatLanguages";

interface CountryInfoProps {
  countryInfo: CountryExtendedInfo
}

const CountryInfo = ({ countryInfo }: CountryInfoProps): JSX.Element => {
  return (
    <Row>
      <Col md={5} xs={12}>
        <img src={countryInfo?.flag} alt={`${countryInfo?.name} flag`} className='country-img' />
      </Col>
      <Col md={1} xs={12}>
      </Col>
      <Col md={6} xs={12}>
        <Row>
          <Col md={12} xs={12}>
            <div className='country-name'>{countryInfo?.name}</div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} className='country-info'>
            <div><span className='country-info-meta'>Native Name: </span>{countryInfo.nativeName}</div>
            <div><span className='country-info-meta'>Population: </span>{formatPopulation(countryInfo.population)}</div>
            <div><span className='country-info-meta'>Region: </span>{countryInfo.region}</div>
            <div><span className='country-info-meta'>Sub Region: </span>{countryInfo.subregion}</div>
            <div><span className='country-info-meta'>Capital: </span>{countryInfo.capital}</div>
          </Col>
          <Col md={6} xs={12} className='country-info'>
            <div><span className='country-info-meta'>Top Level Domain: </span>{countryInfo.topLevelDomain}</div>
            <div><span className='country-info-meta'>Currencies: </span>{formatCurrencies(countryInfo.currencies)}</div>
            <div><span className='country-info-meta'>Languages: </span>{formatLanguages(countryInfo.languages)}</div>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <BorderCountries borderCountryCodes={countryInfo.borders} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

export default CountryInfo;