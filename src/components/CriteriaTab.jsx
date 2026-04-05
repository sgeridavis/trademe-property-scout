import React, { useState } from 'react';

export default function CriteriaTab({ criteria, onChange }) {
  const [saved, setSaved] = useState(false);

  const update = (key, value) => onChange({ ...criteria, [key]: value });
  const updateWeight = (key, value) => onChange({ ...criteria, weights: { ...criteria.weights, [key]: Number(value) } });

  const totalWeight = Object.values(criteria.weights).reduce((a, b) => a + Number(b), 0);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="tab-content">
      <p className="tab-description">
        Adjust your criteria. These are included automatically in every evaluation.
      </p>

      <div className="criteria-section">
        <div className="criteria-section-title">Budget & basics</div>
        <div className="criteria-row">
          <label className="criteria-label">Max price (NZD)</label>
          <input type="number" value={criteria.maxPrice} step={5000}
            onChange={(e) => update('maxPrice', Number(e.target.value))} />
        </div>
        <div className="criteria-row">
          <label className="criteria-label">Min bedrooms</label>
          <input type="number" value={criteria.minBeds} min={1} max={8}
            onChange={(e) => update('minBeds', Number(e.target.value))} />
        </div>
        <div className="criteria-row">
          <label className="criteria-label">Min land (sqm)</label>
          <input type="number" value={criteria.minLand} step={50}
            onChange={(e) => update('minLand', Number(e.target.value))} />
        </div>
        <div className="criteria-row">
          <label className="criteria-label">Preferred area</label>
          <input type="text" value={criteria.suburb}
            onChange={(e) => update('suburb', e.target.value)} />
        </div>
      </div>

      <div className="criteria-section">
        <div className="criteria-section-title">Granny flat requirements</div>
        <div className="criteria-row">
          <label className="criteria-label">Min granny flat size (sqm)</label>
          <input type="number" value={criteria.gfSize}
            onChange={(e) => update('gfSize', Number(e.target.value))} />
        </div>
        <div className="criteria-row">
          <label className="criteria-label">Preferred zoning</label>
          <select value={criteria.zoning} onChange={(e) => update('zoning', e.target.value)}>
            <option value="Mixed Housing Suburban">Mixed Housing Suburban</option>
            <option value="Mixed Housing Urban">Mixed Housing Urban</option>
            <option value="Single House Zone">Single House Zone</option>
            <option value="Any">Any</option>
          </select>
        </div>
      </div>

      <div className="criteria-section">
        <div className="criteria-section-title">
          Scoring weights
          <span className={`weight-total ${totalWeight !== 100 ? 'weight-error' : 'weight-ok'}`}>
            Total: {totalWeight}% {totalWeight !== 100 ? '(should be 100)' : '✓'}
          </span>
        </div>
        {[
          { key: 'price', label: 'Price value' },
          { key: 'gf', label: 'Granny flat potential' },
          { key: 'location', label: 'Location' },
          { key: 'condition', label: 'Condition' },
          { key: 'schools', label: 'School zones' },
        ].map(({ key, label }) => (
          <div className="criteria-row" key={key}>
            <label className="criteria-label">{label}</label>
            <input type="number" value={criteria.weights[key]} min={0} max={100}
              onChange={(e) => updateWeight(key, e.target.value)} />
            <span className="unit-label">%</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        {saved ? 'Saved ✓' : 'Save criteria'}
      </button>
    </div>
  );
}
