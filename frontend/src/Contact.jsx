// EmergencyContact.jsx
import React from 'react';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const EmergencyContact = () => {
  const tollFreeNumber = '1800-XYZ-1234';

  const stateControlRooms = [
    { state: 'Andhra Pradesh', number: '0863-2345678' },
    { state: 'Arunachal Pradesh', number: '0360-1234567' },
    { state: 'Assam', number: '0361-6543210' },
    { state: 'Bihar', number: '0612-2345678' },
    { state: 'Chhattisgarh', number: '0771-1234567' },
    { state: 'Goa', number: '0832-1234567' },
    { state: 'Gujarat', number: '079-2345678' },
    { state: 'Haryana', number: '0172-1234567' },
    { state: 'Himachal Pradesh', number: '0177-2345678' },
    { state: 'Jharkhand', number: '0651-2345678' },
    { state: 'Karnataka', number: '080-2345678' },
    { state: 'Kerala', number: '0471-1234567' },
    { state: 'Madhya Pradesh', number: '0755-2345678' },
    { state: 'Maharashtra', number: '022-2345678' },
    { state: 'Manipur', number: '0385-1234567' },
    { state: 'Meghalaya', number: '0364-2345678' },
    { state: 'Mizoram', number: '0389-1234567' },
    { state: 'Nagaland', number: '0370-2345678' },
    { state: 'Odisha', number: '0674-1234567' },
    { state: 'Punjab', number: '0172-2345678' },
    { state: 'Rajasthan', number: '0141-2345678' },
    { state: 'Sikkim', number: '03592-123456' },
    { state: 'Tamil Nadu', number: '044-2345678' },
    { state: 'Telangana', number: '040-1234567' },
    { state: 'Tripura', number: '0381-2345678' },
    { state: 'Uttar Pradesh', number: '0522-1234567' },
    { state: 'Uttarakhand', number: '0135-2345678' },
    { state: 'West Bengal', number: '033-1234567' },
  ];

  return (
    <>
      <HeaderNav />
      <div className="min-h-screen bg-blue-50 flex flex-col lg:flex-row p-8 gap-8">
        
        <div className="lg:w-1/2 space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Report Emergency</h2>
            <p className="text-xl font-bold text-green-700">Toll-Free: {tollFreeNumber}</p>
            <p className="text-gray-600 mt-3">
              For immediate assistance, call the toll-free number. Available 24/7.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Resources</h2>
            <ul className="list-disc list-inside text-blue-800 space-y-2">
              <li>Police Helpline: 100</li>
              <li>Ambulance Services: 102</li>
              <li>Disaster Helpline: 108</li>
              <li>Women’s Helpline: 1091</li>
              <li>Child Helpline: 1098</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Preparedness Tips</h2>
            <ul className="list-disc list-inside text-blue-800 space-y-2">
              <li>Stay calm and assess your surroundings.</li>
              <li>Find a safe location and avoid dangerous areas.</li>
              <li>Keep an emergency kit ready.</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nearby Hospitals & Police Stations</h2>
            <a href="/ngo-public" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Check for neaby Hospitals & Police Stations
              </a>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Volunteer & NGO Support</h2>
            <p className="text-gray-700">
              Help your community during an emergency.{" "}
              <a href="/ngo-public" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Sign up to volunteer
              </a>
            </p>
          </div>

        </div>

        <div className="lg:w-1/2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">State Control Room Numbers</h2>
            <ul className="divide-y divide-gray-300">
              {stateControlRooms.map((room) => (
                <li key={room.state} className="py-2 flex justify-between text-gray-700">
                  <span className="font-medium">{room.state}</span>
                  <span className="font-semibold text-red-700">{room.number}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default EmergencyContact;
