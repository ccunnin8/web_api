var albums = ["0ETFjACtuP2ADo6LFhL6HN",
				"6ozp33PI3p9AdddB6ZL3xQ",
				"0CxPbTRARqKUYighiEY9Sz",
				"5EyIDBAqhnlkAHqvPRwdbX",
				"1aVyRcDS6m2qIyiSgCj4ge",
				"5Ap3F8CxjjsQKZGASDcHNA"
				];
var uri = "https://api.spotify.com/v1/albums/";
var thumbnails = [],
	fullsize = [];

for (var i = 0; i < albums.length; i++){
	var url = uri + albums[i];
	$.getJSON(url,function(data){
		var thumbnail = {};
		fullsize.push(data.images[0].url);
		thumbnail.fullsize=  data.images[0].url;
		thumbnail.image = data.images[1].url;
		thumbnail.artist = data.artists[0].name;
		thumbnail.album_name = data.name;
		thumbnail.release_date = data.release_date.split("-")[0];
		thumbnail.release_date;
		thumbnail.genre = data.genres;
		thumbnails.push(thumbnail);
	});
}

$(document).ajaxStop(function(){
	for (var i = 0; i < thumbnails.length; i++){
			$lightbox = $("<a href='" + thumbnails[i].fullsize + "' data-lightbox='" + i + "'></a>");
			$lightbox.append($("<img src='" + thumbnails[i].image + "' index='" + i + "'>"));
			$(".albums").append($lightbox);
	}
	var $caption = $("<div class='caption'></div>");
		$caption.append($("<p class='artist'></p>"));
		$caption.append($("<p class='album'></p>"));
		$caption.append($("<p class='date'></p>"));
		$(".lb-data").append($caption);
	$("img").click(function(){
		var number = ($(this).attr("index")),
			album = thumbnails[number];
		console.log(thumbnails[number]);
		$(".artist").text(album.artist);
		$(".album").text(album.album_name);
		$(".date").text(album.release_date);
	});
	$("a.lb-close").click(function(){
		//alert("clicked");
	})
});
