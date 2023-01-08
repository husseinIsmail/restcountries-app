import { useEffect, useState } from 'react';
import './Home.css';
import CountryCards from '../../components/CountryCards.tsx/CountryCards';
import { Container } from 'react-bootstrap';
import { CountryBasicInfo } from '../../interfaces/CountryBasicInfo';

const Home = (): JSX.Element => {

  const [countries, setCountries] = useState<CountryBasicInfo[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v2/all?fields=name,population,region,capital,flag');
      const fetchedCountries = await response.json();
      setCountries(fetchedCountries);
    };

    fetchCountries();
  }, []);

  return (
    <div className='home'>
      <Container>
        <CountryCards countries={countries} />
      </Container>
    </div >
  );
};

export default Home;