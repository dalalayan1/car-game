'use strict';

(function(){
    var wrapper = domTraverser("wrapper"),
        rowOuterDiv,
        createdRowOuterDiv,
        columnDiv,
        createdColumnDiv,
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


})();
