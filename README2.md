# Krishna / Geeta AI

An immersive Next.js app for Bhagavad Gita guidance, devotional ambience, meditation, and Krishna-inspired life coaching.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Vitest

## Project Structure

```text
geeta-ai/
  app/                 Next.js app routes and API routes
  components/          Krishna AI UI
  lib/                 Gita data, guidance logic, and shared types
  public/              Images, video, and public assets
  package.json         Scripts and dependencies
  package-lock.json    Locked dependency versions
```

## Run Locally

```bash
cd geeta-ai
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Optional Environment

Copy `geeta-ai/.env.example` to `geeta-ai/.env.local` and add keys only if you want premium provider features.

- `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` for ElevenLabs voice
- `OPENAI_API_KEY` for OpenAI TTS
- `DID_API_KEY` and `DID_SOURCE_URL` for provider-generated avatar video

Without paid keys, the app still runs locally with built-in fallback behavior.

## Checks

```bash
cd geeta-ai
npm run lint
npm test
npm run build
```
