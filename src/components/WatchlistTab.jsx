import React, { useState } from 'react';
import { compareProperties } from '../utils/api';
import ScoreBar, { scoreColor, gfColor } from './ScoreBar';

export default function WatchlistTab({ watchlist, onRemove }) {
  const [comparing, setComparing] = useState(false);
  const [comparison, setComparison] = useState('');

  const handleCompare = async () => {
    setComparing(true);
    setComparison('');
    try {
      const text = await compareProperties(watchlist);
      setComparison(text);
    } catch (e) {
      setComparison('Compare failed: ' + e.message);
    }
    setComparing(false);
  };

  const sorted = [...watchlist].sort((a, b) => b.overallScore - a.overallScore);

  if (!watchlist.length) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          No properties saved yet.<br />
          Evaluate a listing and click "Save to watchlist".
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <p className="tab-description">
        {watchlist.length} {watchlist.length === 1 ? 'property' : 'properties'} saved, ranked by score.
      </p>

      <div className="watchlist-list">
        {sorted.map((w) => (
          <div className="watchlist-row" key={w.address}>
            <div className="watchlist-row-main">
              <div className="watchlist-address">{w.address}</div>
              <div className="watchlist-meta">
                {w.price ? `$${Number(w.price).toLocaleString()}` : ''}
                {w.beds ? ` · ${w.beds} bed` : ''}
                {w.landSqm ? ` · ${w.landSqm}sqm` : ''}
                {w.savedAt ? ` · Saved ${w.savedAt}` : ''}
              </div>
              <ScoreBar score={w.overallScore} height={4} />
            </div>
            <div className="watchlist-row-right">
              <span className="score-medium" style={{ color: scoreColor(w.overallScore) }}>
                {w.overallScore}
              </span>
              <span className="gf-pill" style={{ color: gfColor(w.grannyFlatVerdict) }}>
                GF: {w.grannyFlatVerdict || 'Unknown'}
              </span>
              {w.zoning && <span className="zone-pill">{w.zoning}</span>}
              <button className="btn-remove" onClick={() => onRemove(w.address)}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {watchlist.length >= 2 && (
        <div style={{ marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={handleCompare} disabled={comparing}>
            {comparing ? 'Comparing...' : 'Compare all properties'}
          </button>
        </div>
      )}

      {comparison && (
        <div className="comparison-result">
          <div className="section-micro-label">AI recommendation</div>
          <p>{comparison}</p>
        </div>
      )}
    </div>
  );
}
