import React from 'react';

// Note: NotificationDropdown is kept inside NavBar as it's only used here.
const NotificationDropdown = ({ notifications, markNotificationsAsRead }) => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 z-50">
        <div className="p-3 border-b">
            <h3 className="text-base font-semibold text-gray-800">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? notifications.map(n => (
                <div key={n.id} className={`p-3 border-b border-gray-100 ${!n.read ? 'bg-blue-50' : ''}`}>
                    <p className="text-sm text-gray-700">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</p>
                </div>
            )) : (
                <p className="text-center text-gray-500 p-8 text-sm">No new notifications.</p>
            )}
        </div>
        {notifications.filter(n => !n.read).length > 0 && (
            <div className="p-2 bg-gray-50 border-t">
                <button onClick={markNotificationsAsRead} className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-800">Mark all as read</button>
            </div>
        )}
    </div>
);

export const NavBar = ({ loggedIn, handleTabChange, handleReportClick, notifications, showNotifications, setShowNotifications, isMenuOpen, setIsMenuOpen, handleLogout, markNotificationsAsRead, currentUser }) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    const isOfficial = loggedIn && currentUser?.role === 'official';

    return (
      <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabChange('home')}>
                  <img src="https://placehold.co/40x40/0D244F/FFFFFF?text=CC" alt="CivicConnect Logo" className="h-10 w-10"/>
                  <h1 className="text-xl font-bold text-gray-700 tracking-tight">CIVICCONNECT</h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                  <a onClick={() => handleTabChange('home')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Home</a>
                  {isOfficial ? (
                      <a onClick={() => handleTabChange('issues')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">All Issues</a>
                  ) : (
                      <>
                        <a onClick={() => handleTabChange('issues')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">View Issues</a>
                        <a onClick={handleReportClick} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Report an Issue</a>
                      </>
                  )}
                  <a onClick={() => handleTabChange('about')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">About</a>
                  <a onClick={() => handleTabChange('contact')} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Contact</a>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                  {loggedIn && (
                      <div className="relative">
                          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                              {unreadCount > 0 && <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
                          </button>
                          {showNotifications && <NotificationDropdown notifications={notifications} markNotificationsAsRead={markNotificationsAsRead} />}
                      </div>
                  )}
                  {!loggedIn ? (
                      // ✅ FIXED: Changed 'login' to 'citizen-login'
                      <button onClick={() => handleTabChange('citizen-login')} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700">Login</button>
                  ) : (
                      <button onClick={() => handleTabChange('profile')} className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">Profile</button>
                  )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                  </button>
              </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a onClick={() => handleTabChange('home')} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Home</a>
                  {isOfficial ? (
                      <a onClick={() => handleTabChange('issues')} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">All Issues</a>
                  ) : (
                      <>
                        <a onClick={() => handleTabChange('issues')} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">View Issues</a>
                        <a onClick={handleReportClick} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Report an Issue</a>
                      </>
                  )}
                  <a onClick={() => handleTabChange('about')} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">About</a>
                  <a onClick={() => handleTabChange('contact')} className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Contact</a>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                      {!loggedIn ? (
                          // ✅ FIXED: Changed 'login' to 'citizen-login'
                          <button onClick={() => handleTabChange('citizen-login')} className="w-full text-left text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Login</button>
                      ) : (
                          <>
                              <button onClick={() => handleTabChange('profile')} className="w-full text-left text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Profile</button>
                              <button onClick={handleLogout} className="w-full text-left text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
                          </>
                      )}
                  </div>
              </div>
          )}
      </header>
    );
};
