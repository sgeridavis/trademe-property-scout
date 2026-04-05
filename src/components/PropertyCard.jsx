import React, { useState } from 'react';
import ScoreBar, { scoreColor, gfColor } from './ScoreBar';

const DIM_LABELS = {
  price: 'Price value',
  grannyFlat: 'Granny flat',
  location: 'Location',
  condition: 'Condition',
  schools: 'Schools',
};

export default function PropertyCard({ result, onSave }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(result);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    const text = `PROPERTY EVALUATION
${result.address}
Price: $${(result.price || 0).toLocaleString()} | Score: ${result.overallScore}/100 | Granny flat: ${result.grannyFlatVerdict}

${result.summary}

Pros: ${(result.pros || []).join('; ')}
Cons: ${(result.cons || []).join('; ')}

Ask the agent:
${(result.questions || []).map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="property-card">
      {/* Header */}
      <div className="card-header">
        <div className="card-header-left">
          <h3 className="card-address">{result.address || 'Property'}</h3>
          <p className="card-meta">
            {result.price ? `$${result.price.toLocaleString()}` : ''}
            {result.beds ? ` · ${result.beds} bed` : ''}
            {result.baths ? ` · ${result.baths} bath` : ''}
            {result.landSqm ? ` · ${result.landSqm}sqm land` : ''}
            {result.floorSqm ? ` · ${result.floorSqm}sqm floor` : ''}
          </p>
        </div>
        <div className="card-score-badge">
          <span className="score-big" style={{ color: scoreColor(result.overallScore) }}>
            {result.overallScore}
          </span>
          <span className="score-denom">/100</span>
        </div>
      </div>

      <ScoreBar score={result.overallScore} height={8} />

      {/* Score breakdown */}
      <div className="score-grid">
        {Object.keys(DIM_LABELS).map((k) => (
          <div className="score-cell" key={k}>
            <div className="score-cell-label">{DIM_LABELS[k]}</div>
            <div className="score-cell-row">
              <span className="score-cell-num" style={{ color: scoreColor((result.scores || {})[k] || 0) }}>
                {(result.scores || {})[k] || 0}
              </span>
              <ScoreBar score={(result.scores || {})[k] || 0} height={4} />
            </div>
          </div>
        ))}
      </div>

      {/* Granny flat verdict */}
      <div className="gf-box">
        <div className="gf-box-header">
          <span className="gf-label">Granny flat:</span>
          <span className="gf-verdict" style={{ color: gfColor(result.grannyFlatVerdict) }}>
            {result.grannyFlatVerdict || 'Unknown'}
          </span>
          {result.zoning && <span className="gf-zone">{result.zoning}</span>}
        </div>
        <p className="gf-reason">{result.grannyFlatReason}</p>
      </div>

      {/* Summary */}
      <p className="card-summary">{result.summary}</p>

      {/* Pros / Cons */}
      <div className="pros-cons-grid">
        <div>
          <div className="section-micro-label green">Pros</div>
          {(result.pros || []).map((p, i) => (
            <div className="pro-item" key={i}>+ {p}</div>
          ))}
        </div>
        <div>
          <div className="section-micro-label red">Cons</div>
          {(result.cons || []).map((c, i) => (
            <div className="con-item" key={i}>− {c}</div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      {(result.goodPoints?.length || result.badPoints?.length || result.clarifications?.length) && (
        <div className="checklist-section">
          {result.goodPoints?.length > 0 && (
            <div className="checklist-group">
              <div className="section-micro-label green">✓ Confirmed good</div>
              {result.goodPoints.map((p, i) => <div className="checklist-item check" key={i}>{p}</div>)}
            </div>
          )}
          {result.badPoints?.length > 0 && (
            <div className="checklist-group">
              <div className="section-micro-label red">✗ Not good</div>
              {result.badPoints.map((p, i) => <div className="checklist-item cross" key={i}>{p}</div>)}
            </div>
          )}
          {result.clarifications?.length > 0 && (
            <div className="checklist-group">
              <div className="section-micro-label amber">? Needs clarification</div>
              {result.clarifications.map((p, i) => <div className="checklist-item question" key={i}>{p}</div>)}
            </div>
          )}
        </div>
      )}

      {/* Red flags */}
      {result.redFlags?.length > 0 && result.redFlags[0] && (
        <div className="red-flags">
          <div className="section-micro-label red">Red flags</div>
          {result.redFlags.map((f, i) => (
            <div className="red-flag-item" key={i}>⚠ {f}</div>
          ))}
        </div>
      )}

      {/* Agent questions */}
      {result.questions?.length > 0 && (
        <div className="agent-questions">
          <div className="section-micro-label">Ask the agent</div>
          {result.questions.map((q, i) => (
            <div className="question-item" key={i}>{i + 1}. {q}</div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="card-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          {saved ? 'Saved ✓' : 'Save to watchlist'}
        </button>
        <button className="btn btn-secondary" onClick={handleCopy}>
          Copy report
        </button>
      </div>
    </div>
  );
}
