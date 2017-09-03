$(document).ready(function(){

    var animals = [];  //array set up for buttons
    var clickedAnimal= '';  //variable for setting up ajax request

    // --------function that dynamically renders buttons with data to the document -----------------
          function renderButtons() {
    
          $("#animals-view").empty();
    
          for(var i= 0; i<animals.length; i++){
              var b = $('<button>');
                b.addClass('animals');
                b.attr('data-name',animals[i]);
                b.attr('value',animals[i]);
                b.text(animals[i]);
    
       //       var button = "<button>"+animals[i]+'</button>';
              console.log('button attr ='+$(b).attr('data-name'))

              $("#animals-view").append(b);
    
              console.log(animals[i]);
            }  
          }
    // -----------------end of render buttons function
    
    // --------------begin function that adds to my 'animal array', used for button rendering ------------

          // This function handles events where the add animal button is clicked
          $("#add-animal").on("click", function(event) {
    
                //prevents submit button from trying to send a form.
                event.preventDefault();
                var input = $("#animal-input").val().trim();
        
                animals.push(input);
                console.log(animals);
                $("#animal-input").val(' ');  //empty the box
        
                // The renderButtons function is called, rendering the list of animal buttons
                renderButtons();

            });
//  -----------------end function that adds to animal array-----------------------


//-----------------begin function for displaying gifs for each animal
        

    function displayGifs(){

      clickedAnimal = $(this).attr('data-name')   //name is extracted from button
      console.log('you clicked on ',clickedAnimal);

 //       event.preventDefault

        console.log("you clicked a button");


        var animalTag = '&tag='+ clickedAnimal;
        var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC" +animalTag  
         console.log(clickedAnimal, animalTag);

        //var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC&tag=cats"        

          $.ajax({        
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            console.log(response);      //'response' is all the info the api has on my animal
         
            var animalDiv = $('<div class="gifs">');  //new div for images
            
            var imgURL_still = response.data.fixed_width_small_still_url;
            var imgURL_moving = response.data.fixed_width_small_url;
            
            var animalImg = $('<img>')
            animalImg.attr("src",imgURL_still);
            animalImg.attr("data-state","still");
            animalImg.attr("data-still",imgURL_still);            
            animalImg.attr("data-animate",imgURL_moving);
            animalImg.attr("class","gif");
            
            //console.log($(animalImg).html());

            animalDiv.prepend(animalImg);  //put into dynamically created div

            // $('#animal-gifs').prepend(animalDiv);  //add to front rather than back of hard-coded div
            
            // var imgURL_moving = response.data.fixed_width_small_url;
            // var animalImg2 = $('<img>')
            // animalImg2.attr("src",imgURL_still);
            // animalDiv.prepend(animalImg2);

            $('#animal-gifs').prepend(animalDiv);  //add to front rather than back
            
          });       //end of response to ajax request

    }   //end of button click event/ function

// -------------begin function to toggle images ----------

function toggleGifs() {
 
 
  console.log($(this).data);

  console.log('state', $(this).data('state'));

  var currentState = $(this).data('state');
  
  var state = $(this).attr("data-state");

  console.log(state);
  if ('still'==currentState){   //toggle between states
    $(this).data('state','moving');
    $(this).attr('src',$(this).data('animate'));
}
  else {
    $(this).data('state','still');
    $(this).attr('src',$(this).data('still'));
    
  } 

};



// ---end function to toggle images
//
$(document).on("click",".animals", displayGifs);
$(document).on("click",".gif", toggleGifs);


});      //end of document ready

