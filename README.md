# Week 6: Asynchronous JavaScript

## Author
- **Name:** Mary Macharia
- **GitHub:** [@marymacharia521](https://github.com/marymacharia521)
- **Date:** April 18, 2026

## Project Description
This project covers asynchronous JavaScript concepts from Week 6, including callbacks, Promises, async/await, and API integration. The main deliverable is a Weather Dashboard that fetches live weather data from the OpenWeatherMap API.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Fetch API
- OpenWeatherMap API
- JSONPlaceholder API

## Features
- Search for a city and fetch live weather data
- Display loading and error states
- Show city name, weather icon, temperature, description, feels like, humidity, wind speed, and pressure
- Save and reuse the last 5 recent searches with `localStorage`
- Practice callbacks, Promise chaining, Promise.all, and async/await
- Practice GET and POST API requests with error handling

## Project Files
- `index.html` - Main Weather Dashboard page
- `lesson11.html` - Lesson 11 async exercises page
- `lesson12.html` - Lesson 12 API exercises page
- `styles.css` - Styling for the dashboard
- `app.js` - Weather Dashboard logic and API integration
- `async-exercises.js` - Lesson 11 asynchronous JavaScript exercises
- `api-exercises.js` - Lesson 12 API exercises

## How to Run
1. Clone this repository.
2. Open the project folder.
3. Add your OpenWeatherMap API key in `app.js`.
4. Open `index.html` in your browser.
5. Open `lesson11.html` to view the Lesson 11 exercises.
6. Open `lesson12.html` to view the Lesson 12 exercises.

## Important Note
The Weather Dashboard will not return live results until you replace `YOUR_OPENWEATHERMAP_API_KEY` in `app.js` with your own API key.

## Lessons Learned
- How asynchronous code runs differently from synchronous code
- How callbacks can become hard to manage
- How Promises improve readability and control flow
- How async/await makes API code easier to write and understand
- How to handle loading states and errors in real applications

## Challenges Faced
- Handling missing city names and invalid API responses
- Structuring code clearly for both exercises and the final project
- Saving recent searches without duplicates and limiting them to the latest five results

## Screenshots (optional)
![Weather Dashboard screenshot](path/to/screenshot.png)

## Live Demo
- Add your deployed link here after publishing the project
