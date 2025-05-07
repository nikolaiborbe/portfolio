// src/routes/api/check-wakatime/+server.js
import { json } from '@sveltejs/kit';
// static/private reads from your .env but never ships to the client
import { WAKATIME_API_KEY } from '$env/static/private';

export async function GET({ url }) {
  if (!WAKATIME_API_KEY) {
    return json({ error: 'Missing WAKATIME_API_KEY' }, { status: 500 });
  }

  const threshold = Number(url.searchParams.get('threshold')) || 60;
  const basicAuth = 'Basic ' + Buffer.from(WAKATIME_API_KEY).toString('base64');

  const res = await fetch(
    `https://api.wakatime.com/api/v1/users/nikolaiborbe/stats/last_7_days`,
    { headers: { Authorization: basicAuth } }
  );
  const payload = await res.json();
  if (!res.ok) return json({ error: 'WakaTime error', details: payload }, { status: res.status });

  const minutes = (payload.data.total_seconds || 0) / 60;
  return json({ result: minutes >= threshold }, { headers: { 'Access-Control-Allow-Origin': '*' } });
}