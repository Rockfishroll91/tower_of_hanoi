console.log("Hello World!");
var canvas = document.querySelector("canvas"); var c = canvas.getContext('2d'); var blocks; var n = 3; var incW, incX, incY; var m, b; var tempIndex; var timeInterval; var mouse = {};
document.getElementById("num").innerHTML= `Number of Disks: ${n}`; var p1 = []; var p2 = []; var p3 = []; var from = []; var to = []; var selectedBlock; var autoSolveReady = false; var newPos = {}; var fromArray, toArray; var readyToMove = false;
function slope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}
function moveArrayIndex() {
    var tempIndex
    for(i=0;i<blocks.length; i++) {
        if(selectedBlock.w === blocks[i].w) {
            tempIndex = blocks[0];
            blocks[0] = blocks[i];
            blocks[i] = tempIndex;
        }
    }
}
function hanoi(n, p1, p2, p3) {
    if(n>0) {
        hanoi(n-1, p1, p3, p2);
        from.push(p1);
        to.push(p3);
        hanoi(n-1, p2, p1, p3);
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function callAnimateHanoi() {
    timeInterval = setInterval(animateHanoi, 300,inc = 0);
    function animateHanoi() {
        if(inc < 2**n - 1) {
            if(from[inc] === 1) {
                fromArray = p1;
                selectedBlock = p1[0];
            } else if(from[inc] === 2) {
                fromArray = p2;
                selectedBlock = p2[0];
            } else if(from[inc] === 3) {
                fromArray = p3;
                selectedBlock = p3[0];
            }

            if(to[inc] === 1) {
                toArray = p1;
                newPos.x = 115 - selectedBlock.w / 2;
                if(toArray[0]) {
                    newPos.y = 230 - toArray.length * 20;
                } else {
                    newPos.y = 230
                }
            } else if(to[inc] === 2) {
                toArray = p2;
                newPos.x = 350 - selectedBlock.w / 2;
                if(toArray[0]) {
                    newPos.y = 230 - toArray.length * 20;
                } else {
                    newPos.y = 230
                }
            } else if(to[inc] === 3) {
                toArray = p3;
                newPos.x = 585 - selectedBlock.w / 2;
                if(toArray[0]) {
                    newPos.y = 230 - toArray.length * 20;
                } else {
                    newPos.y = 230
                }
            }

            moveArrayIndex();

            m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
            b = selectedBlock.y - m * selectedBlock.x;
            toArray.unshift(fromArray.shift());
            inc += 1;
            moveCount += 1;
            document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`
        } else {
            clearInterval(timeInterval);
            autoSolveReady = false;
        }
    } animateHanoi(); ;
}
function Block(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + this.w, this.y);
        c.bezierCurveTo(this.x + this.w + this.h, this.y, this.x + this.w + this.h, this.y + this.h ,this.x + this.w, this.y + this.h);
        c.lineTo(this.x, this.y + this.h);
        c.bezierCurveTo(this.x - this.h, this.y + this.h, this.x - this.h, this.y, this.x, this.y);
        c.fillStyle = this.color;
        c.strokeStyle = "black";
        c.stroke();
        c.fill();
        c.closePath();
    } 

    this.update = function() {
        if(autoSolveReady && selectedBlock && newPos.x) {
            if(newPos.x - selectedBlock.x > 0) {
                selectedBlock.x += 5;
                selectedBlock.y = m * selectedBlock.x + b;
            } else if(newPos.x - selectedBlock.x < 0) {
                selectedBlock.x -= 5;
                selectedBlock.y = m * selectedBlock.x + b;
            }
        }
        if(readyToMove) {
            if(newPos.x - selectedBlock.x > 0) {
                selectedBlock.x += 5;
                selectedBlock.y = m * selectedBlock.x + b;
            } else if(newPos.x - selectedBlock.x < 0) {
                selectedBlock.x -= 5;
                selectedBlock.y = m * selectedBlock.x + b;
            } else {
                readyToMove = false;
                selectedBlock.color = "Black";
                selectedBlock.selected = false;
                selectedBlock = null;
            }
        }
        this.draw();
    }
}
function drawBackground() {
    c.beginPath();

    c.moveTo(110, 50);
    c.bezierCurveTo(110, 40, 120, 40, 120, 50);
    c.lineTo(120, 250);
    c.lineTo(215, 250);
    c.bezierCurveTo(225, 250, 225, 260, 215, 260);
    c.lineTo(20, 260);
    c.bezierCurveTo(10, 260, 10, 250, 20, 250);
    c.lineTo(110, 250);
    c.lineTo(110, 50);

    c.moveTo(345, 50);
    c.bezierCurveTo(345, 40, 355, 40, 355, 50);
    c.lineTo(355, 250);
    c.lineTo(450, 250);
    c.bezierCurveTo(460, 250, 460, 260, 450, 260);
    c.lineTo(250, 260);
    c.bezierCurveTo(240, 260, 240, 250, 250, 250);
    c.lineTo(345, 250);
    c.lineTo(345, 50);

    c.moveTo(580,50);
    c.bezierCurveTo(580,40, 590, 40, 590, 50);
    c.lineTo(590, 250);
    c.lineTo(685, 250);
    c.bezierCurveTo(695, 250, 695, 260, 685, 260);
    c.lineTo(485, 260);
    c.bezierCurveTo(475, 260, 475, 250, 485, 250);
    c.lineTo(580, 250);
    c.lineTo(580, 50);

    c.fillStyle = 'red';
    c.fill();
    c.stroke();
    c.closePath();
}
function init() {
    blocks = []; moveCount = 0; document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`; document.getElementById("num").innerHTML= `Number of Disks: ${n}`; document.querySelector("#minMoves").innerHTML = `Minimum Moves: ${2**n - 1}`
    incW = 24; incX = 115 - 12; incY = 250 - n * 20; p1 = []; p2 = []; p3 = []; from = []; to = []; selectedBlock = null; autoSolveReady = false; readyToMove = false; newPos; fromArray = []; toArray = []; inc = 0;
    hanoi(n, 1, 2, 3);
    for(i=0;i<n;i++) {
        blocks.push(new Block(incX, incY, incW, 20, getRandomColor()));
        p1.push(blocks[i]);
        blocks[i].position = 1;
        blocks[i].blockNumber = i + 1;
        incW += 24;
        incX -= 12;
        incY += 20;
    }

} init();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    drawBackground();
    for(i=blocks.length - 1; i >= 0;i --) {
        blocks[i].update();
    }
} animate();
function selectBlock(elem) {
    if(elem[0] && mouse.y - elem[0].y >= 0 && mouse.y < elem[0].y + elem[0].h){
        if(mouse.x - elem[0].x + 14 >= 0 && mouse.x < elem[0].x + elem[0].w + 14) {
            console.log("yay");
            if(selectedBlock){
                selectedBlock.color = "black";
                selectedBlock.selected = false;
                selectedBlock = null;
            }else if(elem[0].selected) {
                elem[0].color = "black";
                elem[0].selected = false;
                selectedBlock = null;
            } else {
                elem[0].color = "gold";
                elem[0].selected = true;
                selectedBlock = elem[0];
                prevPos = elem;
            }
        }
    }
}
function moveBlock() {
    if(selectedBlock && selectedBlock.position !== targetPosition) {
        if(targetPosition === 1) {
            if(p1[0]) {
                if(p1[0].blockNumber > selectedBlock.blockNumber) {
                    newPos.y = 250 - selectedBlock.h - p1.length * selectedBlock.h;
                    newPos.x = 115 - selectedBlock.w / 2;
                    m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
                    b = selectedBlock.y - m * selectedBlock.x;
                    readyToMove = true;
                    selectedBlock.position = 1;
                    p1.unshift(prevPos.shift());
                    moveCount += 1;
                    document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`;
                } 
            } else {
                newPos.y = 250 - selectedBlock.h;
                newPos.x = 115 - selectedBlock.w / 2;
                m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
                b = selectedBlock.y - m * selectedBlock.x;
                readyToMove = true;
                selectedBlock.position = 1;
                p1.unshift(prevPos.shift());
                moveCount += 1;
                document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`;
            }
        }
        if(targetPosition === 2) {
            if(p2[0]) {
                if(p2[0].blockNumber > selectedBlock.blockNumber) {
                    newPos.y = 250 - selectedBlock.h - p2.length * selectedBlock.h;
                    newPos.x = 350 - selectedBlock.w / 2;
                    m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
                    b = selectedBlock.y - m * selectedBlock.x;
                    readyToMove = true;
                    selectedBlock.position = 2;
                    p2.unshift(prevPos.shift());
                    moveCount += 1;
                    document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`;
                }
            } else {
                newPos.y = 250 - selectedBlock.h;
                newPos.x = 350 - selectedBlock.w / 2;
                m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
                b = selectedBlock.y - m * selectedBlock.x;
                readyToMove = true;
                selectedBlock.position = 2;
                p2.unshift(prevPos.shift());
                moveCount += 1;
                document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`;
            }
        
        }
        if(targetPosition === 3) {
            if(p3[0]) {
                if(p3[0].blockNumber > selectedBlock.blockNumber) {
                    newPos.y = 250 - selectedBlock.h - p3.length * selectedBlock.h;
                    newPos.x = 585 - selectedBlock.w / 2;
                    m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
                    b = selectedBlock.y - m * selectedBlock.x;
                    readyToMove = true;
                    selectedBlock.position = 3;
                    p3.unshift(prevPos.shift());
                    moveCount += 1;
                    document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`;
                }
            } else {
                newPos.y = 250 - selectedBlock.h;
                newPos.x = 585 - selectedBlock.w / 2;
                m = slope(selectedBlock.x, selectedBlock.y, newPos.x, newPos.y);
                b = selectedBlock.y - m * selectedBlock.x;
                readyToMove = true;
                selectedBlock.position = 3;
                p3.unshift(prevPos.shift());
                moveCount += 1;
                document.querySelector("#moveCount").innerHTML = `Move Count: ${moveCount}`;
            }
        }
    }
}
document.querySelector("canvas").onclick = function(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    // console.log(mouse.x, mouse.y);
    if(mouse.x > 10 && mouse.x < 220 && mouse.y > 50 && mouse.y < 260) {
        targetPosition = 1;
        if(!autoSolveReady) {
            selectBlock(p1);
            moveBlock();
        }
    }
    if(mouse.x > 240 && mouse.x < 460&& mouse.y > 50 && mouse.y < 260) {
        targetPosition = 2;
        if(!autoSolveReady){
            selectBlock(p2);
            moveBlock();
        } 
    }
    if(mouse.x > 475 && mouse.x < 695 && mouse.y > 50 && mouse.y < 260) {
        targetPosition = 3;
        if(!autoSolveReady) {
            selectBlock(p3);
            moveBlock();
        }
    }
}
document.querySelector(".down").onclick = function() {
    if(autoSolveReady) {
        autoSolveReady = false;
        clearInterval(timeInterval);
    }
     if(n > 3) {
         n -= 1;
         init();
     }

}
document.querySelector(".up").onclick = function() {
    if(autoSolveReady) {
        autoSolveReady = false;
        clearInterval(timeInterval);
    }
    if(n<8) {
        n += 1;
        init();
    }
   
}
document.querySelector("#autoSolve").onclick = function() {
  if(!autoSolveReady && p1.length === n) {
      callAnimateHanoi();
      autoSolveReady = true;
  } else {
      init();
    //   autoSolveReady = false;
      clearInterval(timeInterval);
  }
}
document.querySelector("#reset").onclick = function() {
    if(autoSolveReady) {
        autoSolveReady = false;
        clearInterval(timeInterval);
    }
    init();
}
