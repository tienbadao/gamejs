const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  currentQuestionIndex = 0
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
 } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the name of the longest river in South America?',
    answers: [
      { text: 'Amazon River', correct: true },
      { text: 'Nile River', correct: false },
     { text: 'Yangtze River', correct: false },
      { text: 'Congo River', correct: false }
    ]
  },
  {
    question: 'Which river runs through Egypt?',
    answers: [
      { text: ' Nile', correct: true  },
      { text: ' Amazon', correct: false },
      { text: 'Mississippi', correct: false  },
      { text: 'Hong', correct: false  }
    ]
  },
  {
    question: 'What is the smallest continent by land area?',
    answers: [
      { text: 'Africa', correct: false  },
      { text: 'North America', correct: false  },
      { text: 'Australia', correct:true   },
      { text: 'Asia', correct: false  }
    ]
  },
  {
    question: 'What is the name of the sea that lies between Europe and Africa?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Mediterranean Sea', correct: true }
    ]
  },
  {
    question: 'Who was the first U.S. president to be impeached?',
    answers: [
      { text: 'Andrew Johnson', correct: true },
      { text: ' Richard Nixon', correct: false },
      { text: ' Bill Clinton', correct: false },
      { text: 'Donald Trump', correct: false }
    ]
  },
  {
    question: 'What is the name of the smallest planet in our solar system?',
    answers: [
      { text: ' Mercury', correct: true },
      { text: ' Mars', correct: false },
      { text: ' Venus', correct: false },
      { text: 'Pluto', correct: false }
    ]
  },
]
