import React from 'react';

export function scoreColor(score) {
  if (score >= 75) return '#22c55e';
  if (score >= 55) return '#f59e0b';
  return '#ef4444';
}

export function badgeClass(score) {
  if (score >= 75) return 'badge-green';
  if (score >= 55) return 'badge-amber';
  return 'badge-red';
}

export function gfColor(verdict) {
  switch (verdict) {
    case 'Likely': return '#22c55e';
    case 'Possible': return '#f59e0b';
    case 'Unlikely': return '#ef4444';
    default: return '#94a3b8';
  }
}

export default function ScoreBar({ score, height = 6 }) {
  return (
    <div className="score-bar-track" style={{ height }}>
      <div
        className="score-bar-fill"
        style={{ width: `${score}%`, background: scoreColor(score), height }}
      />
    </div>
  );
}
