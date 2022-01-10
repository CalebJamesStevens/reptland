import {useEffect, useMemo, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Imported CSS
import './App.css';

//Imported Contexts
import { UserContext } from './contexts/UserContext';

//Imported Compontents
import Home from './components/home-page/home';
import SignIn from './components/users/sign-in';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const userProviderValue = useMemo(
    () => ({currentUser, setCurrentUser}), [currentUser, setCurrentUser]
    );

  const getCurrentUser = () => {
    console.log('fetching user data')
    fetch('/users/currentUser')
    .then(res => res.json())
    .then(data => {
      setCurrentUser(data);
    })
  }
  
  useEffect(() => {
      if (currentUser != null) return;
      getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={userProviderValue}>
    
      <nav>
        <a href='/users/sign-in'>
          <li>Sign In</li>
        </a>
      </nav>
      <Router>
        <div className="App">
          
          <Routes>
            <Route path="/users/sign-in" element={<SignIn />}/>
            <Route path="/users/sign-in" element={<SignIn />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
