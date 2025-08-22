import React from 'react';

export const Monuments = () => {
    const monuments = [
      { name: 'Surat Castle', imageUrl: '/images/surat_castle.jpg' },
      { name: 'Dutch Garden', imageUrl: '/images/dutch_garden.jpeg' },
      { name: 'Clock Tower', imageUrl: '/images/clock_tower.jpeg' },
    ];
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Landmarks of Surat</h2>
            <p className="mt-4 text-lg text-gray-600">Discover the rich heritage of our city.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {monuments.map((monument) => (
              <div key={monument.name} className="group relative">
                <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={monument.imageUrl} alt={monument.name} className="w-full h-full object-center object-cover" />
                </div>
                <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">{monument.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};
