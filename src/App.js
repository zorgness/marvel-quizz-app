import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Welcome  from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ErrorPage from './components/ErrorPage';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (


      <Router>
        <Header />

        <Switch>

            <Route exact path="/" component={Landing} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route component={ErrorPage} />

        </Switch>


        <Footer />

     </Router>


  );
}

export default App;
