import React, { useState } from 'react';
import { MapPin, CheckCircle, BookmarkIcon as ParkIcon, List, Grid } from 'lucide-react';

// Sample parks data - in a real app, this would come from an API
const nationalParks = [
  { id: 1, name: 'Yellowstone', state: 'Wyoming', image: 'https://images.unsplash.com/photo-1594976382948-12e3439721b1?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Yosemite', state: 'California', image: 'https://images.unsplash.com/photo-1562310503-a918c4c61e38?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Grand Canyon', state: 'Arizona', image: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Zion', state: 'Utah', image: 'https://images.unsplash.com/photo-1578517455095-6cd7189914d2?auto=format&fit=crop&q=80&w=800' },
];

function App() {
  const [visitedParks, setVisitedParks] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleVisited = (parkId: number) => {
    setVisitedParks(prev =>
      prev.includes(parkId)
        ? prev.filter(id => id !== parkId)
        : [...prev, parkId]
    );
  };

  const filteredParks = nationalParks.filter(park =>
    park.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    park.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedParks = {
    visited: filteredParks
      .filter(park => visitedParks.includes(park.id))
      .sort((a, b) => a.name.localeCompare(b.name)),
    notVisited: filteredParks
      .filter(park => !visitedParks.includes(park.id))
      .sort((a, b) => a.name.localeCompare(b.name))
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ParkIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">National Parks Tracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-green-700">
              <span className="font-semibold">{visitedParks.length}</span> parks visited
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search parks by name or state..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-8">
          {/* List View (Always visible) */}
          <div className="w-64 shrink-0 bg-white rounded-xl shadow-lg p-4">
            <div className="mb-6">
              <h2 className="font-semibold text-green-700 mb-2">Visited Parks ({sortedParks.visited.length})</h2>
              <ul className="space-y-2">
                {sortedParks.visited.map(park => (
                  <li
                    key={park.id}
                    className="flex items-center justify-between p-2 hover:bg-green-50 rounded-lg cursor-pointer"
                    onClick={() => toggleVisited(park.id)}
                  >
                    <span className="text-sm">{park.name}</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700 mb-2">Not Visited ({sortedParks.notVisited.length})</h2>
              <ul className="space-y-2">
                {sortedParks.notVisited.map(park => (
                  <li
                    key={park.id}
                    className="flex items-center justify-between p-2 hover:bg-green-50 rounded-lg cursor-pointer"
                    onClick={() => toggleVisited(park.id)}
                  >
                    <span className="text-sm">{park.name}</span>
                    <CheckCircle className="h-4 w-4 text-gray-300" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grid/Card View */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredParks.map(park => (
                  <div
                    key={park.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
                  >
                    <div className="relative h-48">
                      <img
                        src={park.image}
                        alt={park.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleVisited(park.id)}
                        className={`absolute top-4 right-4 p-2 rounded-full ${
                          visitedParks.includes(park.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        <CheckCircle className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">{park.name}</h3>
                      <div className="flex items-center mt-2 text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{park.state}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                  {filteredParks.map(park => (
                    <div
                      key={park.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={park.image}
                          alt={park.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{park.name}</h3>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{park.state}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleVisited(park.id)}
                        className={`p-2 rounded-full ${
                          visitedParks.includes(park.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <CheckCircle className="h-6 w-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {filteredParks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No parks found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;