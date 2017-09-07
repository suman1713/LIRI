console.log("liri.js working");
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');

var spotify = new Spotify({
  id: "58d9f4379cee44ff92c078347ed85b01",
  secret: "9435d29e43a644b9a97aec68f172c1dc"
 });

var Request = require('request');

var Keys = require('./keys');
var client = new Twitter(Keys);
console.log('\n');

var params = { screen_name: 'banks' };
var commands = process.argv[2];
var req = process.argv[3];

switch (commands) {
    case `my-tweets`:
      console.log("Tweet Time");
      
      Tweets();
      break;
    case `spotify-this-song`:
      console.log("SPOTIFYING...");
      console.log(' ');
      if(req===undefined){
        req="The+Sign+ace+of+base";
      }
      spot(req);
      break;
    case `movie-this`:
      console.log("MOVIE SEARCH !!!");
      if(req===undefined){
        req="Mr.Nobody";
      }
      movie(req);
      break;
    case `do-what-it-says`:
      console.log("Tell mw what to do..");
      doWhatItSays();
      break;
    default:
      console.log("CHECK and Try Again..");
      
      break;
  }


function Tweets() {
  client.get(
              'favorites/list', 
              params, 
              function(error, tweets, response) {       
                  if (!error && response.statusCode == 200) {  //if no errors and request is successful
                      fs.appendFile('tweet.log', ('***LOG:  POCKY BE GOOD! y*\r\n' + Date()), 
                          function(err) {
                              if (err) throw err;
              });

              console.log('\n');
              console.log('Tweets:')
                for (i=0; i<tweets.length;i++) {
                       var number = i + 1;
              console.log('\n');
              console.log([i + 1] + '. ' + tweets[i].text);
              console.log('Created on: ' + tweets[i].created_at);
              console.log('\n');
              fs.appendFile('tweet.log', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
                  if (err) throw err;
              });
          }
          fs.appendFile('tweet.log', ('END OF LINE.\r\n \r\n'), function(err) {
              if (err) throw err;
          });
      }
  });
}


function spot(req) {
 

      spotify
      .search({ type: 'track', query: req })
      .then(function(response) {

        console.log("Artist:"+response.tracks.items[0].album.artists[0].name);

        
        console.log("Song:"+response.tracks.items[0].name);

        console.log("Preview link:"+response.tracks.items[0].album.href);
        console.log("Album:"+response.tracks.items[0].album.name);

              

      })
      .catch(function(err) {
        console.log(err);
      });
}

    function movie(req) {
        
        request("http://www.omdbapi.com/?t=" + req + "&apikey=40e9cece", function(error, response, body) {
            
             if (!error && response.statusCode === 200) {  
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("Released: " + JSON.parse(body).Released);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes: " + JSON.parse(body).Value);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);

                fs.appendFile('movie.log', ('no error ' + req), function(err) {
                    if (err) throw err;
                });
            }
        });
    
    } 

    function doWhatItSays() {
        fs.readFile('random.txt', 'utf8', function(error, data) {
            if (error) {
                console.log(error);
            } 
            else {
                var req = ''; 
                var x = data.split(',');
                console.log("Reading Content...");
                console.log("TO DO:" + x[0]);
                console.log("Song: " + x[1]);

                
                  
                spot(x[1]);
            }
            fs.appendFile('randomlog.txt', ('\n Activity:' + x[0]+"   Search: "+x[1]), function(err) {
                if (err) throw err;
            });
        });
    }
