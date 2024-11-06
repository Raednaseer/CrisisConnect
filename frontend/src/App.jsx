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

function App() {
    const [auth, setAuth] = useState(null);

    const ProtectedRoute = ({ children }) => {
        return auth ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
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
            </Routes>
        </Router>
    );
}

export default App;
