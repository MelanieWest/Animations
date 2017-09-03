//$(document).ready(function(){

    console.log("We are here!!");

//start with a blank array for buttons
 var animalArray = [];
console.log(animalArray);

  //listen for click of button id 'addAnimal'.  When it is clicked, assign the value
  //of the form input to the array and call 'render buttons'

$("#addAnimal").on("click",function(event){

    event.preventDefault;
    var input = $("#animal-input").val().trim();
    console.log(event.key, input);
    
    animalArray.push(input);

    console.log(animalArray);

    $("#animal-input").val(' ');  //empty the box

    // The renderButtons function is called, rendering the list of movie buttons
    return animalArray;

    renderButtons();
  });       //end of add animal routine



//this function will create buttons with name of animal as an attribute of the button  
    
    function renderButtons() {
        
        
        $("#animal-buttons").empty();

        for(var i= 0; i<animalArray.length; i++){
            var b = $('<button>');
            b.addClass('animal');
            b.attr('data-name',animalArray[i]);
            b.text(animalArray[i]);

            $("#animal-buttons").append(b);

            console.log(animals[i]);
        }


        // Loop through the array of animals, then generate buttons for each animal in the array

        }   //end of render buttons loop

        renderButtons();

//});      //end of document ready

