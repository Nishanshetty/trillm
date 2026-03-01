# I Built a Tool to Compare GPT, Claude, and Gemini Side by Side — and It Solved My Biggest AI Frustration

Every week I find myself doing the same thing: copying a prompt, pasting it into ChatGPT, reading the response, opening a new tab for Claude, pasting it again, reading that response, then opening Gemini and doing it a third time.

It's tedious. And by the time I get to the third response, I've already half-forgotten the first one.

So I built **TriLLM** — a simple open-source tool that lets you type a prompt once and instantly see responses from all three models in one place.

---

## The Problem

We're living in an era where no single AI model dominates every task. GPT-4o is great at structured reasoning and code. Claude tends to write more naturally and handles nuance well. Gemini excels at tasks involving recent information and multimodal content.

The smart approach isn't picking one model and sticking to it — it's knowing *which* model to reach for based on the task. But that's hard to learn when you're switching between three separate browser tabs and losing context every time.

---

## What TriLLM Does

TriLLM is a local web app you run on your machine. You type a prompt once, hit Compare, and within seconds you get three responses side by side — one from OpenAI, one from Anthropic's Claude, and one from Google's Gemini.

**Features:**
- Responses appear in parallel (all three models run simultaneously)
- Choose which version of each model to use (GPT-4o, GPT-4o-mini, Claude Sonnet, Claude Opus, Gemini 2.5 Flash, etc.)
- Responses render with proper markdown — code blocks, tables, bullet points all formatted correctly
- Copy any response to clipboard in one click
- See how long each model took to respond
- Clean dark interface built for focus

---

## How to Set It Up (5 Minutes)

You'll need Node.js installed and API keys from the providers you want to use. All three have free tiers or trial credits, so you can get started for free.

**Step 1: Clone the repo**

```bash
git clone https://github.com/Nishanshetty/trillm.git
cd trillm
npm install
```

**Step 2: Add your API keys**

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
```

You can get keys here:
- OpenAI: [platform.openai.com](https://platform.openai.com)
- Anthropic: [console.anthropic.com](https://console.anthropic.com)
- Google Gemini: [aistudio.google.com](https://aistudio.google.com)

**Step 3: Run it**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) and start comparing.

---

## What I've Learned From Using It

Once you have all three responses visible at once, patterns emerge fast. A few things I've noticed:

**Tone differs a lot.** Ask all three to explain a complex topic and Claude tends to be the most conversational, GPT the most structured, and Gemini the most factual.

**Code quality varies by language.** For Python and JavaScript, GPT-4o tends to produce the most idiomatic code. For newer frameworks, the gap narrows.

**Claude is better at saying "I don't know."** When asked about something ambiguous or uncertain, Claude is more likely to flag its uncertainty. GPT and Gemini sometimes confidently produce plausible-sounding but wrong answers.

**Response length varies dramatically.** Same prompt, and one model might write three sentences while another writes five paragraphs. TriLLM makes this immediately obvious.

---

## The Tech (For the Curious)

TriLLM is deliberately simple — about 300 lines of code total.

- **Backend:** Node.js + Express with three API calls running in parallel via `Promise.allSettled`
- **Frontend:** Vanilla HTML, CSS, and JavaScript — no framework, no build step
- **AI SDKs:** Official packages from each provider (`openai`, `@anthropic-ai/sdk`, `@google/generative-ai`)

Using `Promise.allSettled` instead of `Promise.all` means if one API fails (wrong key, rate limit, etc.) the other two still return their results — the broken panel just shows an error.

The whole thing runs locally, so your prompts never pass through any third-party server. They go directly from your machine to each AI provider's API.

---

## What's Next

A few things on my list:
- Export comparisons to PDF or markdown
- Save prompt history
- Support for additional models (Mistral, Llama via Ollama, etc.)
- A system prompt field for testing across different personas

If any of those sound useful — or if you have other ideas — the repo is open. PRs are welcome.

---

**GitHub:** [github.com/Nishanshetty/trillm](https://github.com/Nishanshetty/trillm)

If you found this useful, share it with someone who spends too much time switching between AI tabs. That's most people I know.

---

*Built in an afternoon because I was tired of the tab-switching. Sometimes the best tools are the ones you build to scratch your own itch.*
