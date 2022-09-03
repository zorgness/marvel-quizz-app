import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Welcome  from './components/Welcome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ErrorPage from './components/ErrorPage';

import './App.css';

function App() {
  return (
    <div className="App">

     <Header />

     <Welcome />
     <Login />
     <SignUp />
     <ErrorPage />
     <Landing />


     <Footer />

    </div>
  );
}

export default App;
