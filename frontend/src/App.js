import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import FindNearestUsers from './components/FindNearestUsers';
import Homepage from './components/Homepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/homepage" element={<Homepage />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="nearest-users" element={<FindNearestUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
