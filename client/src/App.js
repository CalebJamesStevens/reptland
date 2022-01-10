import './App.css';
import Home from './components/home-page/home';
import {useEffect, useState} from 'react';
import SignIn from './components/users/sign-in';

function App() {
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = () => {
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
    <div className="App">
      <h2 className="cU">{currentUser && currentUser.username}</h2>
      <SignIn />
      <Home />
    </div>
  );
}

export default App;
