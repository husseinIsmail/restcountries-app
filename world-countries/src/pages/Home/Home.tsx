import { useEffect, useState } from 'react';
import './Home.css';
import CountryCards from '../../components/CountryCards.tsx/CountryCards';
import { Col, Container, Row } from 'react-bootstrap';
import { CountryBasicInfo } from '../../interfaces/CountryBasicInfo';
import Search from '../../components/Search/Search';

const Home = (): JSX.Element => {

  const [countries, setCountries] = useState<CountryBasicInfo[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<CountryBasicInfo[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v2/all?fields=name,population,region,capital,flag');
      const fetchedCountries = await response.json();
      setCountries(fetchedCountries);
      setFilteredCountries(fetchedCountries);
    };

    fetchCountries();
  }, []);

  const searchCountries = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchQuery = event.currentTarget.value;
    const searchedCountries = countries.filter((country: CountryBasicInfo) => country.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    setSearchInput(searchQuery);
    setFilteredCountries(searchedCountries);
  };

  return (
    <div className='home'>
      <Container>
        <Row className='toolbox'>
          <Col sm={4} xs={12}>
            <Search searchInput={searchInput} onChange={searchCountries} />
          </Col>
        </Row>
        <CountryCards countries={filteredCountries} />
      </Container>
    </div >
  );
};

export default Home;