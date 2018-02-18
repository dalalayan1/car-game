'use strict';

(function(){
    var wrapper = domTraverser("wrapper"),
        score = domTraverser("score"),
        blockDiv,
        createdBlockDiv,
        car,
        player,
        playerScore = 0,
        carIdx = 0,
        interval = null;
    const rowLength = 3,
        colLength = 6,
        globalIdx = colLength;

    function createCarBlocks() {

        blockDiv = {
            tag: "div",
            attrs: {
                "class": "block car",
                "id": "car",
                "style": "top: 0px"
            }
        };
        
        createdBlockDiv = domELementCreator(blockDiv);

        wrapper.appendChild(createdBlockDiv);

        blockDiv = {
            tag: "div",
            attrs: {
                "class": "block player",
                "id": "player",
                "style": "left: 100px;bottom: 0px"
            }
        };
        
        createdBlockDiv = domELementCreator(blockDiv);

        wrapper.appendChild(createdBlockDiv);

    }

    function movePlayerCar(e) {
        if( e.keyCode === 37 ){
            
            player = domTraverser("player");
            
            if(player.style.left > "0px") {
                player.style.left = `${parseInt(player.style.left) - 100}px`;
            }
        }
        else if ( e.keyCode === 39 ) {
            player = domTraverser("player");
            
            if(player.style.left < "200px") {
                player.style.left = `${parseInt(player.style.left) + 100}px`;
            }
        }
    }

    function incrementScore() {
        score.innerHTML = ++playerScore;
    }

    function checkForCollision() {
        const {
            style: {
                left: carLeftPos,
                top: carTopPos
            }
        } = car,
        {
            style: {
                left: playerLeftPos
            }
        } = domTraverser("player");

        if (carLeftPos === playerLeftPos && carTopPos === `${(colLength - 1) * 100}px`) {
            resetAll();
        }
        else {
            moveCar();  
        }
    }

    function resetAll() {

        clearInterval(interval);

        const car = domTraverser("car"),
            player = domTraverser("player");

        player.classList.add("collision");

        car.style.top = "0px";
        carIdx = 0;
    }

    function shiftCar(xpos) {
        
        incrementScore();

        if (carIdx === colLength) {
            checkForCollision();
 
        }

        if (carIdx === 0) {
            car.style.top = `0px`;
        }
        else {
            car.style.top = `${parseInt(car.style.top) + 100}px`;
        }
        carIdx++;

    }


    function moveCar() {

        clearInterval(interval);

        carIdx = 0;

        car = domTraverser("car");

        var xPos = Math.floor(Math.random() * rowLength);

        car.style.left = `${xPos*100}px`;
        
        interval = setInterval(function() {
            
            shiftCar();

        }, 500);
        

    }
    

    createCarBlocks();

    moveCar();
    
    document.addEventListener("keydown", movePlayerCar);


})();
