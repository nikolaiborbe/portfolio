import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const user = url.searchParams.get('user') || 'default-user';
  const threshold = Number(url.searchParams.get('threshold')) || 60;

  const res = await fetch(
    `https://wakatime.com/api/v1/users/${encodeURIComponent(user)}/stats/last_7_days`,
    { headers: { Authorization: `Bearer ${process.env.WAKATIME_API_KEY}` } }
  );
  if (!res.ok) return json({ error: 'WakaTime error' }, { status: 502 });

  const { data } = await res.json();
  const minutes = (data.total_seconds || 0) / 60;
  return json({ result: minutes >= threshold }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  });
}