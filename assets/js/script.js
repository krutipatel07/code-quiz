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
function displayQuestions(){
    var myTitle = questions[i].title;
    titleElement.textContent = myTitle;
    var myChoice1 = questions[i].choices[0];
    var myChoice2 = questions[i].choices[1];
    var myChoice3 = questions[i].choices[2];
    var myChoice4 = questions[i].choices[3];

    optionList.innerHTML = '';

    var titleList1 = document.createElement("li");
    titleList1.setAttribute("class", "questionList");
    var btn1 = document.createElement("button");
    btn1.setAttribute("class", "questionBtn");
    btn1.textContent = "1. " + myChoice1;
    titleList1.appendChild(btn1);
    optionList.appendChild(titleList1);
    quizContainer.appendChild(optionList);

    var titleList2 = document.createElement("li");
    titleList2.setAttribute("class", "questionList");
    var btn2 = document.createElement("button");
    btn2.setAttribute("class", "questionBtn");
    btn2.textContent = "2. " + myChoice2;
    titleList2.appendChild(btn2);
    optionList.appendChild(titleList2);
    quizContainer.appendChild(optionList);

    var titleList3 = document.createElement("li");
    titleList3.setAttribute("class", "questionList");
    var btn3 = document.createElement("button");
    btn3.setAttribute("class", "questionBtn");
    btn3.textContent = "3. " + myChoice3;
    titleList3.appendChild(btn3);
    optionList.appendChild(titleList3);
    quizContainer.appendChild(optionList);

    var titleList4 = document.createElement("li");
    titleList4.setAttribute("class", "questionList");
    var btn4 = document.createElement("button");
    btn4.setAttribute("class", "questionBtn");
    btn4.textContent = "4. " + myChoice4;
    titleList4.appendChild(btn4);
    optionList.appendChild(titleList4);
    quizContainer.appendChild(optionList);

    var allQuestionBtn = document.querySelectorAll(".questionBtn");
    allQuestionBtn.forEach(function(event){
        event.addEventListener("click", onclickHandler)
    });
    function onclickHandler(event){

    if(myTime <= 0){
        clearInterval(myInterval);
        quizContainer.style.display = "none";
        displayResult();
    }

    var answerText = event.target.textContent;
    if(answerText === questions[i].answer){
        myTime = myTime;
        responsDiv.setAttribute("style", "color: green; border-top: 2px solid gray; font-style: italic")
        responsDiv.textContent = "Correct!";
    } else{
        responsDiv.setAttribute("style", "color: red; border-top: 2px solid gray; font-style: italic")
        responsDiv.textContent = "Wrong!";
        myTime = myTime - 10;
    }

    if(i < questions.length-1){
        i++;

        setTimeout(function(){
            displayQuestions();

            responsDiv.textContent = "";
        },1000)
    }else {
        setTimeout(function () {

            responsDiv.textContent = "";
            displayResult();
            clearInterval(myInterval);         
        }, 500)

        quizContainer.innerHTML = '';
    }
}
}

function onclickHandler(event){

    if(myTime <= 0){
        clearInterval(myInterval);
        quizContainer.style.display = "none";
        displayResult();
    }
    var answerText = event.target.textContent;
    if(answerText === questions[i].answer){
        myTime = myTime;
        responsDiv.setAttribute("style", "color: green; border-top: 2px solid gray; font-style: italic")
        responsDiv.textContent = "Correct!";
    } else{
        responsDiv.setAttribute("style", "color: red; border-top: 2px solid gray; font-style: italic")
        responsDiv.textContent = "Wrong!";
        myTime = myTime - 10;
    }
    if(i < questions.length-1){
        i++;

        setTimeout(function(){
            displayQuestions();

            responsDiv.textContent = "";
        },1000)
    }else {
        setTimeout(function () {

            responsDiv.textContent = "";
            displayResult();
            clearInterval(myInterval);         
        }, 500)

        quizContainer.innerHTML = '';
    }
}
/**Function to display users final score */    
function displayResult(){
    responsDiv.setAttribute("style", "border-top: none")
    finishSection.style.visibility = "visible";
    timeResult.textContent = "Time:" + " " + myTime;
    var highScores = myTime;
    // localStorage.getItem(highScores)
    finalScore.textContent = "Your finale score is " + highScores + ".";
    // localStorage.setItem("HighScores", highScores)
} 