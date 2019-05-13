require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];

if (command === `concert-this`) {
    bandsInTown()
} else if (command === `spotify-this-song` ) {
    spotifySong()
} else if (command === `movie-this`) {
    omdb()
} else if (command === `do-what-it-says`) {
    doWhatItSays()
}


//BANDS IN TOWN LIRI
// `node liri.js concert-this <artist/band name here>`
function bandsInTown() {
// * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
    var artistInput = process.argv.splice(3, process.argv.length - 1);
    var artist = artistInput.join("+");
    var artistFormat = artistInput.join(" ");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response) {
        // returns a console log if arist has no concerts coming up
        if (!response.data.length) {
            console.log("No results found for " + artistFormat);
            return;
          }
        
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        var date = response.data[1].datetime;
        var dateFormat = moment(date).format('MMMM Do, YYYY');

        console.log("The next " + artistFormat + " concert is on " + dateFormat + " at the " + response.data[0].venue.name + " in " + response.data[0].venue.city + ", " + (response.data[0].venue.region || response.data[0].venue.country) + ".");
         
    })
}
//SPOTIFY LIRI
// * This will show the following information about the song in your terminal/bash window
function spotifySong() {
    var songName = process.argv.splice(3, process.argv.length - 1);

    if (songName === undefined) {
        songName = "The Sign";
      }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        // console.log(data.tracks.items); 
        var song = data.tracks.items;
      
    

    // * The song's name
        console.log("You searched: " + song[0].name);
    // * Artist(s)
        console.log("Artist: " + song[0].artists[0].name);
    // * The album that the song is from
        console.log("That song is on the album titled: " + song[0].album.name);
    // * A preview link of the song from Spotify
        console.log("Preview song: " + song[0].preview_url);
    
    // * If no song is provided then your program will default to "The Sign" by Ace of Base.
    });
}
//OMBD LIRI
// `node liri.js movie-this '<movie name here>'`
function omdb() {

    var movieName = process.argv.splice(3, process.argv.length - 1);
    var onlyName = movieName.join("+");

    var queryUrl = "http://www.omdbapi.com/?t=" + onlyName + "&y=&plot=short&apikey=trilogy";

    if (movieName === undefined) {
        movieName = "Mr Nobody";
      }
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    //      ```
    axios.get(queryUrl).then(
        function(response) {
          // Then log the Release Year for the movie
            console.log("You searched: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB rating: " + response.data.Ratings[0].Value);
            console.log("Rotton Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log(response.data.Title + " was produced in " + response.data.Country + " and features the following languages: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log(response.data.Title + " stars: " + response.data.Actors);
        }
      );

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
}
//DO WHAT IT SAYS LIRI
// `node liri.js do-what-it-says`
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
  
      var dataArr = data.split(",");
  

    });
  };
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
