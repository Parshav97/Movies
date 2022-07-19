import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" render={(props)=>(
            <>
                <Banner {...props} />
                <Movies {...props} />
            </>
  )}>
          </Route>
          <Route exact path="/favourites">
            <Favourite/>
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;