
// create a piece of code that will append the information to the DOM seamlessly

//use Fetch to  gather data from the server search

// create a series of elements for the grid component in the future for CSS

// also with no room for errors, leave a message if the images do not show from the api saying something like, No poster available

// spend 1 minute to think of variable names no more

document.getElementById('movieSearchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const movieName = document.getElementById('movieName').value;
  
  // if there is no movie searched throw alert 
  if (movieName.trim() === '') {
      alert('Please enter a movie name');
      return;
  }

  // if there is any problem with the search query showe a message to the user Network not responding okay
  fetch(`/search?query=${encodeURIComponent(movieName)}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  // after the data is fetch, if everything is okay, create elements for the grid components
  .then(data => {
      const searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = ''; // Clear previous results
      data.forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie');
          const title = document.createElement('h2');
          title.textContent = movie.title;
          
          // Check if poster path exists before setting image source
          const image = document.createElement('img');
          if (movie.posterPath) {
              image.src = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
              image.alt = `${movie.title} Poster`;
          } else {
              image.src = 'placeholder.jpg'; // Placeholder image
              image.alt = 'No Poster Available';
          }
// append the elements to the dom adding the votes, language title and poster.
          const voteAverage = document.createElement('p');
          voteAverage.textContent = `Vote Average: ${movie.voteAverage}`;
          const originalLanguage = document.createElement('p');
          originalLanguage.textContent = `Original Language: ${movie.originalLanguage}`;
          movieDiv.appendChild(title);
          movieDiv.appendChild(image);
          movieDiv.appendChild(voteAverage);
          movieDiv.appendChild(originalLanguage);
          searchResults.appendChild(movieDiv);
      });
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});
