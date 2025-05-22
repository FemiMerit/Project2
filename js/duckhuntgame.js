// Wait for the DOM to fully load
$(document).ready(function(){

  console.log('Welcome to Duck Hunt!');

  //  Sound effect elements
  var intro = $('#intro');
  var shot = $('#shot');
  var quack = $('#quack');
  var gameover = $('#gameover');
  var laugh = $('#laugh');
  var youfailed = $('#youfailed');

  //  Timing settings
  // Time for lost duck to fade out
  var lostDuckFadeOutTime = 180; 
  // Game loop interval in ms (faster = harder)
  var gameSpeed = 200;           

  //  Score and fade timing
  // Player score
  var numKilled = 0;  
  // Time for duck to fade out after being shot           
  var dieFadeOutTime = 1000;     

  // Missed shot counter (used for dog laugh)
  var counter = 0;

  // Handle player clicking anywhere on the document
  $(document).on('click', function dogLaugh(){
    // Increment missed shot counter
    counter++;    
    // Play gunshot sound               
    shot[0].play();              
    console.log(counter);

    // Every 3rd missed shot, show dog laugh animation
    if (counter % 3 == 0 ) {
      console.log("You have clicked the screen");
      var classAdd = setTimeout(function(){
        // Add class to show animation
        $('.dog').addClass('doglaugh'); 
        // Play laugh sound
        laugh[0].play();                
      }, 0.0001);
    } else {
        // Remove laugh animation
      $('.dog').removeClass('doglaugh'); 
      // Cancel any pending animation
      clearTimeout(classAdd);           
    }
  });

  // Update score display
  function updateScore() {
    $('.score').html('Score: ' + numKilled);
  }

  // Check if a duck is alive (moving left or right)
  function isAlive(duck) {
    return duck.hasClass('left') || duck.hasClass('right');
  }

  // Recycle a duck by resetting its position and direction
  function recycle(duck) {
    // Random horizontal start
    var newLeft = Math.round(Math.random() * $(document).width()); 
    duck.css('left', newLeft);
    // Start at the bottom of screen
    duck.css('bottom', 0); 
    // Play quack sound     
    quack[0].play();            

    // Randomly face left or right
    if (Math.random() > 0.5) {
      duck.removeClass('shot').show().addClass('left');
    } else {
      duck.removeClass('shot').show().addClass('right');
    }
  }

  // Update each duck’s position, direction, and check if it escaped
  function updateDuck(duck) {
    // Bounce off left edge
    if (duck.offset().left < 0) {
      duck.removeClass('left').addClass('right');
    }

    // Bounce off right edge
    if (duck.offset().left > $(document).width() - 300) {
      duck.removeClass('right').addClass('left');
    }

    // Simulate vertical movement by adjusting 'bottom'
    var newBottom = $(document).height() - duck.offset().top;
    duck.css('bottom', newBottom);

    // Animate duck wing flapping
    duck.toggleClass('flap');

    // If duck escapes at top of screen
    if (duck.offset().top < 0) {
      duck.fadeOut(lostDuckFadeOutTime, function() {
        duck.removeClass('left right'); // Reset duck state
        recycle(duck);                  // Recycle duck to bottom
      });
    }
  }

  // ⏱ Main game loop — called every `gameSpeed` ms
  function step() {
    $('.duck').each(function (i, duck) {
      duck = $(duck);
      if (isAlive(duck)) {
        updateDuck(duck); // Update each alive duck
      }
    });

    // Move left-facing ducks to the left
    $('.duck.left').each(function (i, duck) {
      duck = $(duck);
      duck.css('left', duck.offset().left - 30);
    });

    // Move right-facing ducks to the right
    $('.duck.right').each(function (i, duck) {
      duck = $(duck);
      duck.css('left', duck.offset().left + 30);
    });

    updateScore(); // Update score on screen
  }

  // Handle duck getting shot
  function die(duck) {
    numKilled += 100; // Increase score

    // Animate duck death and recycle
    duck.removeClass('left right').addClass('shot').fadeOut(dieFadeOutTime, function () {
      recycle(duck);
    });

    // Increase difficulty based on score (reduce transition duration)
    if (numKilled > 0 && numKilled < 1000) {
      $('.duck').css("transition-duration", "0.65s");
      $('.status').html("Wave 1");
    }
    if (numKilled >= 1000 && numKilled < 2000) {
      $('.status').html("Wave 2");
    }
    if (numKilled >= 2000 && numKilled < 3000) {
      $('.duck').css("transition-duration", "0.55s");
      $('.status').html("Wave 3");
    }
    if (numKilled >= 3000 && numKilled < 4000) {
      $('.duck').css("transition-duration", "0.45s");
      $('.status').html("Wave 4");
    }
    if (numKilled >= 4000 && numKilled < 5000) {
      $('.duck').css("transition-duration", "0.35s");
      $('.status').html("Wave 5");
    }
    if (numKilled >= 5000 && numKilled < 6000) {
      $('.duck').css("transition-duration", "0.3s");
      $('.status').html("Final Wave");
    }
    if (numKilled >= 6000) {
      $('.duck').css("transition-duration", "0.25s");
    }

    // Win condition
    if (numKilled >= 7100) {
      $('.status').html("You Win");
      clearInterval(gameRunning);
      clearInterval(timerCountdown);
      $('.timer').remove();
    }
  }

  // Duck click handler — shoot the duck!
  $('.duck').on('click', function(event) {
    // Kill the duck
    die($(event.target)); 
    // Prevent background click event  
    event.stopPropagation(); 
    // Play gunshot sound
    shot[0].play(); 
    // Slight delay (may be typo: should be `shot[0].currentTime`)        
    shot.get[0].currentTime = 0.2; 
  });

  // Timer countdown logic (starts at 75 seconds)
  function timer(){
    var sec = 75;

    timerCountdown = setInterval(function(){
      $('.timer').html(sec + "s"); // Update timer on screen
      sec--;

      // Play intro and quack once at start
      if (sec == 74) {
        intro[0].play();
        quack[0].play();
      }

      // Game over when time runs out
      if (sec < 0) {
        console.log("game over");
        clearInterval(gameRunning);
        clearInterval(timerCountdown);

        // Different messages/sounds based on final score
        if (numKilled == 0) {
          $('.timer').css('right', '400px');
          $('.timer').html("<a href='duckhunt.html'>You gained a score of " + numKilled + " better luck next time</a>");
          $('.status').remove();
          youfailed[0].play();
        }
        else if (numKilled == 7100) {
          $('.timer').css('right', '400px', 'font-size', '5em');
          $('.timer').html("<a href='duckhunt.html'>You Win</a>");
          $('.status').remove();
          gameover[0].play();
        }
        else {
          $('.timer').css('top', '200px', 'font-size', '5em');
          $('.timer').html("<a href='duckhunt.html'>You gained a score of " + numKilled + " Well Done! Try and Get 7000!</a>");
          $('.status').remove();
          gameover[0].play();
        }
      }
    }, 1000); // Run every second
  }

  // Start the game
  timer(); // Start the countdown timer
  var gameRunning = setInterval(step, gameSpeed); // Start the game loop
});
