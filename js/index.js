'use strict';

(function(){
    var wrapper = domTraverser("wrapper"),
        rowOuterDiv,
        createdRowOuterDiv,
        columnDiv,
        createdColumnDiv,
        player,
        interval = null;
    const rowLength = 3,
        colLength = 6,
        globalIdx = colLength;

    function createMatrix() {

        for(var i = 0; i<colLength; i++) {

            rowOuterDiv = {
                tag: "div",
                attrs: {
                    "class": `row ${i}`
                }
            };
            
            createdRowOuterDiv = domELementCreator(rowOuterDiv);
            for(var j = 0; j<rowLength; j++) {

                columnDiv = {
                    tag: "div",
                    attrs: {
                        "class": `block ${i}-${j}`
                    }
                };
                
                createdColumnDiv = domELementCreator(columnDiv);

                createdRowOuterDiv.appendChild(createdColumnDiv);
            }
            
            wrapper.appendChild(createdRowOuterDiv);
        }

        columnDiv = {
            tag: "div",
            attrs: {
                "class": "block player",
                "id": "player",
                "tabIndex": "10"
            }
        };
        
        createdColumnDiv = domELementCreator(columnDiv);

        wrapper.appendChild(createdColumnDiv);

    }

    function movePlayerCar(e) {
        if( e.keyCode === 37 ){
            
            player = domTraverser("player");
            debugger
            if(player.style.left > "0px") {
                debugger
                player.style.left = `${player.style.left - 100}px`;
            }
        }
        else if ( e.keyCode === 39 ) {
            player = domTraverser("player");
            
            if(player.style.left < "200px") {
                player.style.left = `${player.style.left + 100}px`;
            }
        }
    }


    function shiftCar(blocks, xpos) {
        var carIdx;

        for(var i = 0; i < blocks.length; i++){
                if(blocks[i].classList.contains('car')) {
                    carIdx = i;
                }
                blocks[i].classList.remove('car');
        }
        if(Math.floor(carIdx/rowLength) === colLength - 1) {
            
            moveCar();
        }
        else {
            blocks[carIdx+rowLength].classList.add('car');
        }
    }

    function moveCar() {


        clearInterval(interval);
        
        var blocks = domTraverser("block", true),
            xPos = Math.floor(Math.random() * rowLength);

        blocks[xPos].classList.add('car');
        
        interval = setInterval(function() {
            
            shiftCar(blocks, xPos);

        }, 500);
        

    }
    

    createMatrix();

    moveCar();
    
    document.addEventListener("keydown", movePlayerCar);


})();
