# TriLLM

**One prompt. Three minds.**

TriLLM is an open-source tool that lets you run the same prompt against OpenAI (GPT), Anthropic (Claude), and Google (Gemini) simultaneously — so you can compare their responses side by side in one clean interface.

![TriLLM screenshot](https://via.placeholder.com/900x500/1a1d27/e2e8f0?text=TriLLM+Screenshot)

## Why TriLLM?

Switching between ChatGPT, Claude.ai, and Gemini to compare responses is tedious. TriLLM solves that by giving you a single interface where all three models answer at once. Perfect for:

- Evaluating which model best suits a specific task
- Researching differences in model reasoning and tone
- Benchmarking prompts during development
- Exploring how different AI models interpret the same question

## Features

- **Single prompt, three responses** — submit once, get answers from GPT, Claude, and Gemini in parallel
- **Model switcher** — choose between model versions (GPT-4o, GPT-4o-mini, Claude Sonnet/Opus/Haiku, Gemini 2.5 Flash/Pro) without touching code
- **Markdown rendering** — responses render with proper formatting, code blocks, and tables
- **Copy button** — copy any response to clipboard in one click
- **Response timing** — see how long each model took to respond
- **Dark UI** — easy on the eyes for extended use

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- API keys for the models you want to use

### Installation

```bash
git clone https://github.com/Nishanshetty/trillm.git
cd trillm
npm install
```

### Configuration

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env`:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
PORT=3000
```

You only need keys for the models you want to use — if a key is missing, that panel will show an error while the others still work.

### Run

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting API Keys

| Provider | Link | Free Tier |
|---|---|---|
| OpenAI | [platform.openai.com](https://platform.openai.com) | $5 free credit |
| Anthropic | [console.anthropic.com](https://console.anthropic.com) | $5 free credit |
| Google Gemini | [aistudio.google.com](https://aistudio.google.com) | Free tier available |

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML/CSS/JS
- **AI SDKs:** `openai`, `@anthropic-ai/sdk`, `@google/generative-ai`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](LICENSE)
