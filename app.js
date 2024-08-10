const questions = [
    {
        question: "Love mo ba si Kim?",
        answers: [
            {text: "Oo gad", correct: false},
            {text: "Medyo la", correct: false},
            {text: "Diri na", correct: false},
            {text: "Sobra!", correct: true},
            {text: "Oo pero guti nala bayaan kona", correct: false}
        ]
    },

    {
        question: "Na iimagine mo siya nga makaupod na hasta san ka hasta?",
        answers: [
            {text: "Oo gad", correct: false},
            {text: "Diri na", correct: false},
            {text: "Oo hasta mapatay ko siya", correct: false},
            {text: "Oo! Siya na akon karuyag hasta san kahasta!", correct: true},
            {text: "Diri kay kauyam", correct: false}
        ]
    },

    {
        question: "Pero love mo gud?",
        answers: [
            {text: "Oo gad", correct: false},
            {text: "Medyo la", correct: false},
            {text: "Diri na", correct: false},
            {text: "Pisti ka", correct: false},
            {text: "Ura-ura..", correct: true}
        ]
    }
]

let currentQuestionIndex = 0;
let timer;
let timeLeft = 10;
let score = 0;
let hasAnswer = false


function startQuiz() {

    document.querySelector('.quiz-container').style.display = "block"
  
    currentQuestionIndex =  0
    showQuestion(questions[currentQuestionIndex])
    startTimer()
    
    
}

function showQuestion(question) {

    const questionElement = document.querySelector('.question')
    questionElement.textContent = question.question
    const answersContainer = document.querySelector('.answer-container')
    answersContainer.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.classList.add('ans-btn')
        button.textContent = answer.text
        button.addEventListener('click', () => {
          if(!hasAnswer){
            hasAnswer= true 
            document.querySelectorAll('.ans-btn').forEach(btn => btn.disabled = true);
            selectAnswer(answer)
            // console.log(hasAnswer)
          } 
            if( hasAnswer && currentQuestionIndex === questions.length - 1){
              document.querySelector('.open').style.display ="block"
          }
          
            
            
        });

        answersContainer.appendChild(button);
    })

    document.querySelectorAll('.ans-btn').forEach(btn => btn.disabled = false);
}


function selectAnswer(answer) {
    clearInterval(timer);
    // Check if the selected answer is correct
    const message = document.querySelector('.message')
    message.style.display = "block"
    if (answer.correct) {
        if(timeLeft > 0) {
        score++
        const displayScore = document.querySelector('.score')
        displayScore.innerText = `Score: ${score}/3`
        message.innerText = "VERY GOOD!"
        }
    } else  {
        // alert('Wrong!');
        console.log('wrong')
        
      message.innerText = "UPAYA!"
      
        // nextQuestion();

 
}
    // document.getElementById('next-button').disabled = false;
}

function startTimer() {
    if(timer) {
        clearInterval(timer)
    }

    timeLeft = 10; // Reset time for each question
    document.getElementById('timer-display').textContent = formatTime(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').textContent = formatTime(timeLeft);

        if(timeLeft <= 0 && currentQuestionIndex === questions.length - 1) {
            document.querySelector('.open').style.display ="block"
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // alert('Time is up!');
            nextQuestion()
  
            
        }
        
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


function nextQuestion() {
    hasAnswer = false; 
     currentQuestionIndex++
  
     if(currentQuestionIndex < questions.length ) {
        showQuestion(questions[currentQuestionIndex])
        startTimer()
        // hasAnswer = false; 
        document.querySelectorAll('.ans-btn').forEach(btn => btn.disabled = false);
     }if(currentQuestionIndex === questions.length - 1) {
        document.getElementById('next-button').style.display ="none"
        // document.querySelector('.open').style.display ="block"
     }

 
}

document.getElementById('next-button').addEventListener('click', function() {

    nextQuestion()
    document.querySelector('.message').style.display = "none"
});

document.getElementById('start-btn').addEventListener('click',function() {
         document.querySelector('#start-btn').style.display = "none"
           document.querySelector('.ready').style.display = "none"
         startQuiz()
})

document.querySelector('.open').addEventListener('click',function() {

    document.querySelector('.quiz-container').style.display = "none"
    document.querySelector('.final-message').style.display = "block"
    document.querySelector('.open').style.display ="none"
})



