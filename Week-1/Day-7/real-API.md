# Code Challenge: Real-world API Integration - CLI Weather App

## Problem Statement

In modern JavaScript applications, fetching and processing data from external APIs is a common and essential operation. Understanding how to handle asynchronous API requests efficiently is crucial for building responsive and reliable applications, whether they're running in a browser or on a server with Node.js.

This challenge focuses on building a command-line weather application that demonstrates real-world API integration using asynchronous JavaScript patterns. You'll create a Node.js program that allows users to fetch and display current weather conditions and forecasts for specified locations. This hands-on project will help you apply all the asynchronous patterns we've studied this week—callbacks, promises, and async/await—in a practical context while handling real-world concerns like API errors, data processing, and user interaction.

## Function Signature

```javascript
// Helper function to make HTTP requests
const makeRequest = (url) => {
  // TODO: Return a Promise that resolves with the parsed JSON data or rejects with an error
  // Use the Node.js https module to make the request
};

// Fetch current weather data for a given city
const fetchWeatherData = async (city) => {
  // TODO: Construct the API URL with the city and API key
  // TODO: Use the makeRequest helper to fetch the data
  // TODO: Return the weather data or throw appropriate errors
};

// Fetch forecast data for a given city
const fetchForecastData = async (city) => {
  // TODO: Construct the API URL with the city and API key
  // TODO: Use the makeRequest helper to fetch the data
  // TODO: Process the forecast data to get one forecast per day
  // TODO: Return the processed forecast data or throw appropriate errors
};

// Display current weather data in the console
const displayWeatherData = (weatherData) => {
  // TODO: Extract and format the relevant data from the weatherData object
  // TODO: Display the formatted data in the console using console.log
};

// Display forecast data in the console
const displayForecastData = (forecastData) => {
  // TODO: Loop through the forecast data array
  // TODO: Extract and format the relevant data for each forecast day
  // TODO: Display the formatted data in the console using console.log
};

// Main function to handle the weather search
const handleWeatherSearch = async (city) => {
  // TODO: Validate the city input
  // TODO: Show a loading message
  // TODO: Fetch both current weather and forecast data using Promise.all
  // TODO: Handle errors appropriately
  // TODO: Display the data using the display functions
};
```

## Input

- A city name provided either as a command-line argument or through interactive input
- The application should accept a single string representing a city name (e.g., "London", "New York", "Tokyo")

## Output

- Formatted console output showing:
  - Current weather conditions including location, temperature, weather description, humidity, wind speed, and pressure
  - 5-day forecast showing date, temperature, conditions, and humidity for each day
- Appropriate error messages for invalid inputs or API failures

## Example

### Input:

```
node weather-app.js London
```

or in interactive mode:

```
Enter a city name (or "exit" to quit): London
```

### Output:

```
Fetching weather data for London...

===== CURRENT WEATHER =====
Location: London, GB
Date: Monday, March 30, 2025
Temperature: 15°C
Conditions: Partly Cloudy
Humidity: 70%
Wind Speed: 5.1 m/s
Pressure: 1012 hPa

===== 5-DAY FORECAST =====

Tue, Mar 31:
  Temperature: 16°C
  Conditions: Mostly Sunny
  Humidity: 65%
  Wind Speed: 4.8 m/s

Wed, Apr 1:
  Temperature: 14°C
  Conditions: Scattered Showers
  Humidity: 75%
  Wind Speed: 6.2 m/s

[... additional forecast days ...]
```

## Constraints

- Use the Node.js built-in `https` module for making HTTP requests
- Use the OpenWeatherMap API (free tier) or another free public weather API
- Implement proper error handling for network failures, invalid city names, etc.
- Use async/await for asynchronous operations
- Show appropriate loading messages during API calls
- Keep your API keys secure (store them as a constant at the top of your file)
- Handle both command-line arguments and interactive input using the readline module

## Testing the Script

```javascript
// Test with a valid city by command-line argument
// node weather-app.js Tokyo

// Test with interactive input
// When prompted, enter valid and invalid cities:
// - "London" (valid city)
// - "NonExistentCity123456" (invalid city)
// - "" (empty input)

// Expected outputs:
// 1. Valid city: Display weather data
// 2. Invalid city: "Error: City not found. Please try another location."
// 3. Empty input: "Error: Please enter a city name"
```

## Bonus Challenge

Extend your CLI weather app to include:
1. Temperature unit conversion between Celsius and Fahrenheit
2. Weather data caching to minimize API calls for recently searched cities
3. Ability to get weather by coordinates (latitude/longitude)
4. Colored output using a library like chalk to improve readability
5. A simple history feature that remembers and allows recall of recent searches

## Detailed Explanation & Expanded Instructions

### **Spoilers Ahead**

### Step 1: Understanding the Problem

This challenge requires building a command-line Node.js application that interacts with a weather API to retrieve and display current weather conditions and forecasts for a given city. The key components include:

1. **HTTP Requests**: Making asynchronous HTTP requests to the OpenWeatherMap API to fetch weather data.
2. **Data Processing**: Parsing the JSON response and extracting relevant information.
3. **Command-Line Interface**: Creating a user-friendly interface that accepts both command-line arguments and interactive input.
4. **Error Handling**: Handling various error scenarios such as network failures, invalid inputs, and API limitations.

The OpenWeatherMap API provides several endpoints, but we'll focus on two:
- `/weather` endpoint for current weather data
- `/forecast` endpoint for 5-day forecast data

You'll need to sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api) to make requests.

### Step 2: Implementing the Functions

Let's break down the implementation into steps:

**Approach 1: Using Node.js https module with Promises**

1. First, set up the required modules and constants:

```javascript
const readline = require('readline');
const https = require('https');
const API_KEY = 'your_api_key'; // Replace with your actual API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

2. Implement the HTTP request helper function:

```javascript
const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        if (response.statusCode === 404) {
          reject(new Error('City not found. Please try another location.'));
        } else {
          reject(new Error(`API request failed with status code: ${response.statusCode}`));
        }
        return;
      }

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          reject(new Error('Failed to parse API response.'));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });
  });
};
```

3. Implement the weather data fetching functions:

```javascript
const fetchWeatherData = async (city) => {
  try {
    const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    return await makeRequest(url);
  } catch (error) {
    throw error;
  }
};

const fetchForecastData = async (city) => {
  try {
    const url = `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const data = await makeRequest(url);
    
    // Process the forecast data to get one forecast per day
    const forecastMap = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
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
```

4. Implement the display functions:

```javascript
const displayWeatherData = (weatherData) => {
  console.log('\n===== CURRENT WEATHER =====');
  console.log(`Location: ${weatherData.name}, ${weatherData.sys.country}`);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  console.log(`Date: ${currentDate}`);
  console.log(`Temperature: ${Math.round(weatherData.main.temp)}°C`);
  
  const description = weatherData.weather[0].description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  console.log(`Conditions: ${description}`);
  console.log(`Humidity: ${weatherData.main.humidity}%`);
  console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
  console.log(`Pressure: ${weatherData.main.pressure} hPa`);
};

const displayForecastData = (forecastData) => {
  console.log('\n===== 5-DAY FORECAST =====');
  
  forecastData.forEach(forecast => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    const description = forecast.weather[0].description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    console.log(`\n${date}:`);
    console.log(`  Temperature: ${Math.round(forecast.main.temp)}°C`);
    console.log(`  Conditions: ${description}`);
    console.log(`  Humidity: ${forecast.main.humidity}%`);
    console.log(`  Wind Speed: ${forecast.wind.speed} m/s`);
  });
};
```

5. Implement the main function to handle the weather search:

```javascript
const handleWeatherSearch = async (city) => {
  if (!city) {
    console.error('Error: Please enter a city name');
    return;
  }
  
  console.log(`Fetching weather data for ${city}...`);
  
  try {
    // Fetch both current weather and forecast data concurrently
    const [weatherData, forecastData] = await Promise.all([
      fetchWeatherData(city),
      fetchForecastData(city)
    ]);
    
    // Display the data
    displayWeatherData(weatherData);
    displayForecastData(forecastData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
```

**Approach 2: Using a third-party HTTP client like Axios**

If you were to use Axios (which would require installing it as a dependency), the implementation would be more concise:

```javascript
const axios = require('axios');

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found. Please try another location.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};
```

The main advantage of Axios is its simpler API and automatic JSON parsing, but the built-in https module is more than capable for our needs.

6. Finally, set up the main application flow:

```javascript
const main = async () => {
  console.log('=========================');
  console.log('    WEATHER DASHBOARD    ');
  console.log('=========================');
  
  // Check if a city was provided as a command-line argument
  const args = process.argv.slice(2);
  if (args.length > 0) {
    const city = args.join(' ');
    await handleWeatherSearch(city);
    rl.close();
    return;
  }
  
  // Otherwise, prompt for input
  const promptUser = () => {
    rl.question('Enter a city name (or "exit" to quit): ', async (input) => {
      const city = input.trim();
      
      if (city.toLowerCase() === 'exit' || city.toLowerCase() === 'quit') {
        console.log('Goodbye!');
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
main().catch(error => {
  console.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
```

### Step 3: Testing the Functions

To test the application properly, you'll need:

1. A valid API key from OpenWeatherMap
2. Node.js installed on your computer

**Test Cases**

1. Test Case 1: Valid city through command-line argument
   - Input: `node weather-app.js London`
   - Expected Output: Weather data for London displayed correctly

2. Test Case 2: Valid city through interactive input
   - Input: When prompted, enter "Tokyo"
   - Expected Output: Weather data for Tokyo displayed correctly

3. Test Case 3: Invalid city
   - Input: When prompted, enter "NonExistentCity123456"
   - Expected Output: Error message "City not found. Please try another location."

4. Test Case 4: Empty input
   - Input: When prompted, press Enter without typing anything
   - Expected Output: Error message "Please enter a city name"

5. Test Case 5: Exit command
   - Input: When prompted, enter "exit"
   - Expected Output: "Goodbye!" and the application terminates

## Time and Space Complexity

- Time Complexity: O(n) where n is the number of forecast items returned by the API, as we process them to extract one forecast per day.
- Space Complexity: O(n) for storing the API responses and the processed forecast data.

The main performance considerations are:
1. Network latency for API requests
2. Data processing for the forecast information

## References

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Node.js HTTPS Module](https://nodejs.org/api/https.html)
- [Node.js Readline Module](https://nodejs.org/api/readline.html)
- [JavaScript Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Working with JSON in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

## Related Problems

- Building a currency converter CLI using exchange rate APIs
- Creating a GitHub repository stats viewer using the GitHub API
- Implementing a command-line news reader using news APIs
- Developing a stock price checker using financial APIs

## Key Takeaways

- Real-world API integration requires proper error handling for network issues, invalid inputs, and API limitations
- Using async/await makes asynchronous code more readable and maintainable
- Promise.all() allows you to make multiple API requests concurrently for better performance
- Processing API responses often requires data transformation to match your application's needs
- Command-line applications can provide a simple but effective way to demonstrate asynchronous JavaScript concepts
- Node.js built-in modules like https and readline provide powerful tools for building CLI applications

## Notes

This CLI weather dashboard demonstrates the practical application of asynchronous JavaScript patterns. Some potential enhancements include:

1. **Data persistence**: Store recently searched cities in a local file
2. **Configuration**: Allow users to set preferences like temperature units (Celsius/Fahrenheit)
3. **More detailed data**: Add support for hourly forecasts or historical data
4. **Interactive UI**: Use libraries like inquirer.js or chalk for a more interactive and visually appealing CLI
5. **Geolocation support**: Allow users to get weather for their current location using IP-based geolocation

Remember that OpenWeatherMap and most weather APIs have rate limits on the free tier, so consider implementing caching to minimize API calls for frequently searched locations.
