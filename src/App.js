import routes from './routes'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles/App.css'
import './reset.css'

function App() {
  return ( <div className="App">
      <Header />
      { routes }
      <Footer />
    </div>
  );
}

export default App;

