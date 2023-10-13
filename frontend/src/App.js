import Home from './Component/Home';
import Header from './Component/Mains/Header';
import GoogleTokenVerify from './Component/User/Forms/GoogleTokenVerify';
import Login from './Component/User/Login';
import UserRegister from './Component/User/UserRegister';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header />
        <Switch>
          <Route exact path='/'> <Home /></Route>
          <Route exact path='/login'> <Login /></Route>
          <Route exact path='/user/register'><UserRegister/></Route>
          <Route exact path='/google/login/auth/token/:token'><GoogleTokenVerify/></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
