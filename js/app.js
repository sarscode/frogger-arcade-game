// Global variables
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const close = document.querySelector('.close');
const startBtn = document.querySelector('.start-btn');

close.addEventListener('click', () => {
  modal.classList.add('hide');
});

startBtn.addEventListener('click', () => {
  modal.classList.toggle('hide');
});

function gameOver() {
  modal.classList.toggle('hide');
  close.classList.add('hide');
  modalContent.innerHTML = `
        <h1>Game Over !!!</h1>
        <p>You're here because you lost all 3 lives</p>
        <h3>Play again to win the game</h3>
        <button class="btn start-btn" onClick="startGame()"> Play Again</button>
    `;
}

function startGame() {
  modal.classList.toggle('hide');
  console.log('startGame');
  lives.push(new Life(10, 540), new Life(30, 540), new Life(50, 540));
}

/*
 * Class creation
 */

// Enemy class
class Enemy {
  constructor(x, y, speed = 1) {
    this.x = x;
    this.y = y;
    this.location = (x, y);
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.x += this.speed * dt;
    // console.log(this.x);

    // reset position of enemy to move across again when it goes off the canvas
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * this.speed);
    }

    // check collision with player object
    if (
      player.x < this.x + 60 &&
      player.x + 65 > this.x &&
      player.y < this.y + 65 &&
      40 + player.y > this.y
    ) {
      // console.log('collided');
      player.reset();
      if (scoreBoard.score >= 100) {
        scoreBoard.score -= 100;
      }
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
    // this.sprite = chars[0];
  }
  // updates player object position based on arrow key press
  update(keyPress) {
    if (keyPress === 'left' && this.x > 0) {
      this.x -= 100;
      // console.log(player.x + 'left');
    } else if (keyPress === 'up' && this.y > 0) {
      this.y -= 90;
      //   console.log(player.y + 'up');
    } else if (keyPress === 'right' && this.x < 400) {
      this.x += 100;
      // console.log(player.x + 'right');
    } else if (keyPress === 'down' && this.y < 400) {
      this.y += 90;
      //   console.log(player.y + 'down');
    }

    if (this.y <= 0) {
      this.x = 200;
      this.y = 400;
      chars.shift();
      this.sprite = chars[0];
      scoreBoard.update();
      // console.log(chars);
    }
  }

  // collects the key pressed by user
  handleInput(keyPress) {
    this.update(keyPress);
  }
  reset() {
    this.x = 200;
    this.y = 400;
    if (lives.length === 0) {
      gameOver();
    } else {
      lives.pop();
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Player lives to show in the canvas area
class Life {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 20, 40);
  }
}

class ScoreBoard {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
  }
  update() {
    this.score += 200;
  }
  render() {
    ctx.font = 'bold 20px serif';
    ctx.fillText(this.score, this.x, this.y);
  }
}

/*
 * Object Instances
 */

// Enemy Instances
const allEnemies = [
  new Enemy(0, 60, 150),
  new Enemy(0, 145, 115),
  new Enemy(0, 230, 125)
];

// Player Object
const player = new Player(200, 400);

// Life Object
const lives = [new Life(10, 540), new Life(30, 540), new Life(50, 540)];

// Score Board
const scoreBoard = new ScoreBoard(410, 570);

// Player characters
const chars = [
  'images/char-princess-girl.png',
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png'
];

const nextPlayer = (function() {
  let index;
  index = 0;
  return () => {
    index++;
  };
})();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
