// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [role, setRole] = useState('victim');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/users/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, phone_no: phoneNo, role })
        });
        if (response.ok) {
            alert('Registration successful! You can now log in.');
            setUsername('')
            setPassword('')
            setPhoneNo('')
            navigate('/incident-report');
        } else {
            alert('Error during registration.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-semibold mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6">
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
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Phone No"
                        onChange={e => setPhoneNo(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <select
                        onChange={e => setRole(e.target.value)}
                        value={role}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="victim">Victim</option>
                        <option value="responder">Responder</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    );
    
}

export default Register;
