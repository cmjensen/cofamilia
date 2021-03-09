import routes from './routes'
import Header from './components/Header'
import './styles/App.css'
import './reset.css'

function App() {
  return ( <div className="App">
      <Header />
      { routes }
    </div>
  );
}

export default App;

