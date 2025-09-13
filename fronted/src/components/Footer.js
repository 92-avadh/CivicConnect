import React from 'react';

export const Footer = ({ handleTabChange, handleReportClick }) => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#home" onClick={() => handleTabChange('home')} className="text-base text-gray-400 hover:text-white cursor-pointer">Home</a></li>
              <li><a href="#issues" onClick={() => handleTabChange('issues')} className="text-base text-gray-400 hover:text-white cursor-pointer">View Issues</a></li>
              <li><a href="#report" onClick={handleReportClick} className="text-base text-gray-400 hover:text-white cursor-pointer">Report an Issue</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" onClick={() => handleTabChange('about')} className="text-base text-gray-400 hover:text-white cursor-pointer">About Us</a></li>
              <li><a href="#civic-sense" onClick={() => handleTabChange('civic-sense')} className="text-base text-gray-400 hover:text-white cursor-pointer">Civic Sense</a></li>
              <li><a href="#law" onClick={() => handleTabChange('law')} className="text-base text-gray-400 hover:text-white cursor-pointer">Law Literacy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#privacy" onClick={() => handleTabChange('privacy')} className="text-base text-gray-400 hover:text-white cursor-pointer">Privacy Policy</a></li>
              <li><a href="#terms" onClick={() => handleTabChange('terms')} className="text-base text-gray-400 hover:text-white cursor-pointer">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2 text-base text-gray-400">
              <li>support@civicconnect.gov.in</li>
              <li>+91 261-2234567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; 2025 CivicConnect Surat. All rights reserved.</p>
        </div>
      </div>
    </footer>
);