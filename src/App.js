import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult(data);
      setHistory([{ url, ...data }, ...history]);
    } catch (err) {
      setResult({ result: 'error', details: 'Server error or not reachable.' });
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Phishing Link Detector</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter URL to check..."
          required
        />
        <button type="submit" disabled={loading}>Check</button>
      </form>
      {loading && <div className="spinner">Checking...</div>}
      {result && (
        <div className={`result ${result.result}`}>
          <h2>
            {result.result === 'safe' && 'Safe ✅'}
            {result.result === 'phishing' && 'Phishing ⚠️'}
            {result.result === 'suspicious' && 'Suspicious ❓'}
            {result.result === 'error' && 'Error ❌'}
          </h2>
          <p>{result.details}</p>
          {result.confidence !== undefined && (
            <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          )}
        </div>
      )}
      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.map((item, idx) => (
              <li key={idx}>
                <strong>{item.url}</strong>: {item.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App; 
