//! SELECT ELEMENTS
// home page
const playBtn = document.querySelector('.play');
const info = document.querySelector('.info');
const board = document.querySelector('.board');
// gaming page
const winner = document.querySelector('.winner');
const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');
const options = document.querySelectorAll('.options button');
// getting scores
const pScore = document.querySelector('.player-score h2');
const cScore = document.querySelector('.computer-score h2');
// modal
const modalOverlay = document.querySelector('.modal-overlay');
const result = document.getElementById('result');
const quitBtn = document.getElementById('quit');
const restartBtn = document.getElementById('restart');

//! DEFINE SCORES
let playerScore = 0;
let computerScore = 0;

//! FUNCTIONS
//----------> START GAME WITH DEFAULTS
const startGame = () => {
  // set and clear defaults
  modalOverlay.classList.remove('open-modal');
  playerScore = 0;
  computerScore = 0;
  updateScore();
  playerHand.src = `./assests/rock.png`;
  computerHand.src = `./assests/rock.png`;
  winner.textContent = 'Pick a move 🧐';
  winner.className = 'winner';
};

//----------> SETUP GAME BEFORE EVERY MOVE
const setupGame = () => {
  // default option images
  playerHand.src = `./assests/rock.png`;
  computerHand.src = `./assests/rock.png`;

  // add animation
  playerHand.classList.add('animatePlayer');
  computerHand.classList.add('animateComputer');
};

//----------> UPDATEGAME AFTER EVERY MOVE
const updateGame = (userChoice, computerChoice) => {
  // update images
  playerHand.src = `./assests/${userChoice}.png`;
  computerHand.src = `./assests/${computerChoice}.png`;

  // remove animations
  playerHand.classList.remove('animatePlayer');
  computerHand.classList.remove('animateComputer');
};

//----------> COMPARECHOICE TO COMPARE BOTH CHOICES
const compareChoice = (userChoice, computerChoice) => {
  let text, color;

  // check for draw
  if (userChoice === computerChoice) {
    text = `Tie. You're a bot! 😮`;
  }

  // if you get rock
  else if (userChoice === 'rock') {
    if (computerChoice === 'paper') {
      text = 'Computer Won! 😆';
      computerScore++;
      color = 'danger';
    } else {
      text = 'You won! 😏';
      playerScore++;
      color = 'success';
    }
  }

  // if you get paper
  else if (userChoice === 'paper') {
    if (computerChoice === 'scissors') {
      text = 'Computer Won! 😆';
      computerScore++;
      color = 'danger';
    } else {
      text = 'You won! 😏';
      playerScore++;
      color = 'success';
    }
  }

  // you obv got scissors
  else if (computerChoice === 'rock') {
    text = 'Computer Won!😆';
    computerScore++;
    color = 'danger';
  } else {
    text = 'You won! 😏';
    playerScore++;
    color = 'success';
  }

  winner.textContent = text;
  winner.className = `winner ${color}`;
};

//----------> UPDATESCORE TO UPDATE BOTH SCORE
const updateScore = () => {
  pScore.textContent = playerScore;
  cScore.textContent = computerScore;
};

//----------> CHECKSCORE TO DECLARE WINNER
const checkScore = () => {
  if (playerScore >= 5) {
    result.textContent = 'Congrats! You actually won.🎉';
    modalOverlay.classList.add('open-modal');
  }
  if (computerScore >= 5) {
    result.textContent = 'Wow man! You lost to a bot.🤡';
    modalOverlay.classList.add('open-modal');
  }
};

//----------> PLAYGAME - MAIN FUNCTION
const playGame = () => {
  // loop over all options
  options.forEach((option) => {
    // for every option clicked
    option.addEventListener('click', () => {
      //* setup game
      setupGame();

      setTimeout(() => {
        //* get choices of both
        const computerChoice =
          options[Math.floor(Math.random() * 3)].textContent;
        const userChoice = option.textContent;

        //* update DOM with choices
        updateGame(userChoice, computerChoice);

        //* compare both choices
        compareChoice(userChoice, computerChoice);

        //* update score
        updateScore();

        //* check score
        checkScore();
      }, 1200);
    });
  });
};

//! EVENT LISTENERS
// when playBtn is clicked
playBtn.addEventListener('click', () => {
  info.classList.add('fadeOut');
  board.classList.add('fadeIn');
  playGame();
});

// when quitBtn is clicked
quitBtn.addEventListener('click', () => window.close());

// when restart btn is clicked
restartBtn.addEventListener('click', startGame);
