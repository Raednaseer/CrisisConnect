// src/components/Contact.jsx
import React, { useState } from 'react';
import Header  from './Header'
import Footer from './Footer';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [number, setNumber] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic form validation
        if (!name || !email || !message || !number) {
            setError('Please fill out all fields.');
            return;
        }

        // Simulate a message send process
        try {
            // Simulate API call
            setTimeout(() => {
                setSuccess('Your message has been sent successfully. We will get back to you shortly.');
                setName('');
                setEmail('');
                setMessage('');
                setNumber()
            }, 2000);
        } catch (error) {
            setError('Failed to send message. Please try again later.');
        }
    };

    return (
        <>
        <Header />
        <div className="bg-blue-50 py-16 px-8 text-white">
            <div className="container mx-auto text-center max-w-2xl">
                <h2 className="text-3xl font-semibold mb-6 text-black">Need Assistance?</h2>
                <p className="text-xl mb-6 text-black">Reach out to us immediately, and we’ll respond as quickly as possible.</p>
                
                <form onSubmit={handleSubmit} className="bg-white text-gray-800 rounded-lg p-8 shadow-xl">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="number" className="block text-lg font-medium mb-2">Your Phone No.</label>
                        <input
                            type="text"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1234567890"
                            inputMode="numeric"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-lg font-medium mb-2">Your Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Please describe your emergency or request..."
                            rows="4"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Contact;
