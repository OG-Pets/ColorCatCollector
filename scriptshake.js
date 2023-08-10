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
        "You may rely on it", "As I see it, yes", "Reply hazy, try again", "ABXZTQ"
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
  