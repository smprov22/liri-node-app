// require("dotenv").config();
// var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

if (command === `concert-this`) {
    bandsInTown()
} else if (command === `spotify-this-song` ) {
    spotify()
} else if (command === `movie-this`) {
    omdb()
} else if (command === `do-what-it-says`) {
    random()
}


//BANDS IN TOWN LIRI
// `node liri.js concert-this <artist/band name here>`
function bandsInTown() {
// * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
    var artistInput = process.argv.splice(3, process.argv.length - 1);
    var artist = artistInput.join("+");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    
    axios.get(queryURL).then(function(response) {

    // Printing the entire object to console
    console.log(response);

    //      * Name of the venue

    //      * Venue location

    //      * Date of the Event (use moment to format this as "MM/DD/YYYY")
    })
}
//SPOTIFY LIRI
// * This will show the following information about the song in your terminal/bash window

// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.


//OMBD LIRI
// `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//DO WHAT IT SAYS LIRI
// `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
