import { NextResponse } from "next/server";

export const runtime = "nodejs";

type TtsPayload = {
  text?: unknown;
};

function safeText(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, 3500) : "";
}

async function elevenLabsSpeech(text: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) {
    return null;
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.72,
        similarity_boost: 0.72,
        style: 0.24,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    throw new Error("ElevenLabs TTS failed");
  }

  return new Response(await response.arrayBuffer(), {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
      "Cache-Control": "no-store"
    }
  });
}

async function openAiSpeech(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
      voice: process.env.OPENAI_TTS_VOICE || "onyx",
      input: text,
      instructions: "Read in a deep, calm, devotional meditation-guide tone. Keep the Sanskrit slow and reverent."
    })
  });

  if (!response.ok) {
    throw new Error("OpenAI TTS failed");
  }

  return new Response(await response.arrayBuffer(), {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
      "Cache-Control": "no-store"
    }
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as TtsPayload;
    const text = safeText(payload.text);

    if (text.length < 8) {
      return NextResponse.json({ error: "No readable guidance text was supplied." }, { status: 400 });
    }

    const elevenLabs = await elevenLabsSpeech(text);
    if (elevenLabs) {
      return elevenLabs;
    }

    const openAi = await openAiSpeech(text);
    if (openAi) {
      return openAi;
    }

    return NextResponse.json(
      {
        mode: "browser-speech",
        message: "No server TTS key configured. The client should use browser speech synthesis."
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      {
        mode: "browser-speech",
        message: "Server TTS was unavailable. The client should use browser speech synthesis."
      },
      { status: 202, headers: { "Cache-Control": "no-store" } }
    );
  }
}
