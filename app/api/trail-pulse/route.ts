import { NextRequest, NextResponse } from "next/server";

const EVENT_NAME = /^[a-z][a-z0-9_.-]{1,79}$/;

type TrailPulseEvent = {
  event?: unknown;
  user?: { id?: unknown };
  sessionId?: unknown;
  properties?: unknown;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.TRAIL_PULSE_API_KEY;
  const endpoint = process.env.TRAIL_PULSE_URL;
  if (!apiKey || !endpoint) {
    return NextResponse.json(
      { accepted: false, error: "Trail Pulse is not configured" },
      { status: 503 }
    );
  }

  let trailPulseUrl: URL;
  try {
    trailPulseUrl = new URL(endpoint);
    if (trailPulseUrl.protocol !== "https:") throw new Error("HTTPS required");
  } catch {
    return NextResponse.json(
      { accepted: false, error: "Trail Pulse URL is invalid" },
      { status: 503 }
    );
  }

  let body: TrailPulseEvent;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ accepted: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body.event !== "string" ||
    !EVENT_NAME.test(body.event) ||
    typeof body.user?.id !== "string" ||
    body.user.id.length > 128 ||
    typeof body.sessionId !== "string" ||
    body.sessionId.length > 128 ||
    (body.properties !== undefined &&
      (typeof body.properties !== "object" ||
        body.properties === null ||
        Array.isArray(body.properties)))
  ) {
    return NextResponse.json({ accepted: false, error: "Invalid event" }, { status: 400 });
  }

  try {
    const upstream = await fetch(trailPulseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: body.event,
        user: { id: body.user.id },
        sessionId: body.sessionId,
        properties: body.properties ?? {},
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    const responseBody = await upstream.json().catch(() => ({
      accepted: false,
      error: "Unexpected Trail Pulse response",
    }));

    return NextResponse.json(responseBody, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { accepted: false, error: "Trail Pulse is temporarily unavailable" },
      { status: 503 }
    );
  }
}
