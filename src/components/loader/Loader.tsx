import Spinner from 'react-bootstrap/Spinner';
import './Loader.css';

const Loader = (): JSX.Element => {
  return (
    <div className='loader-container'>
      <Spinner animation="border" role="status" className='loader'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;