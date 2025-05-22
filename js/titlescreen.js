// Run this function when the DOM is fully loaded
$(document).ready(function(){

  // Log a welcome message to the console
  console.log('Welcome to Duck Hunt!');

  // Get references to the audio elements by their IDs
  var title = $('#titlesound'); 
  var bark = $('#bark');      

  // Define a timer function to trigger actions on a countdown
  function timer(){
    var sec = 80;

    // Run this function every 100 milliseconds
    var timerCountdown = setInterval(function(){
      sec--; 

      // On the first interval
      if (sec == 79) {
        // Play the title sound
        title[0].play(); 
        // Play the bark sound
        bark[0].play();  
      } }, 100); 
  }

  // Start the timer function
  timer();
});
