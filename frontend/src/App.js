import Home from './Component/Home';
import Header from './Component/Mains/Header';
import Login from './Component/User/Login';
import './styles/App.scss';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>

        <Header/>
        <Switch>
         <Route exact path='/'> <Home/></Route> 
         <Route exact path='/login'> <Login/></Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;
