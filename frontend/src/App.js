import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ProtectedRoute from './loginProtecting/protectingRoute';
import FindNearestUsers from './components/FindNearestUsers';
import UserProfile from './components/UserProfile';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Sidebar from './common/sidebar';
import Forgot from './components/Forgot';
import BasicEditor from './components/Plate';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        <Route path="/homepage/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/homepage/nearest-users" element={
          <ProtectedRoute>
            <FindNearestUsers />
          </ProtectedRoute>
        } />

        <Route path="/homepage/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>} />

          <Route path="/homepage/BasicEditor" element={
          <ProtectedRoute>
            <BasicEditor/>
          </ProtectedRoute>} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgotpassword" element={<Forgot/>} />
      </Routes>
    </Router>
  );
};

export default App;
