const { createElement } = require("react");

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

function createObstacle(){
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    document.appendChild(obstacle);

    setTimeout(() => {
        obstacle.remove();
    }, 300);

}
