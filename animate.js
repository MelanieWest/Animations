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
         
            var animalDiv = $('<div class="gifs">');
            
            var imgURL = response.data.image_original_url;
            var animalImg = $('<img>')
            animalImg.attr("src",imgURL);
            animalDiv.prepend(animalImg);

            // var released = response.Released;
            // var pTwo = $('<p>').text("Released: " + released);
            // animalDiv.append(pTwo);

        
            // var plot = response.Plot;
            // var pThree = $('<p>').text("Plot: " + plot);
            // animalDiv.append(pThree);

        
            // var imgURL = response.Poster;
            // var image = $('<img>').attr('src',imgURL);
            // animalDiv.append(ime);

            $('#animal-gifs').prepend(animalDiv);  //add to front rather than back
        


          });       //end of response to ajax request


    }   //end of button click event/ function

    $(document).on("click",".animals", displayGifs);
    

});      //end of document ready

