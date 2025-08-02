import React, { useState, useEffect } from 'react';

// Import Pages
import { HomePage } from './pages/HomePage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { IssuesPage } from './pages/IssuesPage.js';
import { ReportPage } from './pages/ReportPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { CivicSensePage } from './pages/CivicSensePage.js';
import { LawPage } from './pages/LawPage.js';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.js';
import { ServicesPage } from './pages/ServicesPage.js';
import { TrackApplicationPage } from './pages/TrackApplicationPage.js';
import { BirthCertificatePage } from './pages/BirthCertificatePage.js';
import { DeathCertificatePage } from './pages/DeathCertificatePage.js';
import { WaterConnectionPage } from './pages/WaterConnectionPage.js';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.js';
import {AdminDashboardPage}  from './pages/AdminDashboardPage.js';
import {PropertyTaxPage} from './pages/PropertyTaxPage';
// Import Components
import { NavBar } from './components/NavBar.js';
import { Footer } from './components/Footer.js';

function App() {
  // eslint-disable-next-line no-unused-vars
const [activeTab, setActiveTab] = useState('home');

  const [selectedUserType, setSelectedUserType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [issues, setIssues] = useState([
    { _id: 1, userId: 1, title: 'Pothole on Ring Road', description: 'Large pothole causing traffic congestion.', status: 'Open', category: 'Infrastructure', createdAt: new Date().toISOString(), location: 'Ring Road Junction', applicationNumber: 'SMC-123456' },
    { _id: 2, userId: 2, title: 'Broken Street Light', description: 'Street light not working for past week.', status: 'In Progress', category: 'Infrastructure', createdAt: new Date().toISOString(), location: 'Ghod Dod Road', applicationNumber: 'SMC-234567' },
    { _id: 3, userId: 1, title: 'Garbage Overflow', description: 'Overflowing garbage bin attracting stray animals.', status: 'Resolved', category: 'Sanitation', createdAt: new Date().toISOString(), location: 'Pal Area', applicationNumber: 'SMC-345678' },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [issuesState, setIssuesState] = useState({ loading: false, error: null });

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', agreeToTerms: false
  });

  const [reportData, setReportData] = useState({
    title: '', description: '', category: 'Infrastructure', image: null, imagePreview: null
  });

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home';
      const [page, section] = hash.split('?')[0].split('#');
      setActiveTab(page);
      if (section) {
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addNotification = (message) => {
    setNotifications(prev => [{ id: Date.now(), message, read: false, date: new Date() }, ...prev]);
  };

  const markNotificationsAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setShowNotifications(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));

    if (field === 'phone') {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value) && value !== '') {
            setPhoneError('Phone number must be exactly 10 digits.');
        } else {
            setPhoneError('');
        }
    }

    if (field === 'password') {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(value) && value !== '') {
            setPasswordError('Password must be 8+ characters, with one uppercase letter and one special character.');
        } else {
            setPasswordError('');
        }
    }
  };

  const handleReportInputChange = (field, value) => {
    setReportData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    alert('Simulating login...');
    setLoggedIn(true);
    const role = email.includes('official') ? 'official' : 'citizen';
    setCurrentUser({ id: 1, firstName: 'Test', lastName: 'User', email: email, phone: '1234567890', role: role });
    handleTabChange('home');
    addNotification(`Welcome back, Test!`);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    handleTabChange('home');
    setIsMenuOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Simulating registration for ${selectedUserType}...`);
    setLoggedIn(true);
    setCurrentUser({ id: Date.now(), firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone, role: selectedUserType });
    handleTabChange('home');
    addNotification(`Welcome, ${formData.firstName}!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIssue = { 
        _id: issues.length + 1, 
        userId: currentUser.id, 
        title: reportData.title, 
        description: reportData.description, 
        category: reportData.category, 
        status: 'Open', 
        createdAt: new Date().toISOString(), 
        location: 'User Location',
        applicationNumber: `SMC-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setIssues([newIssue, ...issues]);
    setReportData({ title: '', description: '', category: 'Infrastructure', image: null, imagePreview: null });
    alert(`Issue reported successfully! Your Application Number is: ${newIssue.applicationNumber}`);
    addNotification(`Your issue '${newIssue.title}' has been successfully submitted.`);
    handleTabChange('issues');
  };

  const handleTabChange = (tab) => {
    window.location.hash = tab;
    setIsMenuOpen(false);
  };

  const handleRoleSelection = (role) => {
    setSelectedUserType(role);
    handleTabChange('register');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setReportData(prev => ({ ...prev, image: file, imagePreview: event.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleReportClick = () => {
      if (loggedIn) handleTabChange('report');
      else handleTabChange('login');
  };
  
  const handleForgotPassword = (e) => {
      e.preventDefault();
      alert("If an account with this email exists, a password reset link has been sent.");
      handleTabChange('login');
  };

  const handleDeleteAccount = () => {
      if (window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
          handleLogout();
          alert("Your account has been permanently deleted.");
      }
  };

  const handleUpdateStatus = (issueId, newStatus) => {
    setIssues(prevIssues => 
        prevIssues.map(issue => 
            issue._id === issueId ? { ...issue, status: newStatus } : issue
        )
    );
    addNotification(`Issue status has been updated to ${newStatus}.`);
  };

  const renderPage = () => {
    const page = window.location.hash.substring(1).split('?')[0].split('#')[0] || 'home';
    switch(page) {
      case 'home':
        return <HomePage loggedIn={loggedIn} handleTabChange={handleTabChange} handleReportClick={handleReportClick} handleRoleSelection={handleRoleSelection} />;
      case 'login':
        return <LoginPage handleLogin={handleLogin} handleTabChange={handleTabChange} />;
      case 'forgot-password':
        return <ForgotPasswordPage handleForgotPassword={handleForgotPassword} handleTabChange={handleTabChange} />;
      case 'register':
        return <RegisterPage selectedUserType={selectedUserType} formData={formData} handleInputChange={handleInputChange} handleRegister={handleRegister} handleTabChange={handleTabChange} phoneError={phoneError} passwordError={passwordError} />;
      case 'report':
        return loggedIn ? <ReportPage reportData={reportData} handleReportInputChange={handleReportInputChange} handleSubmit={handleSubmit} handleImageUpload={handleImageUpload} /> : <LoginPage handleLogin={handleLogin} handleTabChange={handleTabChange} />;
      case 'issues':
        return <IssuesPage issues={issues} loggedIn={loggedIn} handleUpdateStatus={handleUpdateStatus} currentUser={currentUser} issuesState={issuesState} />;
      case 'civic-sense':
        return <CivicSensePage />;
      case 'law':
        return <LawPage />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'services':
        return <ServicesPage handleTabChange={handleTabChange} />;
      case 'profile':
        return loggedIn ? <ProfilePage currentUser={currentUser} issues={issues} handleLogout={handleLogout} handleDeleteAccount={handleDeleteAccount} /> : <LoginPage handleLogin={handleLogin} handleTabChange={handleTabChange} />;
      case 'track':
        return <TrackApplicationPage handleTabChange={handleTabChange} />;
      case 'property-tax':
        return <PropertyTaxPage handleTabChange={handleTabChange} />;
      case 'birth-certificate':
        return <BirthCertificatePage handleTabChange={handleTabChange} />;
      case 'death-certificate':
        return <DeathCertificatePage handleTabChange={handleTabChange} />;
      case 'water-connection':
        return <WaterConnectionPage handleTabChange={handleTabChange} />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return loggedIn && currentUser?.role === 'official' ? <AdminDashboardPage /> : <HomePage />;
      default:
        return <HomePage loggedIn={loggedIn} handleTabChange={handleTabChange} handleReportClick={handleReportClick} handleRoleSelection={handleRoleSelection} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <NavBar 
        loggedIn={loggedIn}
        handleTabChange={handleTabChange}
        handleReportClick={handleReportClick}
        notifications={notifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
        markNotificationsAsRead={markNotificationsAsRead}
        currentUser={currentUser}
      />
      <main>
        {renderPage()}
      </main>
      <Footer 
        handleTabChange={handleTabChange}
        handleReportClick={handleReportClick}
      />
    </div>
  );
}

export default App;
