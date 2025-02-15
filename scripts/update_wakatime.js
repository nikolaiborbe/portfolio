import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

async function updateWakaTimeHeartbeats() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) {
    console.error("Missing WAKATIME_API_KEY environment variable");
    process.exit(1);
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);
  const heartbeatsUrl = `https://wakatime.com/api/v1/users/current/heartbeats?date=${today}`;
  const summaryUrl = `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`;

  const authHeader = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');
  const headers = {
    'Authorization': authHeader,
    'User-Agent': 'WakaTime Heartbeats Script/1.0'
  };

  let summaryData = null;
  let heartbeatData = null;

  try {
    // Fetch summary data (daily totals, project aggregates, etc.)
    console.log("Fetching summary data from:", summaryUrl);
    const summaryResponse = await fetch(summaryUrl, { headers });
    if (!summaryResponse.ok) {
      console.error(`Error fetching summary data: ${summaryResponse.status} ${summaryResponse.statusText}`);
      process.exit(1);
    }
    summaryData = await summaryResponse.json();
    console.log("Summary data fetched:", summaryData);
  } catch (error) {
    console.error("Error fetching summary data:", error);
    process.exit(1);
  }

  try {
    // Fetch heartbeat data for current project info
    console.log("Fetching heartbeat data from:", heartbeatsUrl);
    const heartbeatResponse = await fetch(heartbeatsUrl, { headers });
    if (!heartbeatResponse.ok) {
      console.error(`Error fetching heartbeat data: ${heartbeatResponse.status} ${heartbeatResponse.statusText}`);
      process.exit(1);
    }
    heartbeatData = await heartbeatResponse.json();
    console.log("Heartbeat data fetched:", heartbeatData);

    // Write the heartbeat data to static/wakatime_heartbeats.json
    const heartbeatOutputPath = path.join(process.cwd(), 'static', 'wakatime_heartbeats.json');
    console.log("Writing heartbeat data to:", heartbeatOutputPath);
    fs.writeFileSync(heartbeatOutputPath, JSON.stringify(heartbeatData, null, 2));
    console.log("WakaTime heartbeat data updated successfully.");
  } catch (error) {
    console.error("Error updating WakaTime heartbeat data:", error);
    process.exit(1);
  }

  try {
    // Combine summary and heartbeat data and write to file.
    const combinedData = {
      summary: summaryData,
      heartbeat: heartbeatData
    };

    const combinedOutputPath = path.join(process.cwd(), 'static', 'wakatime.json');
    console.log("Writing combined data to:", combinedOutputPath);
    fs.writeFileSync(combinedOutputPath, JSON.stringify(combinedData, null, 2));
    console.log("WakaTime data updated successfully.");
  } catch (error) {
    console.error("Error writing combined WakaTime data:", error);
    process.exit(1);
  }
}

updateWakaTimeHeartbeats();
