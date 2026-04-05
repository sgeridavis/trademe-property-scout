import React from 'react';

const STEPS = [
  {
    num: 1,
    title: 'Set your TradeMe filters',
    body: 'trademe.co.nz/property → Residential. Suburbs: Henderson, Glen Eden, New Lynn, Massey, Ranui, Swanson, Te Atatu. Price max $750k. Bedrooms min 3. Sort by Latest.',
  },
  {
    num: 2,
    title: 'Copy a listing',
    body: 'Open a promising listing. Select all text on the page (Ctrl+A / Cmd+A), copy, and paste into the Evaluate tab. Even just key details work: address, price, beds, land size, description.',
  },
  {
    num: 3,
    title: 'Evaluate',
    body: 'Click "Evaluate listing". You\'ll get a score out of 100, granny flat verdict, pros/cons, checklist and agent questions.',
  },
  {
    num: 4,
    title: 'Save to watchlist',
    body: 'Click "Save to watchlist" on any property scoring 65+. Build your shortlist over time.',
  },
  {
    num: 5,
    title: 'Compare',
    body: 'Once you have 2+ saved properties, go to the Watchlist tab and click Compare. The AI will recommend which to prioritise for viewing.',
  },
];

const GF_RULES = [
  {
    zone: 'Mixed Housing Urban',
    rules: 'Minor dwelling permitted as of right. Max 60% total site coverage. 1m rear and side setbacks for structures under 3m tall.',
  },
  {
    zone: 'Mixed Housing Suburban',
    rules: 'Minor dwelling permitted as of right. Max 60% total site coverage. 1m rear and side setbacks.',
  },
  {
    zone: 'Single House Zone',
    rules: 'One minor dwelling allowed but stricter — 35–40% site coverage, 3m rear setback. Works better on 700sqm+ sections.',
  },
];

const CHECKLIST = [
  { label: 'Flood / overland flow', tool: 'Auckland Council GeoMaps', url: 'https://gis.aucklandcouncil.govt.nz', time: '2 min', cost: 'Free' },
  { label: 'Sewer main location', tool: 'Watercare map', url: 'https://www.watercare.co.nz', time: '2 min', cost: 'Free' },
  { label: 'Operative zoning', tool: 'GeoMaps zoning layer', url: 'https://gis.aucklandcouncil.govt.nz', time: '2 min', cost: 'Free' },
  { label: 'Full hazard disclosure', tool: 'LIM report from Auckland Council', url: 'https://www.aucklandcouncil.govt.nz', time: '3–5 days', cost: '$300–400' },
];

export default function GuideTab() {
  return (
    <div className="tab-content">
      <div className="guide-section">
        <h3 className="guide-section-title">How to use</h3>
        {STEPS.map((s) => (
          <div className="guide-step" key={s.num}>
            <div className="guide-step-num">{s.num}</div>
            <div>
              <div className="guide-step-title">{s.title}</div>
              <div className="guide-step-body">{s.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="guide-section">
        <h3 className="guide-section-title">Granny flat rules — Auckland Unitary Plan</h3>
        {GF_RULES.map((r) => (
          <div className="gf-rule-row" key={r.zone}>
            <div className="gf-rule-zone">{r.zone}</div>
            <div className="gf-rule-body">{r.rules}</div>
          </div>
        ))}
        <div className="gf-tip">
          <strong>Rule of thumb:</strong> For a 70sqm granny flat, aim for 650sqm+ land with a main house footprint under 150sqm and at least 10m of flat rear yard depth. Any mention of existing sleepouts or sheds is a positive signal.
        </div>
      </div>

      <div className="guide-section">
        <h3 className="guide-section-title">Pre-visit checklist</h3>
        <table className="checklist-table">
          <thead>
            <tr>
              <th>Check</th>
              <th>Tool</th>
              <th>Time</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {CHECKLIST.map((c) => (
              <tr key={c.label}>
                <td>{c.label}</td>
                <td><a href={c.url} target="_blank" rel="noreferrer">{c.tool}</a></td>
                <td>{c.time}</td>
                <td>{c.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
