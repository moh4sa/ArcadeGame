var time = 1;
// my Enemy class
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.box = {
      //box for collision detection
      width: 94,
      height: 61
    };
  }
  update(dt) {
    this.x = this.x + this.speed * dt;
    this.box.x = this.x + 3;
    this.box.y = this.y + 81;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player Class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
    //box for collision detection
    this.box = {
      width: 47,
      height: 64
    };
  }
  update() {
    this.box.x = this.x + 28;
    this.box.y = this.y + 74;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(input) {
    //  this switch helps keep the player inside the canvas
    switch (input) {
      case "left":
        if (this.x < 101) {
          break;
        }
        this.x += -101;
        break;

      case "right":
        if (this.x > 404) {
          break;
        }
        this.x += 101;
        break;

      case "down":
        if (this.y > 399) {
          break;
        }
        this.y += +83;
        break;

      case "up":
        if (this.y < 68) {
          reset();
        }
        if (this.y < -14) {
          break;
        }
        this.y += -83;
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(202, 400);
let allEnemies = [];
allEnemies.push(new Enemy(-171, 50, randomSpeed()));
allEnemies.push(new Enemy(-171, 130, randomSpeed()));
allEnemies.push(new Enemy(-171, 220, randomSpeed()));
// recreate 3 enemies every 1 second
let interval = setInterval(function() {
  if (time <= 10) {
    allEnemies.push(new Enemy(-171, 50, randomSpeed()));
    allEnemies.push(new Enemy(-171, 130, randomSpeed()));
    allEnemies.push(new Enemy(-171, 220, randomSpeed()));
    time++;
  } else {
    console.log("time = 0");
    time = 0;
  }
}, 2000);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
// reset the game when the player wins
function reset() {
  alert("Congratulations, you won!");
  window.location.href = window.location.href;
}
// this function helps to generate random speed for each enemy
function randomSpeed() {
  // return speed between 0 and 400
  return 100 + Math.floor(Math.random() * 300);
}
