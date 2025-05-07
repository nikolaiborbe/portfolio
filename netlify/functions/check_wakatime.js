// netlify/functions/check-wakatime.js
import fetch from "node-fetch";

export async function handler(event) {
  const params = event.queryStringParameters || {};
  const user = params.user || "default‑user";
  const threshold = Number(params.threshold) || 60;

  // Call WakaTime API from the server
  const apiRes = await fetch(
    `https://wakatime.com/api/v1/users/${encodeURIComponent(user)}/stats/last_7_days`,
    { headers: { Authorization: `Bearer ${process.env.WAKATIME_API_KEY}` } }
  );

  if (!apiRes.ok) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "WakaTime API error", status: apiRes.status })
    };
  }

  const data = await apiRes.json();
  const totalMinutes = (data.data.total_seconds || 0) / 60;
  const result = totalMinutes >= threshold;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ result })
  };
}