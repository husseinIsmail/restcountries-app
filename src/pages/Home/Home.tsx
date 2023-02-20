import { useEffect, useState } from 'react';
import './Home.css';
import CountryCards from '../../components/CountryCards.tsx/CountryCards';
import { Col, Container, Row } from 'react-bootstrap';
import { CountryBasicInfo } from '../../interfaces/CountryBasicInfo';
import Search from '../../components/Search/Search';
import RegionFilter from '../../components/RegionFilter/RegionFilter';
import SortButton from '../../components/SortButton/SortButton';
import Loader from '../../components/loader/Loader';

const Home = (): JSX.Element => {

  const [countries, setCountries] = useState<CountryBasicInfo[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<CountryBasicInfo[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,population,region,capital,flag')
      .then(res => res.json())
      .then(
        (fetchedCountries) => {
          if (fetchedCountries[0]?.name) {
            setCountries(fetchedCountries);
            setFilteredCountries(fetchedCountries);
          } else {
            console.error('Error fetching countries info from restcountries API: ', fetchedCountries);
            setApiError('*Error fetching country info, please double check the name in the URL*');
          }
          setIsLoading(false);
        },
        (error) => {
          setApiError(error);
          setIsLoading(false);
        });
  }, []);

  const searchCountries = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchQuery = event.currentTarget.value;
    const searchedCountries = countries.filter((country: CountryBasicInfo) => country.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    setSearchInput(searchQuery);
    setFilteredCountries(searchedCountries);
  };

  const filterByRegion = (region: string): void => {
    if (region === 'All') setFilteredCountries(countries);
    else setFilteredCountries(countries.filter((country: CountryBasicInfo) => country.region === region));
  }
  
  const sortByPopulation = (): void => {
    const sortedCountries = [...filteredCountries].sort((a: CountryBasicInfo, b: CountryBasicInfo) => b.population - a.population)
    setFilteredCountries(sortedCountries);
  }

  if (isLoading) return <Loader />
  else if (filteredCountries.length) return (
    <div className='home'>
      <Container>
        <Row className='toolbox'>
          <Col md={4} xs={12}>
            <Search searchInput={searchInput} onChange={searchCountries} />
          </Col>
          <Col md={7} xs={5}>
            <RegionFilter onSelectRegion={filterByRegion} />
          </Col>
          <Col md={1} xs={7}>
            <SortButton onClick={sortByPopulation} />
          </Col>
        </Row>
        <CountryCards countries={filteredCountries} />
      </Container>
    </div >
  );
  else return <p>{apiError}</p>;
};

export default Home;