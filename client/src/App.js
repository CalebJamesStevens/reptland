import {useEffect, useMemo, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Imported CSS
import './App.css';

//Imported Contexts
import { UserContext } from './contexts/UserContext';

//Imported Compontents
import Home from './components/home-page/home';
import SignIn from './components/users/sign-in';
import ViewPost from './components/posts/view-post';
import NewPost from './components/posts/new-post';
import Community from './components/communities/Community';
import CreateCommunity from './components/communities/CreateCommunity';
import UserProfile from './components/users/user-profile';
import NavBar from './components/header/navbar';
import FollowedUsers from './components/home-page/followed-users';
import SignUp from './components/users/sign-up';

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
      
      <Router>
        <div className="App">
          
          <NavBar/>

          <Routes>
            {/*Home routs*/}
            <Route path="/home" element={<Home />}/>
            <Route path="/home/followed-users" element={<FollowedUsers />}/>
            
            {/*User Routes*/}
            <Route path="/users/sign-in" element={<SignIn />}/>
            <Route path="/users/sign-up" element={<SignUp />}/>
            <Route path="/users/:username/profile" element={<UserProfile />}/>
            
            {/*Post Routes*/}
            <Route path="/posts/new-post" element={<NewPost />}/>
            <Route path="/posts/view-post/:postID" element={<ViewPost />}/>
          
            {/*Community Routes*/}
            <Route path="/communities/new-community" element={<CreateCommunity />}/>
            <Route path="/communities/view/:communityName" element={<Community />}/>

          </Routes>
        </div>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
