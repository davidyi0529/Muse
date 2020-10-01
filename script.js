$(document).ready(function(){
    $("#searchBtn").on("click", function(e){
        e.preventDefault();
        console.log("click")
        //Genius API
        var APIKey = "14S5okXH4GKYe-PKaBH0HlfjVuSDyaK9ZUwz3ep3rqUAc37eQtPWr9j6NLxyCBp8";
        var keyWord = $("#searchInput").val();
        var queryURL = "https://api.genius.com/search?q="+keyWord+"&access_token="+APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var hitsLength = response.response.hits.length;
            console.log(hitsLength);
            for(var i = 0; i < hitsLength; i++){
                var hitsTitle = $("<a>");
                var listItem = $("<li>");
                hitsTitle.attr("href", "#");
                hitsTitle.text(response.response.hits[i].result.full_title);
                listItem.append(hitsTitle)
                $("#list").append(listItem);
         }
    
        });
    })
})
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
    var youtubeURL = response.response.song.media[0].url;
    youtubeURL.replace("watch?v=", 'embed/');
    $("#yo").attr("src", youtubeURL);
});
