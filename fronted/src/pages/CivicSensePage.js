import React from 'react';

const civicTips = [
  { id: 1, title: "Keep Public Spaces Clean", tip: "Always use designated dustbins and avoid littering.", icon: "🗑️", category: "Cleanliness" },
  { id: 2, title: "Responsible Parking", tip: "Park only in marked bays to avoid traffic congestion.", icon: "🚗", category: "Traffic" },
  { id: 3, title: "Public Transport Etiquette", tip: "Offer seats to seniors and those in need.", icon: "🚌", category: "Transport" },
  { id: 4, title: "Traffic Discipline", tip: "Follow lane rules and use indicators properly.", icon: "🚦", category: "Traffic" },
  { id: 5, title: "Queue Discipline", tip: "Maintain orderly queues in public places.", icon: "👥", category: "Social" },
  { id: 6, title: "Water Conservation", tip: "Fix leaky taps and report public water leaks promptly.", icon: "💧", category: "Environment" }
];

export const CivicSensePage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Civic Sense Corner</h2>
        <p className="text-center text-gray-600 mt-2 mb-12">Learn practical civic etiquette and responsible citizenship</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {civicTips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{tip.tip}</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">{tip.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
);
