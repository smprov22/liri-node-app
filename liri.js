require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];
var argument = process.argv.slice(3).join(" ");

if (command === `concert-this`) {
    bandsInTown(argument)
} else if (command === `spotify-this-song` ) {
    spotifySong(argument)
} else if (command === `movie-this`) {
    omdb(argument)
} else if (command === `do-what-it-says`) {
    doWhatItSays()
}


//BANDS IN TOWN LIRI
// `node liri.js concert-this <artist/band name here>`
function bandsInTown(artistInput) {
    var artist = artistInput.split(" ").join("+");
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    axios.get(queryURL).then(function(response) {
        // returns a console log if arist has no concerts coming up
        if (!response.data.length) {
            console.log("No results found for " + artistInput);
            return;
          }
        
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        var date = response.data[1].datetime;
        var dateFormat = moment(date).format('MMMM Do, YYYY');
        // console.log(queryURL);
        console.log("The next " + artistInput + " concert is on " + dateFormat + " at the " + response.data[0].venue.name + " in " + response.data[0].venue.city + ", " + (response.data[0].venue.region || response.data[0].venue.country) + ".");
         
    })
}
//SPOTIFY LIRI
function spotifySong(songName) {

    // * If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (songName.length < 1) {
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
    });
}
//OMBD LIRI
// `node liri.js movie-this '<movie name here>'`
function omdb(movieName) {

    if (movieName.length < 1) {
        movieName = "Mr+Nobody";
      }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
   
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
        });
}

//DO WHAT IT SAYS LIRI
// `node liri.js do-what-it-says`
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
    //   console.log(data);
    if (error) {
        return console.log(error);
      }
    var dataArr = data.split(",");

    if(dataArr[0] === "spotify-this-song") {
        spotifySong(dataArr[1]);
    } else if (dataArr[0] === "movie-this") {
        omdb(dataArr[1]);
    } else if (dataArr[0] === "concert-this") {
        bandsInTown(dataArr[1]);
    }
    });
  };
