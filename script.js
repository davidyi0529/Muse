$(document).ready(function(){

    //boolians for search options
    var searchArtist = false;
    var searchSong = false;
    var searchLyric = false;

    //search by artist
    $("#artist-search").on("click", function(event){
        //test alert to see if this search works
        // alert("Search an artist");
        $("#searchInput").attr("placeholder", "Search an artist!");
        searchArtist = true;
        searchSong = false;
        searchLyric = false;
    });

    //search by song
    $("#song-search").on("click", function(event){
        //test alert to see if this search works
        // alert("search a song");
        $("#searchInput").attr("placeholder", "Search a song!");
        searchArtist = false;
        searchSong = true;
        searchLyric = false;
    });

    //search by lyric
    $("#lyric-search").on("click", function(event){
        //test alert to see if this search works
        // alert("search a lyric");
        $("#searchInput").attr("placeholder", "Search a lyric!");
        searchArtist = false;
        searchSong = false;
        searchLyric = true;
    });

    $("#searchBtn").on("click", function(e){
        e.preventDefault();
        //test console.log to check if click works
        console.log("click")

        //Genius API
        var APIKey = "14S5okXH4GKYe-PKaBH0HlfjVuSDyaK9ZUwz3ep3rqUAc37eQtPWr9j6NLxyCBp8";
        var keyWord = $("#searchInput").val();
        var queryURL = "https://api.genius.com/search?q="+keyWord+"&per_page=25&access_token="+APIKey;
        
        //search by artist 
        if(searchArtist == true){
            //test alert 
            // alert("searching by artist...");
            $("#list").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                //button for artist[0]
                var artistName = response.response.hits[0].result.primary_artist.name;
                var artistTitle = $("<button>");
                artistTitle.attr("id", response.response.hits[0].result.primary_artist.name);
                artistTitle.attr("uk-toggle","target: #my-id");
                artistTitle.text(response.response.hits[0].result.primary_artist.name);
                var artistList = $("<li>");
                artistList.append(artistTitle);
                $("#list").append(artistList);

                //response.hits array length
                var hitsLength = response.response.hits.length;

                //checks for different artists (if there are different artists with similar name)
                for(var i = 1; i < hitsLength; i++){
                    if(artistName != response.response.hits[i].result.primary_artist.name){
                        var artistTitle = $("<button>");
                        artistTitle.attr("id", response.response.hits[i].result.primary_artist.name);
                        artistTitle.attr("uk-toggle","target: #my-id");
                        artistTitle.text(response.response.hits[i].result.primary_artist.name);
                        var artistList = $("<li>");
                        artistList.append(artistTitle);
                        $("#list").append(artistList);
                    }
                }

            });
        }
        //search by song
        else if(searchSong == true){
            //test alert
            // alert("searching by song...");
            $("#list").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var hitsLength = response.response.hits.length;
                console.log(hitsLength);
                for(var i = 0; i < hitsLength; i++){
                    var hitsTitle = $("<button>");
                    hitsTitle.attr("id", response.response.hits[i].result.title);
                    hitsTitle.attr("uk-toggle","target: #my-id");
                    var listItem = $("<li>");
                    hitsTitle.text(response.response.hits[i].result.full_title);
                    listItem.append(hitsTitle)
                    $("#list").append(listItem);

                    //modal
                    var hitsModal = $("<div uk-modal>");
                    hitsModal.attr("id", "modal"+i);
                    var hitsModalBody = $("<div class='uk-modal-dialog uk-modal-body'></div>");
                    hitsModal.append(hitsModalBody);
                    var hitsModalTitle = $("<div class='uk-modal-title'></div>");
                    hitsModalTitle.text(response.response.hits[i].result.full_title);
                    hitsModalBody.append(hitsModalTitle);

                    $("#main").append(hitsModal);
                    hitsTitle.attr("uk-toggle","target: #modal"+i);
    
                    //$("button").on("click", function(e){
                        //e.preventDefault()
                        //console.log($(this).attr("id"))
                        //$("#title").text($(this).attr("id"))
                    //})
                }
            });
        }
        //search by lyric
        else if(searchLyric == true){
            //test alert
            // alert("searching by lyric...");
            $("#list").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var hitsLength = response.response.hits.length;
                console.log(hitsLength);
                for(var i = 0; i < hitsLength; i++){
                    var lyricTitle = $("<button>");
                    lyricTitle.attr("id", response.response.hits[i].result.title);
                    lyricTitle.attr("uk-toggle","target: #my-id");
                    var listItem = $("<li>");
                    lyricTitle.text(response.response.hits[i].result.full_title);
                    listItem.append(lyricTitle)
                    $("#list").append(listItem);
                }
            });
        }
        //error if no search option picked
        else 
            alert("Error: pick a search option in dropdown.");
      
        //===============================================================================
        //Rapid Genius API
        //var settings = {
            //"async": true,
            //"crossDomain": true,
            //"url": "https://genius.p.rapidapi.com/songs/3315890",
            //"method": "GET",
            //"headers": {
                //"x-rapidapi-host": "genius.p.rapidapi.com",
                //"x-rapidapi-key": "b5a19d4784msh263354a8d69856ep11fb51jsncd8286e67c37"
            //}
        //}

        //$.ajax(settings).done(function (response) {
            //console.log(response);
            //console.log(response.response.song.media[0].url);
          
            //$("#music")
        //});

        //===================================================================================
        // Musix API
        //var search = keyWord.split(" ").join("%20")
        //var qURL = "https://api.musixmatch.com/ws/1.1/track.search?apikey=6ce8d86aa1e7760b4991402c42829c5d&q="+search

        //$.ajax({
            //url: qURL,
            //get: "GET"
        //}).then(function(result){
            //console.log(result)
        //})
    });

    // Wrap every letter in a span
var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
  
});