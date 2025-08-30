import React from 'react';
import { LogOut } from 'lucide-react';

export const NavBar = ({ loggedIn, currentUser, handleTabChange, handleLogout, isMenuOpen, setIsMenuOpen }) => {
    
    const isOfficial = loggedIn && currentUser?.role === 'official';

    const loggedOutLinks = [
        { name: 'Home', tab: 'home' },
        { name: 'View Issues', tab: 'issues' },
        { name: 'Report an Issue', tab: 'report' },
        { name: 'About', tab: 'about' },
        { name: 'Contact', tab: 'contact' }
    ];

    const citizenLinks = [
        { name: 'Home', tab: 'home' },
        { name: 'View Issues', tab: 'issues' },
        { name: 'Report an Issue', tab: 'report' },
    ];

    const officialLinks = [
        { name: 'Dashboard', tab: 'dashboard' },
        { name: 'All Issues', tab: 'issues' },
        // ADDED: New link for officials
        { name: 'View Feedback', tab: 'view-feedback' },
    ];

    const navLinks = loggedIn ? (isOfficial ? officialLinks : citizenLinks) : loggedOutLinks;
    
    const handleReportClick = () => {
        if (loggedIn) {
            handleTabChange('report');
        } else {
            // Replaced alert with console.log for a better user experience
            console.log("User not logged in, redirecting to login.");
            handleTabChange('citizen-login');
        }
    };

    return (
      <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabChange(isOfficial ? 'dashboard' : 'home')}>
                  <img src="https://placehold.co/40x40/0D244F/FFFFFF?text=CC" alt="CivicConnect Logo" className="h-10 w-10"/>
                  <h1 className="text-xl font-bold text-gray-700 tracking-tight">CIVICCONNECT</h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                  {navLinks.map(link => (
                      <button 
                        key={link.tab} 
                        type="button"
                        onClick={() => link.tab === 'report' ? handleReportClick() : handleTabChange(link.tab)} 
                        className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-transparent border-none"
                      >
                          {link.name}
                      </button>
                  ))}
                  {loggedIn && (
                    <button 
                      type="button"
                      onClick={() => handleTabChange('profile')} 
                      className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-transparent border-none"
                    >
                        Profile
                    </button>
                  )}
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                  {!loggedIn ? (
                      <button onClick={() => handleTabChange('citizen-login')} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700">Login</button>
                  ) : (
                      <button onClick={handleLogout} className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-full" title="Logout">
                          <LogOut size={20} />
                      </button>
                  )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                  </button>
              </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navLinks.map(link => (
                      <button 
                        key={link.tab} 
                        type="button"
                        onClick={() => link.tab === 'report' ? handleReportClick() : handleTabChange(link.tab)} 
                        className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer w-full text-left bg-transparent border-none"
                      >
                          {link.name}
                      </button>
                  ))}
                   {loggedIn && (
                    <button 
                      type="button"
                      onClick={() => handleTabChange('profile')} 
                      className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer w-full text-left bg-transparent border-none"
                    >
                        Profile
                    </button>
                  )}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                      {!loggedIn ? (
                          <button onClick={() => handleTabChange('citizen-login')} className="w-full text-left text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Login</button>
                      ) : (
                          <button onClick={handleLogout} className="w-full text-left text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                      )}
                  </div>
              </div>
          )}
      </header>
    );
};
