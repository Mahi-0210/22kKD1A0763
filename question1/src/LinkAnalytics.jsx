import React, { useState, useEffect } from 'react';

const LinkAnalytics = ({ linkDatabase }) => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  useEffect(() => {
    calculateAnalytics();
  }, [linkDatabase, selectedTimeframe]);

  const calculateAnalytics = () => {
    const now = new Date();
    let filteredLinks = [];

    switch (selectedTimeframe) {
      case 'today':
        filteredLinks = linkDatabase.filter(link => 
          link.birthTime.toDateString() === now.toDateString()
        );
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredLinks = linkDatabase.filter(link => link.birthTime >= weekAgo);
        break;
      case 'all':
      default:
        filteredLinks = linkDatabase;
        break;
    }

    const totalGeneratedLinks = filteredLinks.length;
    const totalInteractions = filteredLinks.reduce((sum, link) => sum + link.accessCount, 0);
    const averageLifespan = filteredLinks.length > 0 
      ? filteredLinks.reduce((sum, link) => sum + link.lifespan, 0) / filteredLinks.length 
      : 0;

    const topPerformingLinks = [...filteredLinks]
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 5);

    setAnalyticsData({
      totalGeneratedLinks,
      totalInteractions,
      averageLifespan: Math.round(averageLifespan),
      topPerformingLinks
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Link Analytics Dashboard</h2>
        <select 
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
        >
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Links Generated</h3>
          <p className="text-3xl font-bold">{analyticsData.totalGeneratedLinks}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Total Interactions</h3>
          <p className="text-3xl font-bold">{analyticsData.totalInteractions}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Avg Lifespan</h3>
          <p className="text-3xl font-bold">{analyticsData.averageLifespan}m</p>
        </div>
      </div>

      {analyticsData.topPerformingLinks && analyticsData.topPerformingLinks.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Most Active Links</h3>
          <div className="space-y-3">
            {analyticsData.topPerformingLinks.map((link, index) => (
              <div key={link.uid} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 truncate max-w-xs">{link.sourceAddress}</p>
                    <p className="text-sm text-gray-500">{link.compactUrl}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{link.accessCount}</p>
                  <p className="text-sm text-gray-500">visits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkAnalytics;
