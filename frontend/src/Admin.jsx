import { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Transportation from './Transportation';
import NGO from './NGO';
// Import other components like Incidents, Responders, Users, etc.

function Admin() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  const navItems = [
    { name: 'Dashboard', url: '/' },
    { name: 'Incidents', url: '/incident-admin' },
    { name: 'Responders', url: '/responders' },
    { name: 'NGO', url: '/ngo' },
    { name: 'Transportation', url: '/transportation' },
    { name: 'Users', url: '/users' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#11003A]">
      {/* Sidebar */}
      <div className="flex flex-col items-start bg-[#11003A] p-4 w-52">
        <img className="w-48 h-48 mb-6" src="./images/logo.png" alt="logo" />
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`w-full text-white font-bold py-2 px-4 mb-2 rounded-lg cursor-pointer 
              ${activeNav === item.name ? 'bg-[#c13cff]' : 'bg-transparent'}`}
            onClick={() => handleNavClick(item.name)}
          >
            <Link to={item.url} className="block text-white no-underline">{item.name}</Link>
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-white rounded-lg overflow-hidden p-6">
        <Routes>
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/ngo" element={<NGO />} />
          {/* Define other routes here for Incidents, Responders, Users, etc. */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
