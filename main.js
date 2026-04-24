const pinkMonster = document.getElementById("pink-monster");
const characterWindow = document.getElementById("character-window");
const gameContainer = document.querySelector("main");
const highScoreDisplay = document.getElementById("high-score");
let obstacleCollection = [];
let cloudCollection = [];
let gameRunning = true;
let jumpTimeoutId = null;
let spawnTimeoutId = null;
let spawnCloudTimeoutId = null;
let score = 0;
let scoreIntervalId = null;
let currentHighScore = window.localStorage.getItem("highScore");
let highScore = 0;

function startScoring() {
  scoreIntervalId = setInterval(() => {
    score++;
    updateScoreDisplay();
  }, 100);
}

function stopScoring() {
  clearInterval(scoreIntervalId);
  currentHighScore = score;
  scoreIntervalId = null;
}

function updateScoreDisplay() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

function jump() {
  if (!characterWindow.classList.contains("jumper")) {
    characterWindow.classList.add("jumper");
    pinkMonster.setAttribute(
      "src",
      "./images/Pink_Monster_Jump_8_32px_frames.png",
    );
    pinkMonster.classList.remove("pink-monster-run");
    pinkMonster.classList.add("pink-monster-jump");
  }

  if (jumpTimeoutId === null) {
    jumpTimeoutId = setTimeout(() => {
      characterWindow.classList.remove("jumper");
      pinkMonster.classList.remove("pink-monster-jump");
      pinkMonster.setAttribute(
        "src",
        "./images/Pink_Monster_Run_6_32px_frames.png",
      );
      pinkMonster.classList.add("pink-monster-run");
      jumpTimeoutId = null;
    }, 500);
  }
}

function checkObstacleLeftScreen(obs) {
  const rect1 = gameContainer.getBoundingClientRect();
  const rect2 = obs.getBoundingClientRect();

  if (rect2.right < rect1.left) {
    return true;
  }

  return false;
}

function checkCloudLeftScreen(cloud) {
  const rect1 = gameContainer.getBoundingClientRect();
  const rect2 = cloud.getBoundingClientRect();

  if (rect2.right < rect1.left) {
    return true;
  }

  return false;
}

function removeObstacleFromScreen(obs) {
  const indexOfObstacle = obstacleCollection.indexOf(obs);

  if (indexOfObstacle > -1) {
    obstacleCollection.splice(indexOfObstacle, 1);
    gameContainer.removeChild(obs);
  }
}

function removeCloudFromScreen(cloud) {
  const indexOfCloud = cloudCollection.indexOf(cloud);

  if (indexOfCloud > -1) {
    cloudCollection.splice(indexOfCloud, 1);
    gameContainer.removeChild(cloud);
  }
}

function onCollision(obstacle) {
  const obstacleLeftPos = obstacle.getBoundingClientRect().left;
  const characterWindowBotPos = characterWindow.getBoundingClientRect().bottom;
  const gameContainerBotPos = gameContainer.getBoundingClientRect().bottom;
  const gameContainerLeftPos = gameContainer.getBoundingClientRect().left;
  const onCollisonLeftPos = obstacleLeftPos - gameContainerLeftPos;
  const onCollisionBotPos = gameContainerBotPos - characterWindowBotPos;
  clearTimeout(jumpTimeoutId);
  clearTimeout(spawnTimeoutId);
  jumpTimeoutId = null;
  spawnTimeoutId = null;

  for (let i = obstacleCollection.length - 1; i >= 0; i--) {
    if (obstacleCollection[i] !== obstacle) {
      gameContainer.removeChild(obstacleCollection[i]);
      obstacleCollection.splice(i, 1);
    }
  }
  obstacle.classList.remove("move-obstacle");
  characterWindow.classList.remove("jumper");
  obstacle.style.left = `${onCollisonLeftPos}px`;
  characterWindow.style.bottom = `${onCollisionBotPos}px`;

  if (pinkMonster.classList.contains("pink-monster-jump")) {
    pinkMonster.classList.remove("pink-monster-jump");
    pinkMonster.setAttribute(
      "src",
      "./images/Pink_Monster_Hurt_4_32px_frames.png",
    );
    pinkMonster.classList.add("pink-monster-hurt");
  } else {
    pinkMonster.classList.remove("pink-monster-run");
    pinkMonster.setAttribute(
      "src",
      "./images/Pink_Monster_Hurt_4_32px_frames.png",
    );
    pinkMonster.classList.add("pink-monster-hurt");
  }
  gameRunning = false;

  let playAgain = confirm(
    `Game over! Your score is ${score}. Do you want to play again?`,
  );

  if (playAgain) {
   window.location.reload()
  }else{
    alert("Okay, bye, bye")
  }
}

function createObstacle() {
  const newObstacle = document.createElement("div");
  newObstacle.classList.add("obstacle");
  gameContainer.append(newObstacle);
  obstacleCollection.push(newObstacle);
  return newObstacle;
}

function createCloud() {
  const newCloud = document.createElement("img");
  newCloud.setAttribute("src", "./images/pixel-cloud.png");
  newCloud.classList.add("pixel-cloud");
  gameContainer.append(newCloud);
  cloudCollection.push(newCloud);
  return newCloud;
}

function spawnObstacle() {
  if (gameRunning) {
    const randomDelay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    let newSpawnedObstacle = createObstacle();
    newSpawnedObstacle.classList.add("move-obstacle");

    spawnTimeoutId = setTimeout(() => {
      spawnTimeoutId = null;
      spawnObstacle();
    }, randomDelay);
  }

  return;
}

function spawnCloud() {
  if (gameRunning) {
    const randomDelay = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
    let newSpawnedCloud = createCloud();
    newSpawnedCloud.classList.add("move-cloud");

    spawnCloudTimeoutId = setTimeout(() => {
      spawnCloudTimeoutId = null;
      spawnCloud();
    }, randomDelay);
  }
}

function detectCollision(obstacle) {
  const rect1 = characterWindow.getBoundingClientRect();
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

  const arrayIterationCount = obstacleCollection.length - 1;
  const cloudIterationCount = cloudCollection.length - 1;

  for (let i = arrayIterationCount; i >= 0; i--) {
    if (detectCollision(obstacleCollection[i])) {
      onCollision(obstacleCollection[i]);

      if (score > highScore) {
        highScore = score;
        window.localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = `highest score: ${highScore}`;
      }
      stopScoring();
      return;
    } else if (checkObstacleLeftScreen(obstacleCollection[i])) {
      removeObstacleFromScreen(obstacleCollection[i]);
    }
  }

  for (let c = cloudIterationCount; c >= 0; c--) {
    if (checkCloudLeftScreen(cloudCollection[c])) {
      removeCloudFromScreen(cloudCollection[c]);
    }
  }

  requestAnimationFrame(game);
}

function startGame() {
  const userConfirm = confirm("Do you want to play Block Jump?");

  if (userConfirm) {
    spawnObstacle();
    spawnCloud();
    startScoring();
    highScoreDisplay.innerText = `highest score: ${currentHighScore ? currentHighScore : highScore}`;
    pinkMonster.setAttribute(
      "src",
      "./images/Pink_Monster_Run_6_32px_frames.png",
    );
    pinkMonster.classList.remove("pink-monster-idle");
    pinkMonster.classList.add("pink-monster-run");
    game();
  } else {
    alert("Okay, bye bye");
  }
}

startGame();
