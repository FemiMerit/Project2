// Run this function when the DOM is fully loaded
$(document).ready(function(){

  // Log a welcome message to the console
  console.log('Welcome to Duck Hunt!');

  // Get references to the audio elements by their IDs using jQuery
  var title = $('#titlesound'); // Presumably background music or title sound
  var bark = $('#bark');        // Barking sound (like the Duck Hunt dog)

  // Define a timer function to trigger actions on a countdown
  function timer(){
    var sec = 80; // Start the countdown from 80

    // Run this function every 100 milliseconds
    var timerCountdown = setInterval(function(){
      sec--; // Decrement the timer

      // On the first interval (i.e., when sec becomes 79)
      if (sec == 79) {
        title[0].play(); // Play the title sound
        bark[0].play();  // Play the bark sound
      }

      // Optional: you could clear the interval here if only one run is needed
      // clearInterval(timerCountdown);
    }, 100); // Interval set to 100 milliseconds
  }

  // Start the timer function
  timer();
});
