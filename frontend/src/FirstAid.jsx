import React from 'react';

const FirstAid = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">

            {/* Header Section */}
            <header className="bg-blue-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">First Aid Guide</h1>
                </div>
            </header>

            {/* Introduction */}
            <section className="py-16 px-6 bg-teal-100 text-center">
                <h2 className="text-3xl font-semibold mb-4">Learn Essential First Aid Skills</h2>
                <p className="text-xl mb-6">Quick and life-saving tips that can help you save lives during emergencies.</p>
            </section>

            {/* First Aid Steps Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-semibold text-center mb-6">Step-by-Step First Aid Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* First Aid Step Card */}
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">CPR (Cardiopulmonary Resuscitation)</h4>
                            <p className="text-gray-700 mb-4">Learn how to administer CPR to someone who has stopped breathing.</p>
                            <a href="https://www.redcross.org/take-a-class/cpr" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-500">Learn CPR</a>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Burn Treatment</h4>
                            <p className="text-gray-700 mb-4">Steps to take immediately after someone suffers a burn.</p>
                            <a href="https://www.mayoclinic.org/first-aid/first-aid-burns/faq-20057971" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-500">Burn Treatment</a>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold mb-4">Wound Care</h4>
                            <p className="text-gray-700 mb-4">How to clean and dress a wound to prevent infection.</p>
                            <a href="https://www.mayoclinic.org/first-aid/first-aid-wounds/faq-20057887" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-500">Wound Care</a>
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

export default FirstAid;
