// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import IncidentReport from './IncidentReport';
import TrackRequest from './TrackRequest';
import Profile from './Profile';
import Contact from './Contact';
import IncidentList from './IncidentList';
import HomePage from './Home2';
import HospitalLocator from './Hospitals';
import ResponderAssigned from './ResponderAssigned';
import DonatePage from './DonatePage';
import WeatherDetails from './WeatherDetails';
import Transportation from './Transportation';
import NGO from './NGO';
import Admin from './Admin';
import PublicIncidentReport from './PublicIncidentReport';
import NgoPublic from './NGOPublic';
import IncidentAdmin from './IncidentAdmin';
import FaqGuide from './FaqGuide';
import Dashboard from './Dashboard';
import Wellness from './Wellness';

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
              <Route path="/incident-report" element={<IncidentReport />} />
              <Route path="/track-request" element={auth ? <TrackRequest /> : <Login setAuth={setAuth} />} />
              <Route path="/profile" element={auth ? <Profile /> : <Login setAuth={setAuth} />} />
              <Route path="/emergency" element={<Contact />} />
              <Route path="/hospitals" element={<HospitalLocator />} />
              <Route path="/responder-assigned" element={<ResponderAssigned />} /> 
              <Route path="/incident-list" element={
                  <ProtectedRoute>
                      <IncidentList />
                  </ProtectedRoute>
              } />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/weather" element={<WeatherDetails/>}></Route>
              <Route path="/transportation" element={<Transportation/>}></Route>
              <Route path="/ngo" element={<NGO/>}></Route>
              <Route path="/admin" element={<Admin/>}></Route>
              <Route path="/public-incident-report" element={<PublicIncidentReport />} />
              <Route path="/ngo-public" element={<NgoPublic />} />
              <Route path="/incident-admin" element={<IncidentAdmin />} />
              <Route path="/faq-guide" element={<FaqGuide />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wellness" element={<Wellness />} />
            </Routes>
        </Router>
    );
}

export default App;
