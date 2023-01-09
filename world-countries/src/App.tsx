import './App.css';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Country from './pages/Country/Country';
import NoMatch from './pages/NoMatch/NoMatch';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header-title">Where in the world?</span>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/country/:countryName' element={<Country />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
