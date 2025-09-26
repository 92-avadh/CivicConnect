import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Monuments } from '../components/Monuments';
import { KeyOfficials } from '../components/KeyOfficials';

const quickLinksData = [
    { name: 'Pay Property Tax', icon: '🏠', tab: 'property-tax' },
    { name: 'Birth Certificate', icon: '👶', tab: 'birth-certificate' },
    { name: 'Death Certificate', icon: '🕊️', tab: 'death-certificate' },
    { name: 'Water Connection', icon: '💧', tab: 'water-connection' },
    { name: 'Write Feedback', icon: '✍️', tab: 'feedback' },
    { name: 'About Application', icon: '🔍', tab: 'track' },
];

const newsUpdatesData = [
    { date: 'July 22, 2025', title: 'Monsoon preparedness meeting held by Municipal Commissioner.' },
    { date: 'July 21, 2025', title: 'New public park inaugurated in the Adajan area.' },
    { date: 'July 20, 2025', title: 'Property tax deadline extended to August 31st.' },
];

// --- Sub-Components ---
const HeroSection = () => (
    <div className="relative bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Welcome to CivicConnect Surat
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Your one-stop portal for all municipal services and civic engagement.
                </p>
            </div>
        </div>
    </div>
);

const QuickLinksSection = ({ handleTabChange }) => (
    <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Quick Links</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                {quickLinksData.map(link => (
                    <button
                        key={link.name}
                        onClick={() => handleTabChange(link.tab)}
                        className="p-4 bg-gray-100 rounded-lg hover:bg-blue-100 hover:shadow-md cursor-pointer transition"
                    >
                        <div className="text-3xl mb-2">{link.icon}</div>
                        <p className="text-sm font-medium text-gray-700">{link.name}</p>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const NewsAndLearningSection = ({ handleTabChange }) => (
    <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News & Updates */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">News & Updates</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {newsUpdatesData.map(news => (
                            <li key={news.title} className="p-4 hover:bg-gray-50">
                                <p className="text-sm text-gray-500">{news.date}</p>
                                <p className="font-medium text-gray-800">{news.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Learning Hub */}
            <div className="lg:col-span-1 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Learn & Participate</h2>
                <div className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition" onClick={() => handleTabChange('civic-sense')}>
                    <div className="flex items-center space-x-4">
                        <div className="text-3xl">💡</div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Civic Sense Corner</h3>
                            <p className="text-sm text-gray-600">Learn about responsible citizenship.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition" onClick={() => handleTabChange('law')}>
                    <div className="flex items-center space-x-4">
                        <div className="text-3xl">⚖️</div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Law Literacy Lounge</h3>
                            <p className="text-sm text-gray-600">Understand your rights and duties.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const RoleSelectionSection = ({ handleTabChange }) => (
    <div id="role-selection-section" className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Join CivicConnect</h2>
            <p className="mt-2 text-gray-600">Register as a citizen or login as an official to get started.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                    <div className="text-4xl">👥</div>
                    <h3 className="mt-4 text-lg font-semibold">Citizen</h3>
                    <p className="mt-2 text-sm">Register to report issues, track progress, and help improve our city.</p>
                    <button onClick={() => handleTabChange('citizen-register')} className="mt-6 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700">Citizen Register</button>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                    <div className="text-4xl">👔</div>
                    <h3 className="mt-4 text-lg font-semibold">Government Official</h3>
                    <p className="mt-2 text-sm">Login to manage issues, coordinate with departments, and serve citizens.</p>
                    <button onClick={() => handleTabChange('official-login')} className="mt-6 px-5 py-2 bg-gray-700 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-800">Official Login</button>
                </div>
            </div>
        </div>
    </div>
);

// --- Main HomePage Component ---
export const HomePage = ({ handleTabChange }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="bg-gray-50">
            <HeroSection />
            <QuickLinksSection handleTabChange={handleTabChange} />
            <NewsAndLearningSection handleTabChange={handleTabChange} />
            {!user && <RoleSelectionSection handleTabChange={handleTabChange} />}
            <Monuments />
            <KeyOfficials />
        </div>
    );
};