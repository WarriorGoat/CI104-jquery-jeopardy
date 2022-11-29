//Set Initial Global Variables
let groupedData = []
let questionPool = []
let thisTurn = {}
let bet = 0
let score = 0

//extract question data from json file
let readJeopardyData = async() => {
    let rawJeopardyData = await fetch('jeopardy.json');
    let data = await rawJeopardyData.json();
    groupedData = _.groupBy(data,'value');
}

readJeopardyData()

//Set initial global quesryselectors
let button100 = document.querySelectorAll(".btn-100");
let button200 = document.querySelectorAll(".btn-200");
let button400 = document.querySelectorAll(".btn-400");
let button600 = document.querySelectorAll(".btn-600");
let button800 = document.querySelectorAll(".btn-800");
let categoryTag = document.querySelector("#category");
let questionTag = document.querySelector("#question");
let scoreTag = document.querySelector("#score");
let answerForm = $("form");
let answerInput = document.querySelector("#finalAnswer");


//Configure Event Listeners
//$100 Bet
for(let i = 0; i<button100.length; i++){
button100[i].addEventListener("click", function(){
        if(_.isEmpty(thisTurn)){
        bet = 100;
        retrieveQuestion(groupedData.$100);
        changeButtonStatus(button100[i]);
        }
        else{alert1();}
    })}


//$200 Bet
for(let i = 0; i<button200.length; i++){
    button200[i].addEventListener("click", function(){
        if(_.isEmpty(thisTurn)){
        bet = 200;
        retrieveQuestion(groupedData.$200);
        changeButtonStatus(button200[i]);
        }
        else{alert1();}
        
    })}

//$400 Bet    
for(let i = 0; i<button400.length; i++){
    button400[i].addEventListener("click", function(){
        if(_.isEmpty(thisTurn)){
        bet = 400;
        retrieveQuestion(groupedData.$400);
        changeButtonStatus(button400[i]);
        }
        else{alert1();}
    })}
       
//$600 Bet
for(let i = 0; i<button600.length; i++){
    button600[i].addEventListener("click", function(){
        if(_.isEmpty(thisTurn)){
        bet = 600;
        retrieveQuestion(groupedData.$600);
        changeButtonStatus(button600[i]);
        }
        else{alert1();}
    })}

//$800 Bet
for(let i = 0; i<button800.length; i++){
    button800[i].addEventListener("click", function(){
        if(_.isEmpty(thisTurn)){
        bet = 800;
        retrieveQuestion(groupedData.$800);
        changeButtonStatus(button800[i]);
        }
        else{alert1();}
    })}


 
answerForm.on("submit", (e) => {
    e.preventDefault();
    if(answerInput.value.toLowerCase()==thisTurn.answer.toLowerCase()){
        score = score + bet;
        alert2();
    }else if (score>bet){
        score = score-bet;
        alert3();
    }else if(score<=bet){
        score = 0;
        alert3();
    }
    updateStatus()
    reset();
    })


//Function Library

function alert1(){
    alert("Please answer the current question");
}

function alert2(){
    alert(`Great Job!! You got it right and added $${bet} to your score.  Your new total is $${score}`);
}

function alert3(){
    alert(`Sorry, your answer is not correct!!  The correct answer was ${thisTurn.answer}. You lost $${bet} from your score.  Your new total is $${score}`);
}

function reset(){
    categoryTag.innerText = "";
    questionTag.innerText = "";
    answerInput.value = "";
    thisTurn={};
}

function changeButtonStatus(buttonClicked){
    buttonClicked.setAttribute ("disabled", "disabled");
    buttonClicked.classList.remove('btn-primary');
    buttonClicked.classList.add('btn-secondary');
}

function updateStatus(){
    scoreTag.innerText = score
    console.log(`Your total is $${score}`)
}

function randomNum(arraySize) {
    let ran = Math.floor(Math.random()*arraySize)
    return ran;
}

function retrieveQuestion(whichPool){
    let questionNum = randomNum(whichPool.length);
    thisTurn.category = whichPool[questionNum].category;
    categoryTag.innerText = thisTurn.category;
    thisTurn.question = whichPool[questionNum].question;
    questionTag.innerText = thisTurn.question;
    thisTurn.answer = whichPool[questionNum].answer;
    console.log(thisTurn.answer);
}