var startButton = document.querySelector("#startBtn");
var timeResult = document.querySelector("#time");
var wrapperSection = document.querySelector(".wrapper");
var finishSection = document.querySelector('.finishSection');
var titleElement = document.querySelector('#questionTitle');
var optionList = document.querySelector('#questionOptionList');
var quizContainer = document.querySelector(".quizContainer");
var finalScore = document.querySelector("#result");
var responsDiv = document.querySelector("#response");
var submitButton = document.querySelector("#submit");
var errMsg = document.querySelector("#errorMessage");
var finalscoreList = document.querySelector("#allHighScore");

/**  Here is the event listener to start the timer and hide the quiz button*/
startButton.addEventListener('click', function(event){
    if (event.target === startButton){
        wrapperSection.style.display = 'none';
        setTimer();
        displayQuestions();
    }
    console.log("start quiz button clicked");
});

/** this is the timer funtion which will start counting as soon as the quiz starts*/
function setTimer(){

    myInterval = setInterval(function(){
        myTime--;
        if(myTime <= 0){
            console.log(myTime);
            clearInterval(myInterval);
            alert('Your time is out.')
        }
        timeResult.textContent = "Time:"+" "+ myTime;
        // var timeReset = timeResult.textContent = "Time:"+" "+ myTime;
    },1000);

}