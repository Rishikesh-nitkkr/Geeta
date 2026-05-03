import { NextResponse } from "next/server";
import { createGuidance } from "@/lib/guidance";

export const runtime = "nodejs";

type GuidancePayload = {
  query?: unknown;
  situation?: unknown;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GuidancePayload;
    const query = typeof payload.query === "string" ? payload.query.trim() : "";
    const situation = typeof payload.situation === "string" ? payload.situation : undefined;

    if (query.length < 6) {
      return NextResponse.json({ error: "Please share a little more about what you are facing." }, { status: 400 });
    }

    if (query.length > 1200) {
      return NextResponse.json({ error: "Please keep your question under 1200 characters." }, { status: 400 });
    }

    const response = createGuidance(query, situation);

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json({ error: "The guidance request could not be read. Please try again." }, { status: 400 });
  }
}
