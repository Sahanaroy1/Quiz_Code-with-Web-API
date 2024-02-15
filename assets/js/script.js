var startQuizEl = document.getElementById("startQuiz")
var quizEl = document.getElementById("quiz")
var resultEl = document.getElementById("results")
var optionEl = document.getElementById("options")
var timerEl = document.getElementById("timer")
var summaryEl = document.getElementById("summary")
var playAgainEL = document.getElementById("playAgain");
var saveScoreEl = document.getElementById("saveScore");
var initialEl = document.getElementById("initial")
var viewScoreEl = document.getElementById("viewScore")
var hrefHighScoreEl = document.getElementById("hrefHighScore")

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;

var countdownTimer;

//this function remove the timer and result screen comes up
function stopGame(){
    clearInterval(countdownTimer);

    timerEl.textContent = ""

    quizEl.style.display = 'none';
   
    resultEl.style.display = 'flex';

    summaryEl.textContent = "You scored " + score + ".";

    document.getElementById("timer").style.display = "none";
}
//Function created to start game and the timer starts
//the displayQuestion function from this function
function onStartGame(){
    resultEl.style.display = "none";
    document.getElementById("welcomeNote").style.display = "none";
    displayQuestion();
    secondsLeft = 75;
    score = 0;

    countdownTimer = setInterval(function(){
        if(secondsLeft > 0){
            timerEl.textContent = secondsLeft;
        }else{
            stopGame();
        }
        secondsLeft--;
    }, 1000);
   
}
//Is created to display question and the display function is called from here
function displayQuestion(){
    startQuizEl.style.display = 'none';
    console.log("Current question is " + currentQuestion);
    if(currentQuestion >= questions.length){
        stopGame();
        return;
    }
    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.title;
    displayAnswer();
}

//function is made to display the answers options
function displayAnswer(){
    document.getElementById('options').innerHTML = '';
    const ul = document.getElementById('options');
    var answer = questions[currentQuestion];
  
    for (i = 0; i < 4; i++) {//change to answer choices
      const li = document.createElement("li"); 
      li.innerHTML = answer.choices[i]; 
      ul.appendChild(li); 
    }
}

//created the function to match the correct answer to user's answer
//showMessage function is also called from here
function onSelectAnswer(e){
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;
    
    if(correctAnswer === userAnswer){
        score++;
        showMessage( "Yipee :)");
    }else{
        secondsLeft -= 10;
        showMessage("Oops Wrong :(");
    }
    currentQuestion++;
    console.log(currentQuestion);
    if(currentQuestion >= questions.length){
        stopGame();
    }else{
        displayQuestion();
    }
    
//this function is made to set the timer for the message which will disaapear after 3 secs    
}
function showMessage(msg){
    document.getElementById("message").textContent = msg;
     setInterval(function(){
        document.getElementById("message").textContent = '';
    }, 3000);  
}

//On save score function is created to save the score in the local storage
function onSaveScore (e) {

    var initial = initialEl.value;
    if (initial === "") {
        alert("Please enter your initial");
        return;
    }
    localStorage.setItem(initial, score);
    document.getElementById("initial").value = "";   
}

//this function helps to display the score on the screen
function displayScores(){
    //const scoresListEl = document.getElementById("scores-list")
    resultEl.style.display = "none";
    console.log("display score")

    const ul = document.getElementById("scores-list");
    console.log(localStorage.getItem("A"));
    for (var i = 0; i < 10; i++){
        const li = document.createElement("li"); 
        var initial = localStorage.key(i);
        var score = localStorage.getItem(localStorage.key(i));
        li.innerHTML = initial + " - " + score;
     ul.appendChild(li);
    }
    document.getElementById("highScores").style.display = "flex";
    document.getElementById("scores-list").style.display = "flex";  
}

//this is called from the play again button to restart the game
function playAgain(){
    currentQuestion = 0;
    
    onStartGame();
    quizEl.style.display = 'flex';
    quizEl.style.flexDirection = "column"
    
}

//this function helps to show the score when the a tag of high score is clicked
function highScoreHref(){
    displayScores();

    document.getElementById("highScores").style.display = "flex";
    document.getElementById("highScores").style.marginTop = "-100px";
    document.getElementById("scores-list").style.display = "flex";
    document.getElementById("welcomeNote").style.display = "none";
    document.getElementById("startQuiz").style.display = "none";
    document.getElementById("reset").style.display = "flex";

    
}
 
//the eventlisteners are helps the buttons to do their respective function
startQuizEl.addEventListener("click", onStartGame);
optionEl.addEventListener("click", onSelectAnswer);
playAgainEL.addEventListener("click", playAgain);
saveScoreEl.addEventListener("click", onSaveScore);
viewScoreEl.addEventListener("click", displayScores);
hrefHighScoreEl.addEventListener("click", highScoreHref);




