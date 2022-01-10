import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Home from './components/home-page/home';
import SignIn from './components/users/sign-in';

function App() {
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = () => {
    if (currentUser) return;
    console.log('fetching user data')
    fetch('/users/currentUser')
    .then(res => res.json())
    .then(data => {
        setCurrentUser(data);
     })
  }

  useEffect(() => {
      getCurrentUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <h2 className="cU">{currentUser && currentUser.username}</h2>
        <Routes>
          <Route path="/users/sign-in" element={<SignIn />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
