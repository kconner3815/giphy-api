
// Create an array of animals 

var animalsArray = ["monkey", "horse", "cat", "dog", "zebra", "turtle", "shark", "snake", "kangaro"];


// make a function for the gif 

function findGif() 
{
    var animal = $(this).attr("data-name");

    // get API key and add a limit
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KuEPCWREceFIX884GxmY7yfPeHk6aeWV&q=" + animal + "&limit=10";


    // ajax
    

    $.ajax({
        url: queryURL,
        method: "GET"


      }).then(function(response) {
       
       
        console.log(response);
        
        var results = response.data;
        

        // loop

        for (var i = 0; i < 10; i++) {
            var newDiv = $("<div>");

            var rating = results[i].rating;

            var ratingText = $("<p>").text("Rating: " + rating);

            var animalGIF = $("<img>");
            animalGIF.attr("src", results[i].images.fixed_height_still.url);
            animalGIF.attr("data-still", results[i].images.fixed_height_still.url);
           animalGIF.attr("data-animate", results[i].images.fixed_height.url);
           animalGIF.attr("data-state", "still");
            animalGIF.attr("class", "gif");


            newDiv.prepend(ratingText);
            newDiv.prepend(animalGIF);

            $("#new-div").prepend(newDiv);
          }

         

    })

    

}

function displayButtons() {   

    // empty button 

    $("#button-div").empty();

// create button and loop through the length add class

    for (var i = 0; i < animalsArray.length; i++) {
        var animalButton = $("<button>");
        animalButton.addClass("displayed-button");
        animalButton.attr("data-name", animalsArray[i]);
        animalButton.text(animalsArray[i]);
        $("#button-div").append(animalButton);
    }
}

$("#add-animal").on("click", function(event) {

    // keeps the page from regreshing


    event.preventDefault();

    // val takes the user input
    var newAnimal = $("#animal-input").val().trim();

       animalsArray.push(newAnimal);
    displayButtons();
});

function changeState() {

    var state = $(this).attr("data-state");

    if (state === "still") {

        var animate = $(this).attr("data-animate");
        

         
            $(this).attr("src", animate);
        
        $(this).attr("data-state", "animate");
      
      } else {
        
        var still = $(this).attr("data-still");
        
        $(this).attr("src", still);
        
        $(this).attr("data-state", "still");
      }

};

$(document).on("click", ".displayed-button", findGif);


$(document).on("click", ".gif", changeState);



displayButtons();

