
const readline = require("readline");
const https = require("https");
const API_KEY = "72b878e29351423b3a9953714899aea6"; // Replace with your actual API key
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function to make HTTP requests
const makeRequest = (url) => {
  // TODO: Return a Promise that resolves with the parsed JSON data or rejects with an error
  // Use the Node.js https module to make the request
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          if (response.statusCode === 404) {
            reject(new Error("City not found. Please try another location."));
          } else {
            reject(
              new Error(
                `API request failed with status code: ${response.statusCode}`
              )
            );
          }
          return;
        }

        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(new Error("Failed to parse API response."));
          }
        });
      })
      .on("error", (error) => {
        reject(new Error(`Network error: ${error.message}`));
      });
  });
};

// Fetch current weather data for a given city
const fetchWeatherData = async (city) => {
  try {
    const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;
    return await makeRequest(url);
  } catch (error) {
    throw error;
  }
};

// Fetch forecast data for a given city
const fetchForecastData = async (city) => {
  try {
    const url = `${API_BASE_URL}/forecast?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;
    const data = await makeRequest(url);

    // Process the forecast data to get one forecast per day
    const forecastMap = {};
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      if (!forecastMap[date] || new Date(item.dt * 1000).getHours() === 12) {
        forecastMap[date] = item;
      }
    });

    return Object.values(forecastMap).slice(0, 5);
  } catch (error) {
    throw error;
  }
};

// Display current weather data in the console
const displayWeatherData = (weatherData) => {
  console.log("\n===== CURRENT WEATHER =====");
  console.log(`Location: ${weatherData.name}, ${weatherData.sys.country}`);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(`Date: ${currentDate}`);
  console.log(`Temperature: ${Math.round(weatherData.main.temp)}°C`);

  const description = weatherData.weather[0].description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  console.log(`Conditions: ${description}`);
  console.log(`Humidity: ${weatherData.main.humidity}%`);
  console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
  console.log(`Pressure: ${weatherData.main.pressure} hPa`);
};

// Display forecast data in the console
const displayForecastData = (forecastData) => {
  console.log("\n===== 5-DAY FORECAST =====");

  forecastData.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const description = forecast.weather[0].description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    console.log(`\n${date}:`);
    console.log(`  Temperature: ${Math.round(forecast.main.temp)}°C`);
    console.log(`  Conditions: ${description}`);
    console.log(`  Humidity: ${forecast.main.humidity}%`);
    console.log(`  Wind Speed: ${forecast.wind.speed} m/s`);
  });
};

// Main function to handle the weather search
const handleWeatherSearch = async (city) => {
  if (!city) {
    console.error("Error: Please enter a city name");
    return;
  }

  console.log(`Fetching weather data for ${city}...`);

  try {
    // Fetch both current weather and forecast data concurrently
    const [weatherData, forecastData] = await Promise.all([
      fetchWeatherData(city),
      fetchForecastData(city),
    ]);

    // Display the data
    displayWeatherData(weatherData);
    displayForecastData(forecastData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};


const main = async () => {
  console.log("=========================");
  console.log("    WEATHER DASHBOARD    ");
  console.log("=========================");

  // Check if a city was provided as a command-line argument
  const args = process.argv.slice(2);
  if (args.length > 0) {
    const city = args.join(" ");
    await handleWeatherSearch(city);
    rl.close();
    return;
  }

  // Otherwise, prompt for input
  const promptUser = () => {
    rl.question('Enter a city name (or "exit" to quit): ', async (input) => {
      const city = input.trim();

      if (city.toLowerCase() === "exit" || city.toLowerCase() === "quit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }

      await handleWeatherSearch(city);
      promptUser(); // Prompt again for another query
    });
  };

  promptUser();
};

// Start the application
main().catch((error) => {
  console.error(`Fatal error: ${error.message}`);
  process.exit(1);
});