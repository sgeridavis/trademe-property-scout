const SYSTEM_PROMPT = `You are a New Zealand property buying assistant specialising in West Auckland. 
You MUST respond with ONLY a valid JSON object — no explanation, no markdown, no preamble, no trailing text. Just raw JSON.`;

export async function evaluateProperty(listing, criteria) {
  const userPrompt = `Evaluate this property listing for a West Auckland buyer.

BUYER CRITERIA:
- Max price: NZD $${criteria.maxPrice.toLocaleString()}
- Min bedrooms: ${criteria.minBeds}
- Min land: ${criteria.minLand} sqm
- Preferred area: ${criteria.suburb}
- Goal: build a ${criteria.gfSize}sqm granny flat (minor dwelling) for rental income
- Preferred zoning: ${criteria.zoning}
- Scoring weights: price value ${criteria.weights.price}%, granny flat potential ${criteria.weights.gf}%, location ${criteria.weights.location}%, condition ${criteria.weights.condition}%, school zones ${criteria.weights.schools}%

LISTING:
${listing}

Return ONLY this JSON (no other text):
{
  "address": "string",
  "price": 0,
  "beds": 0,
  "baths": 0,
  "landSqm": 0,
  "floorSqm": 0,
  "suburb": "string",
  "zoning": "string",
  "overallScore": 0,
  "scores": {
    "price": 0,
    "grannyFlat": 0,
    "location": 0,
    "condition": 0,
    "schools": 0
  },
  "grannyFlatVerdict": "Likely or Possible or Unlikely or Unknown",
  "grannyFlatReason": "2-3 sentences on granny flat viability based on land size, zoning, site coverage, and any existing structures",
  "pros": ["string", "string", "string"],
  "cons": ["string", "string", "string"],
  "summary": "2-3 sentence plain English summary",
  "redFlags": ["string or empty array"],
  "questions": ["question 1", "question 2"],
  "goodPoints": ["what is confirmed good about this property"],
  "badPoints": ["what is not good about this property"],
  "clarifications": ["what needs clarification before proceeding"]
}

Rules: Score 0-100 per dimension. Overall = weighted average using weights above. Use 0 for unknown numbers. Be honest and critical.`;

  const response = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  const rawText = data.content.map((i) => i.text || '').join('');
  return extractJSON(rawText);
}

export async function compareProperties(watchlist) {
  const summary = watchlist
    .map(
      (w, i) =>
        `Property ${i + 1}: ${w.address} — Score ${w.overallScore}/100, $${Number(w.price).toLocaleString()}, ${w.landSqm || '?'}sqm land, GF: ${w.grannyFlatVerdict}, Zoning: ${w.zoning || 'Unknown'}`
    )
    .join('\n');

  const prompt = `Compare these West Auckland properties for a family wanting to build a 70sqm granny flat for rental income:\n\n${summary}\n\nIn 4-5 sentences, which 1-2 should they prioritise viewing and why? Focus on granny flat potential, value for money, and practical considerations. Plain English only, no markdown.`;

  const response = await fetch('/api/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error(`API error ${response.status}`);

  const data = await response.json();
  return data.content.map((i) => i.text || '').join('');
}

function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {}
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch (e) {}
  }
  const stripped = text.replace(/```json|```/g, '').trim();
  try {
    return JSON.parse(stripped);
  } catch (e) {}
  return null;
}