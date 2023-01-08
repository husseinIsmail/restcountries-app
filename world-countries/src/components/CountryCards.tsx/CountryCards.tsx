import { CountryBasicInfo } from '../../interfaces/CountryBasicInfo';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './CountryCards.css';

interface CountryCardsProps {
  countries: CountryBasicInfo[] | [];
};

const CountryCards = ({ countries }: CountryCardsProps): JSX.Element => {

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(population);
  };

  return (
    <Row sm={4} xs={1} className="g-5">
      {countries.map((country) => (
        <Col key={country.name}>
          <Card className='country-card'>
            <Card.Img variant="top" src={country.flag} />
            <Card.Body>
              <Card.Title className='country-card-title'>{country.name}</Card.Title>
              <Card.Text className='country-card-info'>
                <p className='country-card-info-item'><span className='country-card-info-meta'>Population:</span> {formatPopulation(country.population)}</p>
                <p className='country-card-info-item'><span className='country-card-info-meta'>Region:</span> {country.region}</p>
                <p className='country-card-info-item'><span className='country-card-info-meta'>Capital:</span> {country.capital}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CountryCards;