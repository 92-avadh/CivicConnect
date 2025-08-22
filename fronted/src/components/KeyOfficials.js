import React from 'react';

export const KeyOfficials = () => {
    const officials = [
      { name: 'Shri Shalini Agarwal, IAS', title: 'Municipal Commissioner', imageUrl: '/images/commissioner.jpg' },
      { name: 'Shri Dakshesh Mavani', title: 'Mayor', imageUrl: '/images/mayor.jpeg' },
      { name: 'Shri Narendra Patil', title: 'Deputy Mayor', imageUrl: '/images/deputy_mayor.jpeg' },
      { name: 'Shri Rajan Patel', title: 'Chairman, Standing Committee', imageUrl: '/images/chairman.jpg' },
    ];
    return (
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Meet Our Leadership</h2>
            <p className="mt-4 text-lg text-gray-600">The team dedicated to serving the city of Surat.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {officials.map((official) => (
              <div key={official.name} className="text-center">
                <img className="mx-auto h-40 w-40 rounded-full object-cover" src={official.imageUrl} alt={`Portrait of ${official.name}`} />
                <h3 className="mt-6 text-lg font-semibold text-gray-900">{official.name}</h3>
                <p className="text-blue-600">{official.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};
