var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640; //FIND BACKGROUND PICTURE

document.getElementById("game").appendChild(canvas);

var backgroundImage = new Image();
backgroundImage.src = "background.png"; //FIND BACKGROUND PICTURE

var speedMod = .5;
var gameOn = false;

var hero = new Image();
hero.src = "boat.png"; //FIND HERO PICTURE
var heroLoc = {
	x: 800,
	y: 205
};

var monster = new Image(); //actually a fruit right now
monster.src = "fish-left.gif"; //FIND MONSTER PICTURE
var monsterLoc = {
	x: 200,
	y: 400
}

var enemy = new Image();
enemy.src = "pirate-ship.png";
var enemyLoc = {
	x: 200,
	y: 205
}

var storm = new Image();
storm.src = "storm.png"
var stormLoc = {
	x: 200,
	y: 10
}

var cannonLeft = new Image();
cannonLeft.src = "cannon-ball.png";
var cannonLeftLoc = {
	x: 800,
	y: 225
}
var cannonRight = new Image();
cannonRight.src = "cannon-ball.png";
var cannonRightLoc = {
	x: 810,
	y: 225
}
var seaweed = new Image();
seaweed.src = "seaweed.png";
var seaweedLoc = {
	x: 400,
	y: 600
}

// var monster2 = new Image();
// tree.src = "fish.gif";
// var monsterLoc = {
// 	x: 150,
// 	y: 500
// };

// var tree2 = new Image();
// tree2.src = "wall.png";
// var tree2Loc = {
// 	x: 80,
// 	y: 500
// };
// var tree3 = new Image();
// tree3.src = "wall.png";
// var tree3Loc = {
// 	x: 145,
// 	y: 500
// };
// var tree4 = new Image();
// tree4.src = "wall.png";
// var tree4Loc = {
// 	x: 210,
// 	y: 500
// };


var monsterDestX = Math.random() * 400;
var monsterDestY = Math.random() * 400;
var enemyDestX = 1000;
var enemyDestY = 0; 
// var treeDestX = 275
// var treeDestY = 0
var cannonLeftDestX = -1000;
var cannonLeftDestY = -1000;
var cannonRightDestX = 1000;
var cannonRightDestX = 1000;
var stormDestX = 500;
var stormDestY = 0;

var currentPlayerScore = 0;
var highScore = 0;
var gameStart = 0;
var gameEnd = 0;
var timerInterval;
var playerArray = [];

var counterInterval;

var keysPressed = []
addEventListener("keydown", function(event){
	keysPressed[event.keyCode] = true;
});
addEventListener("keyup", function(event){
	delete keysPressed[event.keyCode];
});

function Player(name){
	this.name = name;
	this.currentScore = 0;
	this.highScore = 0;
}



function newPlayer(){
	var playerNameDiv = document.getElementById("player-name");
	var playerName = playerNameDiv.value;
	var player = new Player(playerName);
	playerArray.push(player);
	currentPlayer = playerArray[playerArray.length - 1];
	console.log(currentPlayer);
}

function startGame(){
	gameOn = true;
	gameStart = Date.now();
	gameEnd = Date.now() + 30000; //change this to change the timer
	timerInterval = setInterval(updateTimer, 500);
	currentPlayerScore = 0;
	document.getElementById("score-value").innerHTML = 0;
}

function pause(){
	clearInterval(counterInterval);
	gameOn = false;
}

function updateTimer(){
	var newNow = Date.now();
	var timeDifference = Math.floor((gameEnd - newNow) / 1000);
	if(timeDifference <= 0){
		gameOn = false;
		timeDifference = 0;
		document.getElementById("timer").innerHTML = "Game Over!!!";
	}else{
		document.getElementById("timer").innerHTML = timeDifference + " seconds";
	}
}

function update(){
	if(37 in keysPressed){
		if(heroLoc.x > 0){ //change this 30 to the width of the left barrier
			heroLoc.x -= (10 * speedMod);
		}
	}
	if(37 in keysPressed){
		if(heroLoc.x <= 0){ //this makes boat neo in a train station from left
			heroLoc.x = 1840 * speedMod;
		}
	}
	// if(38 in keysPressed){
	// 	if(heroLoc.y > 20){ //change this 30 to the height of the top barrier
	// 		heroLoc.y -= (10 * sspeedMod);
	// 	}
	// }
	if(39 in keysPressed){
		if(heroLoc.x < 920){ //change this 450 to the width of the right barrier
			heroLoc.x += (10 * speedMod);
		}
	}
	if(39 in keysPressed){
		if(heroLoc.x >= 920){ //this makes the boat neo in a train station from right
			heroLoc.x = 0 * speedMod;
		}
	}
	if(65 in keysPressed){
		if((Math.abs(cannonLeftDestX - cannonLeftLoc.x)) < 32 &&
			(Math.abs(cannonLeftDestY - cannonLeftLoc.y)) < 32){
			cannonLeftDestX = Math.floor(Math.random() * -1000);
			cannonLeftDestY = Math.floor(Math.random() * -640);
		}else{
			if(cannonLeftDestX > cannonLeftLoc.x){
				cannonLeftLoc.x += Math.ceil(Math.random() * 15);
			}
			if(cannonLeftDestX < cannonLeftLoc.x){
				cannonLeftLoc.x -= Math.ceil(Math.random() * 15);
			}
			// if(cannonLeftDestY > cannonLeftLoc.y){
			// 	monsterLoc.y += Math.ceil(Math.random() * 15);
			// }
			// if(cannonLeftDestY < cannonLeftLoc.y){
			// 	cannonLeftLoc.y -= Math.ceil(Math.random() * 15);
			// }
			// if(cannonLeftDestY < 250){
			// 	cannonLeftDestY = 500;
			// }
			if(cannonLeftLoc.x <= -10){
				cannonLeftLoc.x = heroLoc.x;
			}
			// if(cannonLeftLoc.x >= 920){
			// 	cannonLeftLoc.x = 0
			// }
		}
	}
	if(68 in keysPressed){
		if((Math.abs(cannonRightDestX - cannonRightLoc.x)) < 32 &&
			(Math.abs(cannonRightDestY - cannonRightLoc.y)) < 32){
			cannonRightDestX = Math.floor(Math.random() * 1000);
			cannonRightDestY = Math.floor(Math.random() * 640);
		}else{
			if(cannonRightDestX > cannonRightLoc.x){
				cannonRightLoc.x += Math.ceil(Math.random() * 15);
			}
			if(cannonRightDestX < cannonRightLoc.x){
				cannonRightLoc.x -= Math.ceil(Math.random() * 15);
			}
			// if(cannonLeftDestY > cannonLeftLoc.y){
			// 	monsterLoc.y += Math.ceil(Math.random() * 15);
			// }
			// if(cannonLeftDestY < cannonLeftLoc.y){
			// 	cannonLeftLoc.y -= Math.ceil(Math.random() * 15);
			// }
			// if(cannonLeftDestY < 250){
			// 	cannonLeftDestY = 500;
			// }
			if(cannonRightLoc.x >= 960){
				cannonRightLoc.x = heroLoc.x;
			}
		}
	}
			// if(cannonLeftLoc.x >= 920){
			// 	cannonLeftLoc.x = 0
			// }
	// if(40 in keysPressed){
	// 	if(heroLoc.y < 700){ //change this 412 to the height of the bottom barrier
	// 		heroLoc.y += (10 * speedMod);
	// 	}
	// }

	// if(65 in keysPressed){
	// 	if(cannonLeftLoc.x > 0){
	// 		cannonLeftLoc.x += 10 * speedMod;
	// 	}
	// }
	// if(65 in keysPressed){
	// 	if(cannonLeftLoc.x >= 920){
	// 		cannonLeftLoc.x =  * speedMod;
	// 	}
	// }
			


	//change the 32s if want to change the hero/monster size
	//THIS MAKES IT SO YOU CANT PASS THROUGH
	// if((heroLoc.x <= treeLoc.x + 48) &&
	// 	(heroLoc.y <= treeLoc.y + 48) &&
	// 	(treeLoc.x <= heroLoc.x + 48) &&
	// 	(treeLoc.y <= heroLoc.y + 48) &&
	// 	keysPressed){
	// 	heroLoc.x = heroLoc.x - 10;
	// 	heroLoc.y = heroLoc.y - 10;
	// }
	if(((heroLoc.x <= enemyLoc.x + 48) &&
		(heroLoc.y <= enemyLoc.y + 48) &&
		(enemyLoc.x <= heroLoc.x + 48) &&
		(enemyLoc.y <= heroLoc.y + 48)) ||
		((cannonLeftLoc.x <= enemyLoc.x + 48) &&
		(enemyLoc.x <= cannonLeftLoc.x + 48))){
			console.log("HERO KILLED A PIRATE");
	// if((cannonLeftLoc.x <= enemyLoc.x + 48) &&
	// 	(enemyLoc.x <= cannonLeftLoc.x + 48) &&
	// 	(cannonLeftLoc.y <= enemyLoc.y + 48) &&
	// 	(enemyLoc.y <= cannonLeftLoc.y + 48)){
	// 		console.log("You hit an enemy!");
	// }

			currentPlayerScore++
			document.getElementById("score-value").innerHTML = currentPlayerScore;
			if(currentPlayerScore > highScore){
				highScore = currentPlayerScore;
				document.getElementById("high-score-value").innerHTML = highScore;
			}
			var currentPlayerIndex = playerArray.length - 1;
			if(currentPlayerScore > playerArray [currentPlayerIndex]){
				playerArray[currentPlayerIndex].highScore = currentPlayerScore;
			}

			//change the 400 if you want monster to spawn closer/farther
			var enemyLocNewX = -100
			var enemyLocNewY = 205;
			enemyLoc.x = enemyLocNewX;
			enemyLoc.y = enemyLocNewY;
			enemy.src = "explosion.png"
				if(enemy.src = "explosion.png"){
					// enemy.src = "boat.png";
					enemyLoc.x = 0;
					// if(enemy.src = "boat.png"){
					// 	enemy.src = "pirate-ship.png";
					// }
				}
			// var enemyLocNewX = -1000;
			// var enemyLocNewY = -1000
			// enemyLoc.x = enemyLocNewX;
			// enemyLoc.y = enemyLocNewY;
		}
}


//1. change 32x32 if you change the size of the monster
//2. change the 440 if you want the monster destination to change closer/farther
//3. change the 3 if you want speed mod to change faster or slower
	//for each direction
function monsterMove (){
	if((Math.abs(monsterDestX - monsterLoc.x)) < 32 &&
		(Math.abs(monsterDestY - monsterLoc.y)) < 32){
		monsterDestX = Math.floor(Math.random() * 2000);
		monsterDestY = Math.floor(Math.random() * 640);
	}else{
		if(monsterDestX > monsterLoc.x){
			monsterLoc.x += Math.ceil(Math.random() * 5);
		}
		if(monsterDestX < monsterLoc.x){
			monsterLoc.x -= Math.ceil(Math.random() * 5);
		}
		if(monsterDestY > monsterLoc.y){
			monsterLoc.y += Math.ceil(Math.random() * 5);
		}
		if(monsterDestY < monsterLoc.y){
			monsterLoc.y -= Math.ceil(Math.random() * 5);
		}
		if(monsterDestY < 250){
			monsterDestY = 500;
		}
		if(monsterLoc.x <= -1){
			monsterLoc.x = 1840
		}
		if(monsterLoc.x >= 920){
			monsterLoc.x = 0
		}
	}
}

function stormMove (){
	if((Math.abs(stormDestX - stormLoc.x)) < 75){
		stormDestX = Math.floor(Math.random() * 1000);
	}else{
		if(stormDestX > stormLoc.x){
			stormLoc.x += Math.ceil(Math.random() * 10);
		}
		if(stormDestX < stormLoc.x){
			stormLoc.x -= Math.ceil(Math.random() * 10);
		}
		if(stormLoc.x <= 0){
			stormLoc.x = 1840
		}
		if(stormLoc.x >= 920){
			stormLoc.x = 0
		}
	}
}

function enemyMove (){
	if((Math.abs(enemyDestX - enemyLoc.x)) < 48){
		enemyDestX = Math.floor(Math.random() * 1000);
	}else{
		if(enemyDestX > enemyLoc.x){
			enemyLoc.x += Math.ceil(Math.random() * 3);
		}
		if(stormDestX < enemyLoc.x){
			enemyLoc.x -= Math.ceil(Math.random() * 3);
		}
		if(enemyLoc.x <= 0){
			enemyLoc.x = 1840
		}
		if(enemyLoc.x >= 920){
			enemyLoc.x = 0
		}
	}
}
	//UNCOMMENT IF YOU WANT THE TREE TO MOVE
	// if((Math.abs(treeDestX - treeLoc.x)) < 48){
	// 	treeDestX = Math.floor(Math.random() * 250);
	// }else{
	// 	if (treeDestX > treeLoc.x){
	// 		treeLoc.x += Math.ceil(Math.random() * 3);
	// 	}
	// 	if (treeDestX < treeLoc.x){
	// 		treeLoc.x -= Math.ceil(Math.random() * 3);
	// 	}
	// }

function draw(){
	if(gameOn){
		update();
		monsterMove();
		stormMove();
		enemyMove();
	}
	context.drawImage(backgroundImage, 0,0);
	context.drawImage(hero, heroLoc.x, heroLoc.y);
	context.drawImage(monster, monsterLoc.x, monsterLoc.y);
	context.drawImage(cannonLeft, cannonLeftLoc.x, cannonLeftLoc.y)
	context.drawImage(cannonRight, cannonRightLoc.x, cannonRightLoc.y)
	context.drawImage(storm, stormLoc.x, stormLoc.y)
	context.drawImage(seaweed, seaweedLoc.x, seaweedLoc.y)
	context.drawImage(enemy, enemyLoc.x, enemyLoc.y)
	// context.drawImage(tree, treeLoc.x, treeLoc.y)
	// context.drawImage(tree2, tree2Loc.x, tree2Loc.y)
	// context.drawImage(tree3, tree3Loc.x, tree3Loc.y)
	// context.drawImage(tree4, tree4Loc.x, tree4Loc.y)

	requestAnimationFrame(draw);
}

draw();
