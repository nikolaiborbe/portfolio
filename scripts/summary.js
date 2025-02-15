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
  const summaryUrl = `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`;

  const authHeader = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');
  const commonHeaders = {
    'Authorization': authHeader,
    'User-Agent': 'WakaTime Update Script/1.0'
  };

  try {
    // Fetch summary data (daily totals, project aggregates, etc.)
    console.log("Fetching summary data from:", summaryUrl);
    const summaryResponse = await fetch(summaryUrl, {
      headers: commonHeaders
    });
    if (!summaryResponse.ok) {
      console.error(`Error fetching summary data: ${summaryResponse.status} ${summaryResponse.statusText}`);
      process.exit(1);
    }
    const summaryData = await summaryResponse.json();
    console.log("Summary data fetched:", summaryData);

    // Write the combined data to static/wakatime.json
    const outputPath = path.join(process.cwd(), 'static', 'coded_today.json');
    console.log("Writing combined data to:", outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(summaryData, null, 2));
    console.log("WakaTime data updated successfully.");
  } catch (error) {
    console.error("Error updating WakaTime data:", error);
    process.exit(1);
  }
}

updateWakaTimeData();
