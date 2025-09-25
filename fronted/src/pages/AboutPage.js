import React from 'react';


export const AboutPage = () => {
    
    const developers = [
        {
            name: 'Avadh dhameliya',
            photo: '/images/dev1.jpg', 
            github: 'https://github.com/92-avadh',
            email: 'dhameliyaavadh592@gmail.com',
            phone: '+91 92651 77693'
        },
        {
            name: 'Ravi Gajera',
            photo: '/images/dev2.jpg',
            github: 'https://github.com/ravigajera-afk',
            email: 'ravigajera0906@gmail.com',
            phone: '+91 96386 41139'
        },
        {
            name: 'Smit Bhingradiya',
            photo: '/images/dev3.jpg',
            github: 'https://github.com/Smit1879',
            email: 'bhingradiyasmit485@gmail.com',
            phone: '+91 78743 62579'
        },
        {
            name: 'Zeel katrodiya',
            photo: '/images/dev4.jpg',
            github: 'https://github.com/zeelkatrodiya',
            email: 'zeelkatrodiya21@gmail.com',
            phone: '+91 90816 32716'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">About CivicConnect Surat</h2>

                    {/* Meet Team Section*/}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Meet the Development Team</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {developers.map((dev, index) => (
                                <div key={index} className="text-center p-6 bg-gray-100 rounded-lg border border-gray-200 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                                    <img
                                        src={dev.photo}
                                        alt={dev.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                                    />
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">{dev.name}</h4>
                                    <div className="flex justify-center space-x-4 text-gray-600">
                                        <a href={`mailto:${dev.email}`} className="hover:text-blue-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </a>
                                        <a href={dev.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                                        </a>
                                        <a href={`tel:${dev.phone}`} className="hover:text-green-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 text-gray-700">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                            <p>To empower citizens of Surat to actively participate in improving their city by providing an easy-to-use platform for reporting and tracking civic issues. Together, we can make Surat smarter, cleaner, and more liveable for everyone.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h3>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Register as a Citizen, Official, or Admin.</li>
                                <li>Report civic issues with photos and detailed descriptions.</li>
                                <li>Track resolution progress in real-time.</li>
                                <li>Learn about civic sense and legal rights.</li>
                                <li>Contribute to community development and transparency.</li>
                            </ol>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};