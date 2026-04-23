const dinoCharacter = document.getElementById("dino");
let obstacle = null;
const gameContainer = document.querySelector("main");
let gameRunning = true;
let jumpTimeoutId = null;
let spawnTimeoutId = null;

function jump() {
  if (!dinoCharacter.classList.contains("jumper")) {
    dinoCharacter.classList.add("jumper");
  }

  if (jumpTimeoutId === null) {
    jumpTimeoutId = setTimeout(() => {
      dinoCharacter.classList.remove("jumper");
      jumpTimeoutId = null;
    }, 500);
  }
}

function checkObstacleLeftScreen(){
  const rect1 = gameContainer.getBoundingClientRect()
}

function createObstacle() {
  const newObstacle = document.createElement("div");
  newObstacle.classList.add("obstacle");
  gameContainer.append(newObstacle);
  return newObstacle;
}

function spawnObstacle() {
  if (gameRunning) {
    const randomDelay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    obstacle = createObstacle();
    obstacle.classList.add("move-obstacle");

    spawnTimeoutId = setTimeout(() => {
      spawnTimeoutId = null;
      spawnObstacle();
      gameContainer.removeChild(obstacle)
    }, randomDelay);
  }

  return;
}

function detectCollision() {
  const rect1 = dinoCharacter.getBoundingClientRect();
  const rect2 = obstacle.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
}

window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameRunning) {
    console.log("Hurrah!!");
    jump();
  }
});

function game() {
  if (!gameRunning) {
    return;
  }

  if (detectCollision()) {
    const obstacleLeftPos = obstacle.getBoundingClientRect().left;
    const dinoCharacterBotPos = dinoCharacter.getBoundingClientRect().bottom;
    const gameContainerBotPos = gameContainer.getBoundingClientRect().bottom;
    const gameContainerLeftPos = gameContainer.getBoundingClientRect().left;
    const onCollisonLeftPos = obstacleLeftPos - gameContainerLeftPos;
    const onCollisionBotPos = gameContainerBotPos - dinoCharacterBotPos;
    clearTimeout(jumpTimeoutId);
    clearTimeout(spawnTimeoutId);
    jumpTimeoutId = null;
    spawnTimeoutId = null;
    obstacle.classList.remove("move-obstacle");
    dinoCharacter.classList.remove("jumper");
    obstacle.style.left = `${onCollisonLeftPos}px`;
    dinoCharacter.style.bottom = `${onCollisionBotPos}px`;
    console.log("Game Over!!");
    gameRunning = false;
    return;
  }

  requestAnimationFrame(game);
}

function startGame() {
  const userConfirm = confirm("Do you want to play Block Jump?");

  if (userConfirm) {
    spawnObstacle();
    game();
  } else {
    alert("Okay, bye bye");
  }
}

startGame();
