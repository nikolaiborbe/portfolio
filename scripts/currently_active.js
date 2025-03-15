import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

async function updateWakaTimeData() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) {
    console.error("Missing WAKATIME_API_KEY environment variable");
    process.exit(1);
  }

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);
  const heartbeatUrl = `https://wakatime.com/api/v1/users/current/heartbeats?date=${today}`;

  const authHeader = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');
  const commonHeaders = {
    'Authorization': authHeader,
    'User-Agent': 'WakaTime Update Script/1.0',
  };

  try {
    // Attempt to fetch heartbeat data for current project info
    let heartbeatData = null;
    try {
      console.log("Fetching heartbeat data from:", heartbeatUrl);
      const heartbeatResponse = await fetch(heartbeatUrl, {
        headers: commonHeaders
      });
      if (heartbeatResponse.ok) {
        const data = await heartbeatResponse.json();
        heartbeatData = data.data && data.data.length > 0 ? data.data.slice(-5) : [];
        
        // console.log("Heartbeat data fetched:", heartbeatData);
      } else {
        // If heartbeat fetch fails (e.g., 400 BAD REQUEST), log a warning.
        console.log(heartbeatResponse.err);
        console.warn(`Warning: Error fetching heartbeat data: ${heartbeatResponse.status} ${heartbeatResponse.statusText}`);
      }
    } catch (err) {
      console.error("Error fetching heartbeat data:", err);
    }

    // Write the combined data to static/wakatime.json
    const outputPath = path.join(process.cwd(), 'static', 'heartbeat.json');
    console.log("Writing combined data to:", outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(heartbeatData, null, 2));
    console.log("WakaTime data updated successfully.");
  } catch (error) {
    console.error("Error updating WakaTime data:", error);
    process.exit(1);
  }
}

updateWakaTimeData();
