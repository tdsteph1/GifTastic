
//Global Variables

//Bootstrap lookup img responsive

//Global Array holds intitial actors and we'll add to this array with more actors
var topics = ["robert de niro", "kurt russell", "val kilmer", "arnold schwarzenegger", "bruce willis", "alec baldwin", "harrison ford", "kiefer sutherland"];
var actorImage;


//Function1 Use AJAX to display 10 GIF Images
function displayMovieInfo()
{
	$("#actor-view").empty();

	//store attribute of particular button taht was clicked
	var actor = $(this).attr("actor-name");

	//constructing a URL to search Giphy for the anme of the actor
	//10 is the number of images to display
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=dc6zaTOxFJmzC&limit=10";

	//performing our AJAX GET requets
	$.ajax(
	{
		//2 parameters we pass into Ajax to retriveve dta online (URL & method)
		url: queryURL,
		method: "GET"



	})

	//Function(Done: is a promise meaning once we get a response it wil promise to return these results)
	.done(function(response)
	{


		//storing the array of Gif results which contains size=10 or limit = 10
		var results = response.data;

		//for-loop handles each of the 10 GIF Img(Display RAting & GIF img)
		for(var i = 0; i < results.length; i++)
		{
			//only taking action if photo has approprate rating. Keep it pg13 rated
			if(results[i].rating != "r")
			{
				//create DIV
				var gifDiv = $("<div class='item'>");

				//store rating inside variable
				var rating = results[i].rating;

				//add class to activate css(.floatLeft) to display images horizontally
				gifDiv.addClass("floatLeft");

				//creating a paragraph tag with result items rating
				var p = $("<p>");
					p.html("<div class='back'> <p> <b> Rating: " + rating + "</b> </p> </div>");


				//create an image tag
			    actorImage = $('<img alt=\'Responsive image\' class= \'gif\' \'img-fluid\'  data-state=\'still\' width=\'200\' height=\'200\' data-still=\'' + results[i].images.downsized_still.url + '\' data-animate=\'' + results[i].images.fixed_height.url + '\'>');

				
				//giving the image tag a src attribute retrieving the actual img from GIPHY API
				actorImage.attr("src", results[i].images.downsized_still.url);

				//append both p(rating) & image GIF to <div or gifDiv
				gifDiv.append(p);
				gifDiv.append(actorImage);

				//Display rating & image/GIF at <div id=acotr-view>
				$("#actor-view").prepend(gifDiv);


			}

		}
		
		//play & pause when we click on an image. NOTE place inside function because actorImage = $(...) is local and not global
		$(".gif").on("click", function()
		{
		
			//store the currently clicked image into the (state) variable
			var state = $(this).attr("data-state")

			//if current state is "still" then animate image, otherwise pause
			if(state === "still")
			{
				//store API "animate" verstion of image in "src" attribute so image can (play)
				$(this).attr("src", $(this).attr("data-animate"));

				//store "animate in (data-state) attribute to indicate that the image is 
				//currently in a moving or animate state
				$(this).attr("data-state", "animate");

			}
			else
			{
				//Store API "still" version in "src" attribue so img will (pause)
				$(this).attr("src", $(this).attr("data-still"));

				//store "still" in (data-state) attribute which indicates the current state is (pause) or (still)
				$(this).attr("data-state", "still");

			}

		});




	});





}









//function2(display initial buttons in topics[] array & any additional buttons)
function renderButtons()
{
	//Deleting the buttons prior to adding new actors to prevent repeat buttons
	$("#button-view").empty();

	//looping through the array of actors
	for(var i = 0; i < topics.length; i++)
	{
		//Dynamically generating buttons for each actor in the array
		var b = $("<button>");

		//adding a class of actor to our button
		b.addClass("actorButton");

		//adding actor-name attribute, this is used so we know which 
		//actor button was clicked so we can display fifs associated with that actor
		b.attr("actor-name", topics[i]);

		//provide the initial button text, this puts actual text on button
		b.text(topics[i]);

		//adding buttons to the "button-viw" <div>
		$("#button-view").append(b);
	}
}

//this button click adds a new button into the array and displays button at ("add-actor") <div>
$("#add-actor").on("click", function(event)
{
	//prevent submit button submitting a form
	event.preventDefault();

	//This line grabs the input from the textfield
	var actor = $("#actorTextbox").val().trim();

	//The actor from textbox is added to array
	topics.push(actor);

	//call renderButtons which displays list of buttons in our array
	renderButtons();

});

//calling the renderButtons() function to display initial buttons
renderButtons();

//Call the ajax method. Note the reson we do it this way is becasue we use ("actorButton") inside displayActorGif()
//method which is defined before defining the class("actorButton") or you can place button click method below.
$(document).on("click", ".actorButton", displayMovieInfo);

