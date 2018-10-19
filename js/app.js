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
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y
    ) {
      // console.log('collided');
      player.reset();
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
    this.sprite = 'images/char-boy.png';
  }
  // updates player object position based on kep press
  update(keyPress) {
    if (keyPress === 'left' && this.x > 0) {
      this.x -= 100;
      // console.log(player.x + 'left');
    } else if (keyPress === 'up' && this.y > 0) {
      this.y -= 90;
      // console.log(player.y + 'up');
    } else if (keyPress === 'right' && this.x < 400) {
      this.x += 100;
      // console.log(player.x + 'right');
    } else if (keyPress === 'down' && this.y < 400) {
      this.y += 90;
      // console.log(player.y + 'down');
    }
  }

  // collects the key pressed by user
  handleInput(keyPress) {
    this.update(keyPress);
  }
  reset() {
    this.x = 200;
    this.y = 400;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/*
 * Object Instances
 */

// Enemy Instances
var allEnemies = [
  new Enemy(-200, 60, 40),
  new Enemy(-200, 145, 35),
  new Enemy(-200, 230, 30)
];

// Player Object
var player = new Player(200, 400);

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
