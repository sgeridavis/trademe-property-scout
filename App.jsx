import React, { useState } from 'react';
import './App.css';
import EvaluateTab from './components/EvaluateTab';
import WatchlistTab from './components/WatchlistTab';
import CriteriaTab from './components/CriteriaTab';
import GuideTab from './components/GuideTab';

const DEFAULT_CRITERIA = {
  maxPrice: 750000,
  minBeds: 3,
  minLand: 500,
  suburb: 'West Auckland',
  gfSize: 70,
  zoning: 'Mixed Housing Suburban',
  weights: {
    price: 25,
    gf: 30,
    location: 20,
    condition: 15,
    schools: 10,
  },
};

const TABS = [
  { id: 'evaluate', label: 'Evaluate listing' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'criteria', label: 'My criteria' },
  { id: 'guide', label: 'How to use' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('evaluate');
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [watchlist, setWatchlist] = useState([]);

  const handleSave = (result) => {
    if (watchlist.find((w) => w.address === result.address)) return;
    setWatchlist((prev) => [
      ...prev,
      { ...result, savedAt: new Date().toLocaleDateString('en-NZ') },
    ]);
  };

  const handleRemove = (address) => {
    setWatchlist((prev) => prev.filter((w) => w.address !== address));
  };

  const watchlistCount = watchlist.length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <span className="app-logo-icon">🏠</span>
            <div>
              <div className="app-title">TradeMe Property Scout</div>
              <div className="app-subtitle">West Auckland · Under $750k · 3+ beds · Granny flat potential</div>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <nav className="tab-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.id === 'watchlist' && watchlistCount > 0 && (
                <span className="tab-badge">{watchlistCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="tab-panel">
          {activeTab === 'evaluate' && (
            <EvaluateTab criteria={criteria} onSave={handleSave} />
          )}
          {activeTab === 'watchlist' && (
            <WatchlistTab watchlist={watchlist} onRemove={handleRemove} />
          )}
          {activeTab === 'criteria' && (
            <CriteriaTab criteria={criteria} onChange={setCriteria} />
          )}
          {activeTab === 'guide' && <GuideTab />}
        </div>
      </main>
    </div>
  );
}
