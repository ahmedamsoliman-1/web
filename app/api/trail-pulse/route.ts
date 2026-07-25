import { TrailPulseError, type TrailPulseEvent } from "@aamsdn/trail-pulse";
import { NextRequest, NextResponse } from "next/server";
import { getTrailPulse } from "@/lib/trail-pulse";

export async function POST(request: NextRequest) {
  let event: TrailPulseEvent;
  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ accepted: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!event || typeof event !== "object" || Array.isArray(event)) {
    return NextResponse.json({ accepted: false, error: "Invalid event" }, { status: 400 });
  }

  try {
    const result = await getTrailPulse().track(event);
    return NextResponse.json(result, { status: 202 });
  } catch (error) {
    if (error instanceof TrailPulseError) {
      return NextResponse.json(
        { accepted: false, error: error.message, code: error.code },
        { status: error.status ?? (error.code === "invalid_input" ? 400 : 503) }
      );
    }

    return NextResponse.json(
      { accepted: false, error: "Trail Pulse is not configured" },
      { status: 503 }
    );
  }
}
