import React, { useState, useEffect } from 'react';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const Wellness = () => {
  const [motivationalThought, setMotivationalThought] = useState('');
  const [error, setError] = useState(null);

  // Fetch motivational quotes
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/quotes/');
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        setMotivationalThought(randomQuote.q);
      } catch (err) {
        console.error('Error fetching quote:', err);
        setError('Could not fetch a motivational quote.');
      }
    };
    fetchQuote();
  }, []);

  return (
    <>
    <HeaderNav />
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Mental Wellness & Support</h1>

      {/* Layout Grid */}
      <div className="grid gap-8 max-w-5xl w-full sm:grid-cols-1 md:grid-cols-2">

        {/* Motivational Thought Section */}
        <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-green-700 mb-4">Motivational Thought</h2>
          <p className="text-gray-800 italic">
            {motivationalThought || "The mind is like water. When it’s turbulent, it’s difficult to see. When it’s calm, everything becomes clear. – Prasad Mahesh"}
          </p>
        </div>

        {/* Professional Help Section */}
        <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Talk to a Therapist?</h2>
          <p className="text-gray-700 mb-4">
            Sometimes, talking to a professional can make a difference. If you're struggling, don't hesitate to reach out for help.
          </p>
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={() => window.open('https://buddyhelp.org/')}
          >
            Find a Therapist
          </button>
        </div>

        {/* Self-Help Resources Section */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Additional Resources</h2>
          <ul className="list-disc list-inside text-gray-800">
            <li><a href="https://www.mindful.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mindfulness Practices</a></li>
            <li><a href="https://www.nami.org/Home" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">National Alliance on Mental Illness</a></li>
            <li><a href="https://www.mentalhealth.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mental Health Resources</a></li>
          </ul>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Wellness;
