import { useEffect, useState } from "react";
import { CountryExtendedInfo } from "../../interfaces/CountryExtendedInfo";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import './Country.css';
import Loader from "../../components/loader/Loader";
import { useNavigate } from 'react-router-dom';

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

  if (apiError) return <p>{apiError}</p>
  else if (isLoading) return <Loader />
  else return (
    <Container>
      <Row>
        <Col sm={2} xs={4}>
          <Button onClick={() => navigate('/')} className='back-btn'><i className="fa-solid fa-arrow-left back-btn-icon"></i>Back</Button>
        </Col>
      </Row>
    </Container>
  )
};

export default Country;