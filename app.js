var request = require('request');
var express = require("express");
var app= express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
var trailer;


app.get("/results", function(req, res){
    var searched = req.query.search;
    console.log(searched);
    var url= "https://api.themoviedb.org/3/search/movie?api_key=Keys&language=en-US&query=" + searched +"&page=1";
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            trailerFunction();
            
            console.log(data ["results"][0]["id"]);

            //function declared below
            function trailerFunction(){
                var newUrl= "https://api.themoviedb.org/3/movie/"+ data ["results"][0]["id"] + "/videos?api_key=Keys&language=en-US";
                request(newUrl,function(error,response,body){
                    trailer = JSON.parse(body);
                    console.log(trailer ["results"][0]["key"]);
                    res.render("results.ejs", {data:data,trailer:trailer});            
                })
            } 
        }
    })
});
    






            
 app.get("/", function(req, res){
    request("https://api.themoviedb.org/3/movie/now_playing?api_key=Keys&language=en-US&page=1",function(error,response,body){
        if(!error && response.statusCode==200){
            var nowPlaying = JSON.parse(body);

            trailerFunction();
            
            //function declared below
            function trailerFunction(){
                var popularUrl= "https://api.themoviedb.org/3/movie/popular?api_key=Keys&language=en-US&page=1";
                request(popularUrl,function(error,response,body){
                    popular = JSON.parse(body);
                    console.log((popular ["results"][0]["title"]));
                    res.render("addnew.ejs", {nowPlaying:nowPlaying,popular:popular});            
                })
            } 





        }
    })
});    










app.listen(3000,'127.0.0.1',function(){
    console.log ("movie app has started!");
});