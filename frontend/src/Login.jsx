// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Login({ setAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('user', JSON.stringify(data.user));
            setAuth(data.user);
            navigate('/incident-report');
        } else {
            setError(data.detail || 'Login failed');
        }
    };

    return (
        <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-semibold mb-6">Login</h2>
            <form onSubmit={handleLogin} className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition duration-200"
                >
                    Login
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <Footer />
        </>
    );
    
}

export default Login;
