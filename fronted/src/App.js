import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

// Import Pages
import { HomePage } from "./pages/HomePage.js";
import CitizenLoginPage from "./pages/CitizenLoginPage.js";
import CitizenRegisterPage from "./pages/CitizenRegisterPage.js";
import OfficialLoginPage from "./pages/OfficialLoginPage.js";
import { IssuesPage } from "./pages/IssuesPage.js";
import { ReportPage } from "./pages/ReportPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { AboutPage } from "./pages/AboutPage.js";
import { ContactPage } from "./pages/ContactPage.js";
import { CivicSensePage } from "./pages/CivicSensePage.js";
import { LawPage } from "./pages/LawPage.js";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.js";
import { ServicesPage } from "./pages/ServicesPage.js";
import { TrackApplicationPage } from "./pages/TrackApplicationPage.js";
import { BirthCertificatePage } from "./pages/BirthCertificatePage.js";
import { DeathCertificatePage } from "./pages/DeathCertificatePage.js";
import { WaterConnectionPage } from "./pages/WaterConnectionPage.js";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.js";
import { AdminDashboardPage } from "./pages/AdminDashboardPage.js";
import { PropertyTaxPage } from "./pages/PropertyTaxPage";

// Import Components
import { NavBar } from "./components/NavBar.js";
import { Footer } from "./components/Footer.js";

function App() {
  const { user, logout, updateIssueStatus } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(window.location.hash.substring(1) || "home");
  const [issues, setIssues] = useState([]);
  const [issuesState, setIssuesState] = useState({ loading: true, error: null });
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchIssues = async () => {
    try {
      setIssuesState({ loading: true, error: null });
      const res = await axios.get("http://localhost:5000/api/issues");
      
      // ✅ THIS IS THE FIX: Check if the fetched issues array is empty
      if (res.data.issues && res.data.issues.length > 0) {
        setIssues(res.data.issues);
        setIssuesState({ loading: false, error: null });
      } else {
        // If no issues are returned, set the specific message
        setIssues([]);
        setIssuesState({ loading: false, error: "You haven't reported any issues yet." });
      }

    } catch (error) {
      console.error("Failed to fetch issues:", error);
      // This message will now only show for actual network/server errors
      setIssuesState({ loading: false, error: "Could not load issues." });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash.substring(1) || "home");
    };
    window.addEventListener("hashchange", handleHashChange);
    if (user) {
      fetchIssues();
    }
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [user]);

  const handleTabChange = (tab) => {
    window.location.hash = tab;
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };
  
  const handleUpdateStatus = async (issueId, newStatus) => {
    const result = await updateIssueStatus(issueId, newStatus);
    if (result.success) {
      fetchIssues(); 
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIssues([]);
    handleTabChange("home");
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  const renderPage = () => {
    const page = currentPage.split("?")[0].split("#")[0] || "home";
    switch (page) {
      case "home":
        return <HomePage handleTabChange={handleTabChange} />;
      case "citizen-login":
        return <CitizenLoginPage handleTabChange={handleTabChange} />;
      case "citizen-register":
        return <CitizenRegisterPage handleTabChange={handleTabChange} />;
      case "official-login":
        return <OfficialLoginPage handleTabChange={handleTabChange} />;
      case "report":
        return <ReportPage handleTabChange={handleTabChange} fetchIssues={fetchIssues} />;
      case "issues":
        return <IssuesPage issues={issues} loggedIn={!!user} currentUser={user} issuesState={issuesState} handleUpdateStatus={handleUpdateStatus} />;
      case "profile":
        return user ? <ProfilePage currentUser={user} issues={issues} handleLogout={handleLogout} /> : <CitizenLoginPage handleTabChange={handleTabChange} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "civic-sense":
        return <CivicSensePage />;
      case "law":
        return <LawPage />;
      case "privacy":
        return <PrivacyPolicyPage />;
      case "services":
        return <ServicesPage handleTabChange={handleTabChange} />;
      case "track":
        return <TrackApplicationPage handleTabChange={handleTabChange} />;
      case "birth-certificate":
        return <BirthCertificatePage handleTabChange={handleTabChange} />;
      case "death-certificate":
        return <DeathCertificatePage handleTabChange={handleTabChange} />;
      case "water-connection":
        return <WaterConnectionPage handleTabChange={handleTabChange} />;
      case "forgot-password":
        return <ForgotPasswordPage handleTabChange={handleTabChange} />;
      case "dashboard":
        return user?.role === "official" ? <AdminDashboardPage /> : <HomePage handleTabChange={handleTabChange} />;
      case "property-tax":
        return <PropertyTaxPage handleTabChange={handleTabChange} />;
      default:
        return <HomePage handleTabChange={handleTabChange} />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <NavBar
          loggedIn={!!user}
          handleTabChange={handleTabChange}
          handleReportClick={() => user ? handleTabChange("report") : handleTabChange("citizen-login")}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleLogout={handleLogout}
          markNotificationsAsRead={markNotificationsAsRead}
          currentUser={user}
        />
        <main>
          <div key={currentPage} className="page-container">{renderPage()}</div>
        </main>
        <Footer handleTabChange={handleTabChange} />
      </div>
  );
}

export default App;