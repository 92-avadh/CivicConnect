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
  const { register, login, logout, user, reportIssue } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(window.location.hash.substring(1) || "home");
  const [issues, setIssues] = useState([]);
  const [issuesState, setIssuesState] = useState({ loading: true, error: null });

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    employeeId: "", // ✅ ADDED: Employee ID for the form state
    departmentId: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const initialReportData = {
    title: "",
    description: "",
    category: "Infrastructure",
    images: [],
  };
  const [reportData, setReportData] = useState(initialReportData);

  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [departmentIdError, setDepartmentIdError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchIssues = async () => {
    try {
      setIssuesState({ loading: true, error: null });
      const res = await axios.get("http://localhost:5000/api/issues");
      setIssues(res.data.issues || []);
      setIssuesState({ loading: false, error: null });
    } catch (error) {
      console.error("Failed to fetch issues:", error);
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
  }, [user]);

  const resetFormData = () => {
    setFormData(initialFormData);
    setPhoneError("");
    setPasswordError("");
    setDepartmentIdError("");
  };

  const handleTabChange = (tab) => {
    window.location.hash = tab;
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    resetFormData();
    setIssues([]);
    handleTabChange("home");
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;
    if (field === "phone") {
      const numericValue = value.replace(/\D/g, '');
      processedValue = numericValue.slice(0, 10);
    }
    setFormData((prevData) => ({ ...prevData, [field]: processedValue }));

    if (field === "phone") {
      const phoneRegex = /^\d{10}$/;
      setPhoneError(!phoneRegex.test(processedValue) && processedValue ? "Phone number must be exactly 10 digits." : "");
    }
    if (field === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      setPasswordError(!passwordRegex.test(value) && value ? "Password needs 8+ chars, 1 uppercase, 1 special." : "");
    }
    if (field === "departmentId") {
      const deptIdRegex = /^\d{8}$/;
      setDepartmentIdError(!deptIdRegex.test(value) && value ? "Department ID must be 8 digits." : "");
    }
  };

  const handleRegister = async (formData, userType) => {
    return await register(formData, userType);
  };

  const handleRoleSelection = (role) => {
    handleTabChange(role === "citizen" ? "citizen-register" : "official-login");
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    const result = await reportIssue(reportData);
    if (result.success) {
      alert("Issue reported successfully!");
      fetchIssues();
      setReportData(initialReportData);
      handleTabChange("issues");
    } else {
      alert(result.message);
    }
  };

  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    if (reportData.images.length + newFiles.length > 5) {
      alert("You can only upload a maximum of 5 files.");
      return;
    }
    setReportData((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setReportData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  const renderPage = () => {
    const page = currentPage.split("?")[0].split("#")[0] || "home";
    switch (page) {
      case "home":
        return <HomePage loggedIn={!!user} handleTabChange={handleTabChange} handleReportClick={() => user ? handleTabChange("report") : handleTabChange("citizen-login")} handleRoleSelection={handleRoleSelection} />;
      case "citizen-login":
        return <CitizenLoginPage handleTabChange={handleTabChange} login={login} />;
      case "citizen-register":
        return <CitizenRegisterPage formData={formData} handleInputChange={handleInputChange} handleRegister={handleRegister} handleTabChange={handleTabChange} phoneError={phoneError} passwordError={passwordError} resetForm={resetFormData} />;
      case "official-login":
        return <OfficialLoginPage formData={formData} handleInputChange={handleInputChange} handleTabChange={handleTabChange} departmentIdError={departmentIdError} resetForm={resetFormData} login={login} handleRegister={handleRegister} />;
      case "report":
        return <ReportPage reportData={reportData} handleReportInputChange={handleInputChange} handleImageUpload={handleImageUpload} handleReportSubmit={handleReportSubmit} handleRemoveImage={handleRemoveImage} />;
      case "issues":
        return <IssuesPage issues={issues} loggedIn={!!user} currentUser={user} issuesState={issuesState} />;
      case "profile":
        return user ? <ProfilePage currentUser={user} issues={issues} handleLogout={handleLogout} /> : <CitizenLoginPage handleTabChange={handleTabChange} login={login} />;
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
        return user?.role === "official" ? <AdminDashboardPage /> : <HomePage />;
      case "property-tax":
        return <PropertyTaxPage handleTabChange={handleTabChange} />;
      default:
        return <HomePage loggedIn={!!user} handleTabChange={handleTabChange} handleReportClick={() => user ? handleTabChange("report") : handleTabChange("citizen-login")} handleRoleSelection={handleRoleSelection} />;
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
