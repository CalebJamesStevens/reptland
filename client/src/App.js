import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Imported CSS
import './App.css';

//Imported Contexts
import { UserContext } from './contexts/UserContext';

//Imported Compontents
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
    <UserContext.Provider value={currentUser}>
      
      <Router>
        <div className="App">
          
          <Routes>
            <Route path="/users/sign-in" element={<SignIn />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
