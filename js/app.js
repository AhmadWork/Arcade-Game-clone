'use strict';
//Here we define the player class 
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.live = 5;
};

Player.prototype.update = function(dt) {
    // we make sure the player dosent move outside the game board 
    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;

        }

        this.x = 400;

    }
    if (this.y < 0 || this.y > 400) {
        if (this.y < 0) {
            this.score += 100
            document.getElementById("score").innerHTML = "score :" + this.score;
            this.reset();
        }

        this.y = 400;

    }
    // we call the collision function
    this.collision();
};
// we handle the movment of the player 
Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.x -= 100;
    }

    if (direction == 'right') {
        this.x += 100;
    }

    if (direction == 'up') {
        this.y -= 83;
    }

    if (direction == 'down') {
        this.y += 83;
    }
};

// we render the player character 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// we reset the player to start
Player.prototype.reset = function() {
    this.y = 400;
    this.x = 200;
};
// we check if the player hit the enemy 
Player.prototype.collision = function() {

    for (var i = 0; i < allEnemies.length; i++) {
        // MDN 2D collision detection method
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 10 &&
            10 + this.y > allEnemies[i].y) {
            this.live -= 1;
            this.score -= 100;
            document.getElementById("score").innerHTML = "score :" + this.score;
            document.getElementById("live").innerHTML = "live :" + this.live;
            if (this.live == 0) {
                alert("you lost !!");
                this.score = 0;
                this.live = 5;
                document.getElementById("score").innerHTML = "score :" + this.score;
                document.getElementById("live").innerHTML = "live :" + this.live;
            }

            this.reset();
        }
    }
}
var player = new Player(200, 430);

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;


    this.sprite = 'images/enemy-joe.png';

};


Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = 0;
    }

};

// we render the enemy character
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

document.getElementById("score").innerHTML = "score :" + player.score;
document.getElementById("live").innerHTML = "live :" + player.live;
var enemy1 = new Enemy(0, 220, 100);

var enemy2 = new Enemy(0, 145, 150);

var enemy3 = new Enemy(0, 60, 70);

var allEnemies = [enemy1, enemy2, enemy3];

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