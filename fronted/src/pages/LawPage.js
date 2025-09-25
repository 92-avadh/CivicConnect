import React from 'react';

const legalCards = [
  { title: "Fundamental Rights", description: "Every citizen has constitutional rights that protect individual freedom.", icon: "⚖️", details: ["Right to Equality", "Right to Freedom", "Right against Exploitation"], reference: "Articles 14-32, Indian Constitution" },
  { title: "Fundamental Duties", description: "Citizens have constitutional obligations for social harmony.", icon: "🇮🇳", details: ["Respect National Flag", "Protect sovereignty", "Promote harmony"], reference: "Article 51A, Indian Constitution" },
  { title: "Free Legal Aid", description: "Every citizen has the right to free legal assistance if they cannot afford it.", icon: "🏛️", details: ["District Legal Services", "Lok Adalats", "Para-legal volunteers"], contact: "Call 1516 for National Legal Aid Helpline", reference: "Legal Services Authorities Act, 1987" }
];

export const LawPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Law Literacy Lounge</h2>
        <p className="text-center text-gray-600 mt-2 mb-12">Understanding your rights, duties, and legal resources</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {legalCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="text-4xl mb-4 text-center">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">{card.description}</p>
              <ul className="text-left space-y-2 mb-4 text-sm">
                {card.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start"><span className="text-blue-500 mr-2 mt-1">&#8226;</span>{detail}</li>
                ))}
              </ul>
              {card.contact && <div className="bg-blue-100 text-blue-800 p-2 rounded-md mb-3 text-sm font-semibold text-center">{card.contact}</div>}
              <div className="text-xs text-gray-500 italic text-center">{card.reference}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
);
