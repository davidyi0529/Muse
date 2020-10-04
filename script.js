$(document).ready(function(){

    var searchArtist = false;
    var searchSong = false;
    var searchLyric = false;

    //search by artist
    $("#artist-search").on("click", function(event){
        alert("works");
        $("#searchInput").attr("placeholder", "Search an artist!");
        searchArtist = true;
        searchSong = false;
        searchLyric = false;
    });

    //search by song
    $("#song-search").on("click", function(event){
        alert("works2");
        $("#searchInput").attr("placeholder", "Search a song!");
        searchArtist = false;
        searchSong = true;
        searchLyric = false;
    });

    //search by lyric
    $("#lyric-search").on("click", function(event){
        alert("works3");
        $("#searchInput").attr("placeholder", "Search a lyric!");
        searchArtist = false;
        searchSong = false;
        searchLyric = true;
    });

    $("#searchBtn").on("click", function(e){
        e.preventDefault();
        console.log("click")

        //Genius API
        var APIKey = "14S5okXH4GKYe-PKaBH0HlfjVuSDyaK9ZUwz3ep3rqUAc37eQtPWr9j6NLxyCBp8";
        var keyWord = $("#searchInput").val();
        var queryURL = "https://api.genius.com/search?q="+keyWord+"&per_page=25&access_token="+APIKey;
        
        if(searchArtist == true){
            alert("searchArtist = true");
        }
        else if(searchSong == true){
            alert("searchSong = true");
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var hitsLength = response.response.hits.length;
                console.log(hitsLength);
                for(var i = 0; i < hitsLength; i++){
                    var hitsTitle = $("<button>");
                    hitsTitle.attr("id", response.response.hits[i].result.title)
                    hitsTitle.attr("uk-toggle","target: #my-id")
                    var listItem = $("<li>");
                    hitsTitle.text(response.response.hits[i].result.full_title);
                    listItem.append(hitsTitle)
                    $("#list").append(listItem);
    
                    //$("button").on("click", function(e){
                        //e.preventDefault()
                        //console.log($(this).attr("id"))
                        //$("#title").text($(this).attr("id"))
                    //})
                }
             
            });
        }
        else if(searchLyric == true){
            alert("searchLyric = true");
        }
        else 
            alert("Error: pick a search option in dropdown.");


        //===============================================================================
        //Rapid Genius API
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://genius.p.rapidapi.com/songs/3315890",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "genius.p.rapidapi.com",
                "x-rapidapi-key": "b5a19d4784msh263354a8d69856ep11fb51jsncd8286e67c37"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(response.response.song.media[0].url);
          
            $("#music")
        });

        //===================================================================================
        // Musix API
        var search = keyWord.split(" ").join("%20")
        var qURL = "https://api.musixmatch.com/ws/1.1/track.search?apikey=6ce8d86aa1e7760b4991402c42829c5d&q="+search

        $.ajax({
            url: qURL,
            get: "GET"
        }).then(function(result){
            console.log(result)
        })
    });

});