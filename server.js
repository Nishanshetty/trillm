require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── OpenAI ──────────────────────────────────────────────────────────────────
async function callOpenAI(prompt, model) {
  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: model || 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
}

// ── Claude ───────────────────────────────────────────────────────────────────
async function callClaude(prompt, model) {
  const Anthropic = require('@anthropic-ai/sdk');
  const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: model || 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0].text;
}

// ── Gemini ───────────────────────────────────────────────────────────────────
async function callGemini(prompt, model) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const genModel = client.getGenerativeModel({ model: model || 'gemini-2.5-flash' });
  const result = await genModel.generateContent(prompt);
  return result.response.text();
}

// ── Routes ───────────────────────────────────────────────────────────────────
app.get('/api/models', (req, res) => {
  res.json({
    openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'o1-mini'],
    claude: ['claude-sonnet-4-6', 'claude-opus-4-6', 'claude-haiku-4-5-20251001'],
    gemini: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.5-flash-lite'],
  });
});

app.post('/api/compare', async (req, res) => {
  const { prompt, models = {} } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const [openaiResult, claudeResult, geminiResult] = await Promise.allSettled([
    callOpenAI(prompt, models.openai),
    callClaude(prompt, models.claude),
    callGemini(prompt, models.gemini),
  ]);

  res.json({
    openai: openaiResult.status === 'fulfilled'
      ? { text: openaiResult.value }
      : { error: openaiResult.reason?.message || 'Unknown error' },
    claude: claudeResult.status === 'fulfilled'
      ? { text: claudeResult.value }
      : { error: claudeResult.reason?.message || 'Unknown error' },
    gemini: geminiResult.status === 'fulfilled'
      ? { text: geminiResult.value }
      : { error: geminiResult.reason?.message || 'Unknown error' },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LLM Compare running at http://localhost:${PORT}`);
});
