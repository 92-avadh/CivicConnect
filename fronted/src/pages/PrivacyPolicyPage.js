import React from 'react';

export const PrivacyPolicyPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Privacy Policy</h2>
        <div className="prose prose-blue max-w-none">
            <p><strong>Last updated:</strong> July 22, 2025</p>
            <h3>Information We Collect</h3>
            <p>CivicConnect Surat collects information you provide directly to us, such as when you create an account, report civic issues, or contact our support team. This may include personal information (name, email, phone), account information, issue reports, location data, and uploaded images.</p>
            <h3>How We Use Your Information</h3>
            <p>We use the information to provide, maintain, and improve our services, process and track issue reports, communicate with you, ensure security, and comply with legal obligations.</p>
            <h3>Information Sharing</h3>
            <p>We may share your information with relevant government authorities to address reported issues. We do not sell your personal information to third parties. Your issue reports may be made publicly visible to promote transparency.</p>
            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@civicconnectsurat.gov.in.</p>
        </div>
      </div>
    </div>
);