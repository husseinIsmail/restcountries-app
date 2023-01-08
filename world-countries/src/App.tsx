import './App.css';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header-title">Where in the world?</span>
      </header>
      <Home />
    </div>
  );
}

export default App;
