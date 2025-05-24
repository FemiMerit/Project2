# *DuckHunt*

Duck Hunt is a 1984 light gun shooter video game developed and published by Nintendo for the Nintendo Entertainment System (NES) video game console

A simplified  version of the game bas been created using HTML, CSS and Javascript. The main capability is a simple point and click, recording highscore with a specified time limit.

---
## User Stories

Title: User run the game and is greated with the title screen Duck Hunt!
The user is given the option to start game or read the instructions

Acceptance Criteria:
Homepage

Users should see a bright coloured home screen of the Duck hunt game

User can click on start game and will instantly be put into the playing it 
User can also click on instruction to get a how to play guide

Interaction & Feedback

When users is put into playing the game, they will be given a timer and will have to use the mouse to aim at the gooses and click on the mouse to hit them.
The more gooses the user hits the more points they get.
Once the timer runs out the user score will be displyed and and a new target high score will be diplyed for the user to aim towards

The game should be mobile-friendly and adjust well to different screen sizes.
Text should be readable, with contrast for accessibility.

## Live Demo

You can try the game here: [Play Duck Hunt](https://femimerit.github.io/Project2/)  

---

### First Time Visitor Goals:

- As a user, I want to be welcomed with a colorful title screen.
- I can choose to **Start Game** or view **Instructions**.

### Gameplay

- As a player, I want to shoot ducks using my mouse within a time limit.
- I receive immediate feedback with sound and animations.
- I can try to beat my high score on each playthrough.

### Instructions Page

- As a new user, I can read clear instructions on how to play the game before starting.

---

## Technologies Used

- **HTML5** for structure
- **CSS3** for styling and responsive layout
- **JavaScript** for gameplay logic
- **JQuery** (legacy support)
- Custom assets (images and sound effects)

---

+ ### Title Screen

    - Represent: 

        * Displays a colourful page with a dog walking across it

    ![Title Screen](documentation/)

---

+ #### 📁 Project Structure

Project2-main/
├── assets/
│   ├── css/
│   ├── images/
│   └── sound/
├── js/
├── index.html
├── duckhunt.html
├── instructions.html
└── README.md

--- 

+ ## Development
### Issues:

* Animation
* Image positioning
* Audio

##### Animation:

A couple of issues where present when trying the form animate the intro scene of the duck.

With the sprite sheet for the dog not containing an consistent height and pixel pixel.

Overcame by running the aninmation with a iteration of 1.9 and while slightly cropping the image.

```css
#dog {
  position: absolute;
  background: url('images/dogwalk.png');
  top: 520px;
  width: 182px;
  height: 171px;
  animation: walk 2s steps(5) 1.9, dogMove 3.8s linear;
  animation-fill-mode: forwards;
}

@keyframes walk {
  0% {
    background-position: 910px;
  }
  100% {
    background-position: 0px;
  }
}

@keyframes dogMove {
  0% {
    transform: translateX(-100px);
  }
  10% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(300px);
    overflow: hidden;
  } 
}

```

Including these lines of code allowed for a smooth animation for the walking across the screen

##### Image Positioning:

Initial ideas were to position the ducks behind the background.However this posed many problems with an expected solution of the css function

```
z-index: -1;

```
not solving the problem.

Instead requiring and overlay of the grass.png on top of the backgroun image. This was succesfully achieved with the css:

```css
body:after {
display:inline-block;
padding-bottom: 10px;
content: '';
background-image: url('images/grass.png');
background-size: cover;
position: absolute;
bottom: 0;
width: 100%;
height: 175px;
```

##### Audio:

With the limitations of Chrome implementing audio on loadup was particularly difficult. Chrome has an autoplay prevention feature.Therefore setting background music required using the

```jQuery
setTimeOut(function,time(ms));
```

```js
  var title = $('#titlesound');
  function timer(){
    var sec = 80;
    var timerCountdown = setInterval(function(){
      // console.log(sec);
      sec--;
      if (sec == 79) {
        title[0].play();
      }}, 100);
    }
  timer();
```	

With this a timer is created that	 runs a function that plays the audio if the timer meets a condition e.g. after 1 second.

##### Bugs:
Some bugs are still present in the current build of the game.

Examples of this would be the dog laughing event added with the shot is missed twice. If the player were to miss again i.e. click on the page where a duck is not present then the event will automatically end without fully loaded the animation.

Another potential bug is the time delay in the audio when a shot is fired.There is currently a delay of 1s therefore two proceding shots wont sound one after the other instead the sound play again on the 4 shot.

These are future task that could be completed to improve the functionality of the game.

##### Potential Features:
Potential features could be adding more events for the bird flying animations and interations with the dog.

Also including an interface that counts the animation and limits how many the user has.
---
