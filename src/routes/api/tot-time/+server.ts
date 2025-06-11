

import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { WAKATIME_API_KEY } from '$env/static/private';

const AUTH = 'Basic ' + Buffer.from(WAKATIME_API_KEY).toString('base64');

// --- helpers -----------------------------------------------------------

async function wakatime<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`https://api.wakatime.com/api/v1${path}`, {
    headers: { Authorization: AUTH }
  });
  const payload = await res.json();
  if (!res.ok) throw { status: res.status, payload };
  return payload;
}

// --- types -------------------------------------------------------------
interface AllTimeResponse {
  data: {
    total_seconds: number;
    text: string;
    digital: string;
    decimal: string;
    daily_average: number;
    range: Record<string, unknown>;
  };
}

// --- handler -----------------------------------------------------------

/**
 * GET /api/tot-time
 *
 * Optional query params:
 *   - project: string   // limit lifetime total to a specific project
 *
 * Response:
 *   {
 *     seconds:   number, // total lifetime seconds
 *     text:      string, // human‑readable, eg "1,234 hrs 5 mins"
 *     digital:   string, // digital clock, eg "1234:05"
 *     decimal:   string, // decimal hours, eg "1234.08"
 *     dailyAverage: number, // average per day (seconds)
 *     range: { … }      // full range metadata from WakaTime
 *   }
 */
export const GET: RequestHandler = async ({ url }) => {
  const project = url.searchParams.get('project');

  try {
    const endpoint = project
      ? `/users/current/all_time_since_today?project=${encodeURIComponent(project)}`
      : '/users/current/all_time_since_today';

    const { data } = await wakatime<AllTimeResponse>(endpoint);

    return json(
      {
        seconds: Math.round(data.total_seconds || 0),
        text: data.text,
        digital: data.digital,
        decimal: data.decimal,
        dailyAverage: data.daily_average,
        range: data.range
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err: unknown) {
    const e = err as { status?: number; payload?: unknown };
    return json(
      { error: 'WakaTime error', details: e.payload ?? e },
      { status: e.status ?? 500 }
    );
  }
};