import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import HomePage from '../Home/Home';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

const Layout = () => {
  const isPublic = window.location.href.includes ('login');
  const isPublics = window.location.href.includes ('signup');

  return (
    <div>
      <Router>
        {!isPublic & !isPublics ? <Navbar /> : null}
        <Switch>
          <Route exact path="/dashboard" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </div> 
  );
};

export default Layout;
