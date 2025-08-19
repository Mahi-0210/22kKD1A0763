import React, {useState} from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic URL validation
    if (!url || !url.match(/^https?:\/\/.+/)) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }

    // Generate a random shortcode if none provided
    const finalShortCode = shortCode || Math.random().toString(36).substring(2, 8);
    
    const newShortenedUrl = {
      id: Date.now(),
      originalUrl: url,
      shortCode: finalShortCode,
      shortUrl: `http://localhost:3000/${finalShortCode}`,
      expiryMinutes: expiryMinutes || 30,
      createdAt: new Date(),
      clicks: 0
    };

    setShortenedUrls([...shortenedUrls, newShortenedUrl]);
    
    // Reset form
    setUrl('');
    setShortCode('');
    setExpiryMinutes('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Shorten your long URLs with custom codes and analytics</p>
        </header>

        {/* URL Shortener Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original URL *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Shortcode (optional)
                </label>
                <input
                  type="text"
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value)}
                  placeholder="custom-code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Time (minutes)
                </label>
                <input
                  type="number"
                  value={expiryMinutes}
                  onChange={(e) => setExpiryMinutes(e.target.value)}
                  placeholder="30"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Shorten URL
            </button>
          </form>
        </div>

        {/* Shortened URLs List */}
        {shortenedUrls.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Shortened URLs</h2>
            <div className="space-y-4">
              {shortenedUrls.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Original:</span>
                      <p className="text-gray-800 break-all">{item.originalUrl}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Shortened:</span>
                      <p className="text-blue-600 font-medium">{item.shortUrl}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Created: {item.createdAt.toLocaleString()}</span>
                      <span>Expires in: {item.expiryMinutes} minutes</span>
                      <span>Clicks: {item.clicks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
