const player = document.querySelector(".dinosaurs");

document.addEventListener('keydown', function(event){
    console.log('space');
    if (event.code === "Space"){
        if (!player.classList.contains('jump')){
            player.classList.add('jump');

            setTimeout(() => {
                player.classList.remove('jump');
            },500);

        }
    }
})


const game = document.querySelector(".game");

function createObstacle(){
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    game.appendChild(obstacle);

    setTimeout(() => {
        obstacle.remove();
    }, 900);

    const randomTime = Math.random() * 3000 + 300;
    setTimeout(createObstacle, randomTime);

}

createObstacle()
