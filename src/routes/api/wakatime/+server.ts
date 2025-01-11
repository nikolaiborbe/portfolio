import { json } from '@sveltejs/kit';
import axios from 'axios';
import { Buffer } from 'buffer';

export async function GET() {
  const API_KEY = import.meta.env.VITE_WAKATIME_KEY;
  const url = 'https://api.wakatime.com/api/v1/users/current/heartbeats';
  const encode_api_key = Buffer.from(API_KEY).toString("base64");
  const date = new Date().toISOString().split("T")[0];

  try {
    console.log("Trying to fetch data from the server");
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${encode_api_key}` },
      params: {date},
    });
    return json(response.data); // Return data to the client
  } catch (error) {
    const err = error as { message: string; response?: { status: number } };
    return json({ error: err.message }, { status: err.response?.status || 500 });
  }
}
