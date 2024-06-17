// 1. Initialize Server:
//    - Import express, cors, node-fetch
//    - Create express app instance
//    - Set port (use env var or default to 3000)

// 2. Configure Middleware:
//    - Apply cors middleware
//    - Use express.json() middleware

// 3. Set Authentication Token:
//    - Store auth token as a constant

// 4. Define /search Endpoint:
//    - POST route handler for /search
//      - Extract query from request body
//      - Try to fetch movie search results
//        - Construct API URL with query
//        - Include auth token in headers
//      - Process API response
//        - Parse JSON response
//        - Send search results back to client
//      - Error Handling
//        - Log/error message if fetch fails

// 5. Start Server:
//    - Listen on set port
//    - Log server startup message
// Import necessary modules
const express = require('express');
const fetch = require('node-fetch');

// Create an Express application instance
const app = express();

// Define the port number; use environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;


// Use Express middleware to parse incoming JSON 
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Store the authentication token as a constant
const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2Q2M2MwODY0NDkzZTJjZGI0OTQ0YWM4YzUwMzc2ZSIsInN1YiI6IjY2Njc0MDcyZTM0MzdjYzVlNWJlN2JlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Qv3TcXqa6dz2X10tOgS-QlAGe6z0wld8hhRbfx13n0';

// Define a GET route handler for '/'
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html'); // Serve the 'index.html' file
});

// Define a GET route handler for '/search'
app.get('/search', async (req, res) => {
  const query = req.query.query;

  // Check if query is empty or not provided
  if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Please provide a valid search query' });
  }
//  fetch data from api
  try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=Y43d63c0864493e2cdb4944ac8c50376e&query=${encodeURIComponent(query)}`, {
        // use authorization key variable created in the beginnig
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      });


      // datta being retrieved, with Keys from each object, 
      const data = await response.json();

      if (data.results) {
          const movieResults = data.results.map(movie => ({
              title: movie.title,
              posterPath: movie.poster_path,
              voteAverage: movie.vote_average,
              originalLanguage: movie.original_language
          }));
          // setting a limit of 10 movies to display
          res.json(movieResults.slice(0, 10));
      } else {
        // error messages if anything goes wrong
          res.status(500).json({ message: 'No results found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch movies' });
  }
});


// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
