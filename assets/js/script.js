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
// var currentQuention = 0;
var myTime = 75;
var myInterval;

/** Create an  array of questions*/
var questions = [
    {
        title: "Commonly used data types DO Not Include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        title: "The condition in an if / else statement is enclosed with ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis",
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above",
    },
    {
        title: "String values must be enclosed within when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes",
    },    
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log",
    }
]

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

/**declare the index variable for the onclickHandler and displayQuestions function**/
var i = 0;

 /**Create next questions to be added to the HTML document dynamically*/
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
    btn1.textContent = myChoice1;
    titleList1.appendChild(btn1);
    optionList.appendChild(titleList1);
    quizContainer.appendChild(optionList);

    var titleList2 = document.createElement("li");
    titleList2.setAttribute("class", "questionList");
    var btn2 = document.createElement("button");
    btn2.setAttribute("class", "questionBtn");
    btn2.textContent = myChoice2;
    titleList2.appendChild(btn2);
    optionList.appendChild(titleList2);
    quizContainer.appendChild(optionList);

    var titleList3 = document.createElement("li");
    titleList3.setAttribute("class", "questionList");
    var btn3 = document.createElement("button");
    btn3.setAttribute("class", "questionBtn");
    btn3.textContent = myChoice3;
    titleList3.appendChild(btn3);
    optionList.appendChild(titleList3);
    quizContainer.appendChild(optionList);

    var titleList4 = document.createElement("li");
    titleList4.setAttribute("class", "questionList");
    var btn4 = document.createElement("button");
    btn4.setAttribute("class", "questionBtn");
    btn4.textContent = myChoice4;
    titleList4.appendChild(btn4);
    optionList.appendChild(titleList4);
    quizContainer.appendChild(optionList);

    var allQuestionBtn = document.querySelectorAll(".questionBtn");
    allQuestionBtn.forEach(function(event){
        event.addEventListener("click", onclickHandler)
    });
}

/**Add a function to compare the answers and display each questions as the buttons are clicked.*/
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

  

/** This event listner submit the initial and final score to the local storage */

submitButton.addEventListener("click", function (event) {
    console.log("click submit");
    event.preventDefault();
    var initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";

        var storeHighScore = JSON.parse(localStorage.getItem("storeHighScore")) || [] ;
        var currentUser = {
            score: myTime,
            initial: initialInput
        }
        storeHighScore.push(currentUser);
        localStorage.setItem("storeHighScore", JSON.stringify(storeHighScore));

        // localStorage.getItem(initialInput)
        // localStorage.setItem("Initial", initialInput)
        renderLastItem();
    }
})

/**function to show the last page  */
function renderLastItem() {
    finishSection.textContent = "";
    var finalPage = document.querySelector(".finalPage");
    finalPage.style.visibility = "visible";

    var storeHighScore = JSON.parse(localStorage.getItem("storeHighScore")) || [] ;
    console.log(storeHighScore);
    for(i =0; i< storeHighScore.length; i++){
        console.log(storeHighScore[i]);
        var preScore = document.createElement("li");
        preScore.textContent =i + 1 + ". " + storeHighScore[i].initial + " - " + storeHighScore[i].score;
        finalscoreList.appendChild(preScore);
    }
    // var yourScore = localStorage.getItem("HighScores");
    // var yourInitial = localStorage.getItem("Initial");
    // if (yourScore && yourInitial === "") {
    //     return
    // }
    // finishSection.textContent = "";
    // var finalPage = document.querySelector(".finalPage");
    // finalPage.style.visibility = "visible";
    // var initialAndScore = document.querySelector("#staticName");
    // initialAndScore.value = yourInitial + ":" + " " + yourScore;
}

/**This function will refresh the page and send user back to begining page when go back button is clicked */
function init() {
    location.reload();  
}

/**This function will  clear initial and score displayed on the final page */
function clearScore() {
    finalscoreList.innerHTML = "";
    localStorage.clear("storeHighScore");
}

// -----extra----
    // console.log('click the btn');
    // console.log(currentQuention);
    // console.log(Questions[currentQuention].title);
    // currentQuention++;

    // finishSection.style.display = "block";