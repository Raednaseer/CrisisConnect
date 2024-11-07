import React from 'react';

const EmergencyPreparedness = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">

            {/* Header Section */}
            <header className="bg-blue-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">Emergency Preparedness</h1>
                </div>
            </header>

            {/* Introduction */}
            <section className="py-16 px-6 bg-teal-100 text-center">
                <h2 className="text-3xl font-semibold mb-4">Prepare Yourself for Any Emergency</h2>
                <p className="text-xl mb-6">Key tips and essential items to have ready in case of an emergency.</p>
            </section>

            {/* Preparedness Tips Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-semibold text-center mb-6">Essential Emergency Preparedness Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Preparedness Tip Card */}
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Create an Emergency Kit</h4>
                            <p className="text-gray-700 mb-4">Pack a bag with essentials such as water, food, and first-aid supplies.</p>
                            <a href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/personal-safety/emergency-kit-checklist.html" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-500">Emergency Kit Checklist</a>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Create a Communication Plan</h4>
                            <p className="text-gray-700 mb-4">Have a clear plan on how to communicate with family members during emergencies.</p>
                            <a href="https://www.ready.gov/make-a-plan" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-500">Create a Plan</a>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Stay Informed</h4>
                            <p className="text-gray-700 mb-4">Keep yourself updated with weather reports, disaster warnings, and local alerts.</p>
                            <a href="https://www.weather.gov/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-500">Weather Alerts</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-blue-800 text-white py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p>&copy; 2024 CrisisNet. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default EmergencyPreparedness;
