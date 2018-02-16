'use strict';

(function(){
    var wrapper = domTraverser("wrapper"),
        score = domTraverser("score"),
        rowOuterDiv,
        createdRowOuterDiv,
        columnDiv,
        createdColumnDiv,
        player,
        playerScore = 0,
        carIdx = 0,
        interval = null;
    const rowLength = 3,
        colLength = 6,
        globalIdx = colLength;

    function createMatrix() {

        columnDiv = {
            tag: "div",
            attrs: {
                "class": "block car",
                "id": "car",
                "style": "top: 0px"
            }
        };
        
        createdColumnDiv = domELementCreator(columnDiv);

        wrapper.appendChild(createdColumnDiv);

        columnDiv = {
            tag: "div",
            attrs: {
                "class": "block player",
                "id": "player",
                "style": "left: 100px;bottom: 0px"
            }
        };
        
        createdColumnDiv = domELementCreator(columnDiv);

        wrapper.appendChild(createdColumnDiv);

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


    function shiftCar(car, xpos) {
        
        incrementScore();

        if (carIdx === colLength) {
            moveCar();   
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

        var car = domTraverser("car"),
            xPos = Math.floor(Math.random() * rowLength);

        car.style.left = `${xPos*100}px`;
        
        interval = setInterval(function() {
            
            shiftCar(car, xPos);

        }, 500);
        

    }
    

    createMatrix();

    moveCar();
    
    document.addEventListener("keydown", movePlayerCar);


})();
