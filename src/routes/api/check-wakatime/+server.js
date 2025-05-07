// src/routes/api/check-wakatime/+server.js
import { json } from '@sveltejs/kit';
import { WAKATIME_API_KEY } from '$env/static/private';

const AUTH = 'Basic ' + Buffer.from(WAKATIME_API_KEY).toString('base64');

// --- helpers -----------------------------------------------------------

async function wakatime(path) {
  const res = await fetch(`https://api.wakatime.com/api/v1${path}`, {
    headers: { Authorization: AUTH }
  });
  const payload = await res.json();
  if (!res.ok) throw { status: res.status, payload };
  return payload;
}

// --- handler -----------------------------------------------------------

export async function GET({ url }) {
  const thresholdMin = Number(url.searchParams.get('threshold')) || 20;

  const now = new Date();
  const today = now.toISOString().slice(0, 10); // YYYY‑MM‑DD

  try {
    /* --------------------------------------------------------------
     * 1) Durations (needed in every outcome)
     * -------------------------------------------------------------- */
    const durPayload = await wakatime(`/users/current/durations?date=${today}`);
    const durations = durPayload.data ?? [];

    let totalSeconds = 0;
    const byProject = Object.create(null);

    for (const d of durations) {
      const secs = d.duration || 0;
      const name = d.project || 'unknown';
      totalSeconds += secs;
      byProject[name] = (byProject[name] || 0) + secs;
    }

    /* --------------------------------------------------------------
     * 2) Heartbeats → detect current activity
     * -------------------------------------------------------------- */
    const hbPayload = await wakatime(`/users/current/heartbeats?date=${today}`);
    const heartbeats = hbPayload.data ?? [];

    const thresholdMs = thresholdMin * 60_000;
    const recent = heartbeats.filter(hb => {
      const ts = (typeof hb.time === 'number'
        ? hb.time * 1_000        // epoch seconds → ms
        : new Date(hb.time).getTime());
      return now.getTime() - ts < thresholdMs;
    });

    if (recent.length > 0) {
      recent.sort((a, b) => b.time - a.time);
      const latest = recent[0];
      const project = latest.project || latest.alternate_project || 'unknown';

      return json(
        {
          result: true,           // actively coding
          project,
          seconds: Math.round(totalSeconds)
        },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    /* --------------------------------------------------------------
     * 3) Idle → top project of the day
     * -------------------------------------------------------------- */
    if (durations.length === 0) {
      return json(
        { result: false, project: null, seconds: 0 },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const topProject = Object.keys(byProject).reduce((a, b) =>
      byProject[a] > byProject[b] ? a : b
    );

    return json(
      {
        result: false,          // idle
        project: topProject,
        seconds: Math.round(totalSeconds)
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (err) {
    return json(
      { error: 'WakaTime error', details: err.payload || err },
      { status: err.status || 500 }
    );
  }
}