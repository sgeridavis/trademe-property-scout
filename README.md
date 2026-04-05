# TradeMe Property Scout 🏠

An AI-powered property evaluation tool for West Auckland house hunting. Paste TradeMe listings and get scored evaluations, granny flat viability assessments, and a managed watchlist.

## Features

- **AI Evaluation** — paste any TradeMe listing and get a scored breakdown across price value, granny flat potential, location, condition and school zones
- **Granny Flat Checker** — specific analysis against Auckland Unitary Plan rules for 70sqm minor dwelling viability
- **Watchlist** — save and compare properties side by side
- **Customisable Criteria** — adjust budget, land size, zoning preference and scoring weights
- **Pre-visit Checklist** — flood risk, zoning and sewer connection checks for each property

## Getting Started

### Prerequisites
- Node.js 16+
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/trademe-property-scout.git
cd trademe-property-scout
npm install
```

### Configuration

Create a `.env` file in the root directory:

```
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

### Run

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Set your criteria** in the Criteria tab — budget, min bedrooms, land size, granny flat size, preferred zoning and scoring weights
2. **Copy a TradeMe listing** — open a property on trademe.co.nz, select all text, copy and paste into the Evaluate tab
3. **Click Evaluate** — the AI will score the property and give you a granny flat verdict, pros/cons, red flags and agent questions
4. **Save to watchlist** — enter the address, score, price and GF verdict to track it
5. **Compare** — once you have 2+ saved properties, use Compare to get a recommendation on which to view first

## Granny Flat Rules (Auckland Unitary Plan)

| Zone | Rules |
|---|---|
| Mixed Housing Urban | Permitted as of right. Max 60% site coverage. 1m rear/side setbacks under 3m height |
| Mixed Housing Suburban | Permitted as of right. Max 60% site coverage. 1m rear/side setbacks |
| Single House Zone | One minor dwelling allowed. 35–40% coverage. 3m rear setback |

**Rule of thumb:** For a 70sqm granny flat, aim for 650sqm+ land with a main house footprint under 150sqm and at least 10m of flat rear yard depth.

## Pre-Visit Checklist

Before every open home:
- [ ] Check flood/overland flow: [Auckland Council GeoMaps](https://gis.aucklandcouncil.govt.nz)
- [ ] Check sewer main location: [Watercare map](https://www.watercare.co.nz)
- [ ] Confirm zoning: GeoMaps zoning layer
- [ ] Calculate site coverage: land area × 60% = max combined footprint

## Tech Stack

- React 18
- Anthropic Claude API (claude-sonnet-4-20250514)
- Plain CSS (no UI framework)

## Project Structure

```
src/
├── components/
│   ├── EvaluateTab.jsx       # Listing input and AI evaluation
│   ├── WatchlistTab.jsx      # Saved properties and comparison
│   ├── CriteriaTab.jsx       # Buyer criteria and scoring weights
│   ├── GuideTab.jsx          # How to use and GF rules reference
│   ├── PropertyCard.jsx      # Scored result card
│   └── ScoreBar.jsx          # Animated score bar component
├── data/
│   └── properties.js         # Saved property state management
├── utils/
│   └── api.js                # Anthropic API calls
├── App.jsx                   # Main app with tab navigation
├── App.css                   # Global styles
└── index.js                  # Entry point
```

## Contributing

Pull requests welcome. For major changes please open an issue first.

## Disclaimer

Property scores and granny flat assessments are AI-generated estimates only. Always verify zoning, flood risk and council rules independently before making any purchasing decision. This tool does not constitute legal, financial or planning advice.

## Licence

MIT
