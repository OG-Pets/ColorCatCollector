function magic8Ball() {
    var answers = [
        "Yes", "No", "Maybe", "Ask again later",
        "Definitely", "Absolutely not", "It's possible", "I'm not sure"
    ];
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];

    var button = document.querySelector('.button8ball');
    var answerDiv = document.getElementById('answer');
    
    button.classList.add('shake');

    setTimeout(function() {
        button.classList.remove('shake');
        answerDiv.innerHTML = randomAnswer;
        answerDiv.style.display = 'block';

        setTimeout(function() {
            answerDiv.style.display = 'none';
        }, 3000);
    }, 500);
}

function magic8Ball() {
  var answers = [
    "Yes", "No", "Maybe", "Ask again later",
    "Definitely", "Absolutely not", "It's possible", "I'm not sure",
    "Without a doubt", "Very doubtful", "Better not tell you now",
    "Concentrate and ask again", "Outlook not so good", "Outlook good",
    "Don't count on it", "My sources say no", "My reply is no",
    "Yes, in due time", "Most likely", "Cannot predict now",
    "You may rely on it", "As I see it, yes", "Reply hazy, try again",
    "Signs point to yes", "Hard to tell", "Can't say for sure",
    "Not in a million years", "Certainly", "I wouldn't bet on it",
    "Looks good to me", "I have my doubts", "Unlikely", "Indubitably",
    "In your dreams", "You're in luck", "I wouldn't risk it",
    "Take a chance", "Pretty doubtful", "Bask in certainty",
    "It's a secret", "Only time will tell", "Not now", "Trust in fate",
    "ABXZTQ"
  ];
  
      
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
  
    var button = document.querySelector('.button8ball');
    var answerDiv = document.getElementById('answer');
    
    button.classList.add('shake');
    answerDiv.innerHTML = randomAnswer;
  
    setTimeout(function() {
      button.classList.remove('shake');
      answerDiv.classList.add('show');
      
      setTimeout(function() {
        answerDiv.classList.add('zoom-out');
        
        setTimeout(function() {
          answerDiv.classList.remove('show', 'zoom-out');
        }, 300);
      }, 3000);
    }, 500);
  }
  