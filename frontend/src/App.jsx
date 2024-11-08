// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import IncidentReport from './IncidentReport';
import TrackRequest from './TrackRequest';
import Home from './Home';
import Profile from './Profile';
import Contact from './Contact';
import IncidentList from './IncidentList';
import HomePage from './Home2';
import FirstAid from './FirstAid';
import EmergencyPreparedness from './EmergencyPreparedness';
import HospitalLocator from './Hospitals';
import ResponderAssigned from './ResponderAssigned';
import DonatePage from './DonatePage';
import WeatherDetails from './WeatherDetails';

function App() {
    const [auth, setAuth] = useState(null);

    const ProtectedRoute = ({ children }) => {
        return auth ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setAuth={setAuth} />} />
              <Route path="/incident-report" element={
                  <ProtectedRoute>
                      <IncidentReport />
                  </ProtectedRoute>
              } />
              <Route path="/track-request" element={auth ? <TrackRequest /> : <Login setAuth={setAuth} />} />
              <Route path="/profile" element={auth ? <Profile /> : <Login setAuth={setAuth} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/first-aid" element={<FirstAid />} />
              <Route path="/guides" element={<EmergencyPreparedness />} />
              <Route path="/hospitals" element={<HospitalLocator />} />
              <Route path="/responder-assigned" element={<ResponderAssigned />} /> 
              <Route path="/incident-list" element={
                  <ProtectedRoute>
                      <IncidentList />
                  </ProtectedRoute>
              } />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/weather" element={<WeatherDetails/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
