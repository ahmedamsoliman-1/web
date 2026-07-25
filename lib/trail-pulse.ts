import "server-only";
import { TrailPulse } from "@aamsdn/trail-pulse";

let client: TrailPulse | undefined;

export function getTrailPulse() {
  if (client) return client;

  const endpoint = process.env.TRAILPULSE_URL;
  const secretKey = process.env.TRAILPULSE_SECRET_KEY;
  if (!endpoint || !secretKey) {
    throw new Error("Trail Pulse is not configured");
  }

  client = new TrailPulse({
    endpoint,
    secretKey,
    timeoutMs: 5_000,
    retries: 3,
  });

  return client;
}
