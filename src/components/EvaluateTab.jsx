import React, { useState } from 'react';
import { evaluateProperty } from '../utils/api';
import PropertyCard from './PropertyCard';

export default function EvaluateTab({ criteria, onSave }) {
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleEvaluate = async () => {
    if (!listing.trim()) {
      setError('Please paste a listing first.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await evaluateProperty(listing, criteria);
      if (!data) throw new Error('Could not parse AI response. Try pasting more complete listing text.');
      setResult(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="tab-content">
      <p className="tab-description">
        Paste any TradeMe listing text below — address, price, bedrooms, land size, description. The AI will score it against your criteria and check granny flat viability.
      </p>

      <textarea
        className="listing-textarea"
        rows={10}
        value={listing}
        onChange={(e) => setListing(e.target.value)}
        placeholder={`Paste TradeMe listing here...\n\nExample:\n14 Tiriwa Drive, Henderson, Auckland\nPrice: $689,000\n3 bedrooms, 1 bathroom\nFloor area: 95 sqm  |  Land area: 612 sqm\nMixed Housing Suburban zone. Level rear section, existing shed, double garage...`}
      />

      <div className="action-row">
        <button className="btn btn-primary" onClick={handleEvaluate} disabled={loading}>
          {loading ? 'Analysing...' : 'Evaluate listing'}
        </button>
        <button className="btn btn-secondary" onClick={() => { setListing(''); setResult(null); setError(''); }}>
          Clear
        </button>
        {loading && <div className="spinner" />}
      </div>

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1.5rem' }}>
          <PropertyCard result={result} onSave={onSave} />
        </div>
      )}
    </div>
  );
}
