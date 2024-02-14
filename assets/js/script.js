var startQuizEl = document.getElementById("startQuiz")
var welcomeEl = document.getElementById("welcome")
var quizEl = document.getElementById("quiz")
var resultEl = document.getElementById("results")
var optionEl = document.getElementById("options")
var messageEl = document.getElementById("message")
var timerEl = document.getElementById("timer")
var summaryEl = document.getElementById("summary")
var playAgainEL = document.getElementById("playAgain");

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;

var countdownTimer;

function stopGame(){
    clearInterval(countdownTimer);

    timerEl.textContent = ""

    quizEl.style.display = 'none';
   
    resultEl.style.display = 'flex';

   
    var initial = prompt("Enter your name or initials:");
    
  
    localStorage.setItem("initial", initial);
    localStorage.setItem("score", score);

    summaryEl.textContent = "Hey!" + initial + " you scored " + score + ".";
}



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
    
}
function showMessage(msg){
    document.getElementById("message").textContent = msg;
     setInterval(function(){
        document.getElementById("message").textContent = '';
    }, 3000);
    
}

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




startQuizEl.addEventListener("click", onStartGame);
optionEl.addEventListener("click", onSelectAnswer);
playAgainEL.addEventListener("click", onStartGame);


