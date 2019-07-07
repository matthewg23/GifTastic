var plants = ["Cactus", "Succulent", "Fern", "Pepper plant", "Bonsai"];

function pushPlant() {
    event.preventDefault();

    var plant = $("#input").val().trim();
    plants.push(plant);

    renderButtons();
  };  

function renderButtons() {
    $("#button-holder").empty();

    for (var i = 0; i < plants.length; i++) {
      var a = $("<button>");

      a.addClass("plant-btn");
      a.addClass("btn-outline-info");
      a.attr("data-plant", plants[i]);
      a.text(plants[i]);

      $("#button-holder").append(a);
    };
  };

  function playGif() {
    var state = $(this).attr("data-state");

    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    }
  };

   function displayGifs() {

    var plantURL = $(this).attr("data-plant");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + plantURL + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            var gifDiv = $("<div>");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var plantImg = $("<img>");
            plantImg.attr("src", results[i].images.fixed_height_still.url);
            plantImg.attr("data-still", results[i].images.fixed_height_still.url);
            plantImg.attr("data-animate", results[i].images.fixed_height.url);
            plantImg.attr("data-state", "still");
            plantImg.addClass("gif");

            gifDiv.append(p);
            gifDiv.append(plantImg);

            $("#gifs-appear-here").prepend(gifDiv);
          };
        };
      });
  };

  $(document).on("click", ".gif", playGif);
  $(document).on("click", ".plant-btn", displayGifs);
  $(document).on("click", "#submit", pushPlant);
  renderButtons();