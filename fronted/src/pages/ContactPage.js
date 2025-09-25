import React from 'react';

export const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your feedback! We will get back to you shortly.");
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
                    <p className="mt-4 text-lg text-gray-600">We welcome your feedback and inquiries. Please use the form below to get in touch with us.</p>
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                                        Submit Feedback
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-gray-50 p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Office</h3>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    <strong>Surat Municipal Corporation</strong><br />
                                    Muglisara, Main Road<br />
                                    Surat, Gujarat 395003<br />
                                    India
                                </p>
                                <p>
                                    <strong>Phone:</strong> +91 261-2234567<br />
                                    <strong>Email:</strong> support@civicconnect.gov.in
                                </p>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Our Location</h4>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.2282596488!2d72.6841381206683!3d21.15912175738871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe455829093e10f!2sSurat%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1690123456789!5m2!1sen!2sus"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Surat Location Map"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
