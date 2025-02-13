const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const base64 = require('base-64');

async function updateWakaTimeData() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) {
    console.error("Missing WAKATIME_API_KEY environment variable");
    process.exit(1);
  }

  // Using the heartbeats endpoint as an example.
  // Adjust the URL if you need different data.
  const url = 'https://wakatime.com/api/v1/users/current/heartbeats';
  const authHeader = 'Basic ' + base64.encode(apiKey + ':');

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      console.error(`Error fetching data: ${response.status} ${response.statusText}`);
      process.exit(1);
    }

    const data = await response.json();

    // Optionally process the data here (e.g., calculate today’s coding time, top project, etc.)
    // For now, we simply write the entire JSON response.
    const outputPath = path.join(__dirname, '..', 'static', 'wakatime.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log("WakaTime data updated successfully.");
  } catch (error) {
    console.error("Error updating WakaTime data:", error);
    process.exit(1);
  }
}

updateWakaTimeData();
