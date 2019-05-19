# liri-node-app

For this application, I created a LIRI app which takes user inputs and executes different search functions.  The first search function is "concert-this" which uses the Bands In Town API to display the next concert for any given artist.  If the artist searched doesn't have any concerts coming up the function returns "No results for 'artist'".  

![Concert-this image](/Screenshots/Liri_concertthis.PNG)

The second search function is "movie-this" which uses the OMDB API to display various information about whatever movie is searched.  The title, release year, IMDB rating, Rotten Tomatoes rating, Country, Language, Plot and Actors are all displayed.  If the user doesn't enter a search term, the results for the movie "Mr. Nobody" are returned.

![Movie-this image](/Screenshots/Liri_moviethis.PNG)

The third function is "spotify-this-song" which uses the Spotify API to display information about whatever song is searched.  The Artist, song name, album name, and a preview link for the song on spotify are displayed.  If the user doesn't enter a search term, the results for "The Sign" are returned.  

![Spotify-this-song image](/Screenshots/Liri_spotifythis.PNG)

The last function is "do-what-it-says" and this functions reads the data from "random.txt" file.  The file is structured so the first item in the file is a command, either "concert-this", "movie-this" or "spotify-this-song".  The second item in the file is whatever search term the user wants to use.  The function takes the command and runs the search term through the appropriate function, depending on what the command is. 

![do-what-it-says image](/Screenshots/Liri_do-what-it-says.PNG)

This most challenging parts of this application were getting the spotify api call to work, since we couldn't view the endpoint in the browser, and getting the do-what-it-says function to work.  I just had to dig into the JSON object and figure out where the information was that I wanted to fix the spotify problems.  For the do-what-it-says app, getting the search term to work for the concert-this function was challenging.  I had to get the formatting just right or I would get error messages.
