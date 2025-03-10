const axios = require('axios');

axios.get('http://localhost:5000/api/movies/liked')
    .then(response => {
        console.log('Liked Movies:', response.data);
    })
    .catch(error => {
        console.error('Error fetching liked movies:', error.response ? error.response.data : error.message);
    });
