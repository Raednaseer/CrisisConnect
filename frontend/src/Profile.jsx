// Profile.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
        return (
            <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-red-500">No user data found. Please log in.</p>
            </div>
            <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
                <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">User Details</h2>
                    <ul className="mt-4 space-y-2">
                        <li><strong>Username:</strong> {userData.username}</li>
                        <li><strong>Role:</strong> {userData.role}</li>
                        <li><strong>Phone No:</strong> {userData.phone_no}</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
