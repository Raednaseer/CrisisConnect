// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import IncidentReport from './IncidentReport';

function App() {
    const [auth, setAuth] = useState(null);

    const ProtectedRoute = ({ children }) => {
        return auth ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/incident-report" element={
                    <ProtectedRoute>
                        <IncidentReport />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
