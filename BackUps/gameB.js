var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");
var bg = document.getElementById("bg");
var titleIMG = document.getElementById("title");
var images = {player:document.getElementById("player"),playerR:document.getElementById("playerR"),sword:document.getElementById("sword"),swordR:document.getElementById("swordR"),info:document.getElementById("info"),gbg:document.getElementById("gamebg"),coin:document.getElementById("coin"),light:document.getElementById("light"),lightC:document.getElementById("lightC")};
var images2 = {help:document.getElementById("help"),tree:document.getElementById("tree"),
antimatter:document.getElementById("antimatter")};

let p = {x:100,y:100,width:50,height:70};
let swordPOS = {x:370,y:250,width:35,height:60};
let project = {time:0,dir:"right",scene:0,swordActive:false,titleY:100,collected:false,
coinX:10,coinY:420,cc:false,coins:0,ogcoins:0,helpX:300,helpY:300,triggerText:false,
antiX:0,antiY:0,hitbox:false};

let leftKeyPresed = false;
let rightKeyPressed = false;
let upKeyPressed = false;
let downKeyPressed = false;

class Tree{
constructor(x,y){
    c.globalAlpha = "0.3";
    c.drawImage(images2.tree,x,y,240,210);
    c.globalAlpha = "1";
}
}
class Anti{
constructor(x,y){
    project.antiX =x;
    project.antiY =y;
    drawSL("circle",x,y,60,60);
    c.drawImage(images2.antimatter,x+5,y+5,50,50);
}
}

function clear(){
c.drawImage(images.gbg,0,0,720,480);
}
function drawPlayer(x,y){
if(project.dir == "right"){
    c.drawImage(images.player,x-65,y-30,190,130);
}
else{
    c.drawImage(images.playerR,x-65,y-30,190,130);
}
}
function newCoin(x,y){
project.coinX = x;
project.coinY = y;
if(!project.cc){
    c.drawImage(images.coin,x,y,30,60);
}
}
function drawHitbox(x,y,w,h){
c.fillStyle = "white";
c.fillRect(x,y,w,h);
}
function drawHBS(){
if(project.hitbox){
    drawHitbox(swordPOS.x,swordPOS.y,swordPOS.width,swordPOS.height);
    drawHitbox(p.x,p.y,p.width,p.height);
    drawHitbox(project.helpX+90,project.helpY+40,70,50);
    drawHitbox(project.coinX,project.coinY,30,60);
    drawHitbox(project.antiX+10,project.antiY+10,20,20);
}
}
function text(text,x,y){
c.globalAlpha = 0.3;
c.fillStyle = "white";
c.font = 'bold 24px sans serif';
c.fillText(text,x,y);
c.globalAlpha = 1;
}
function drawScore(){
text("Score:",20,30);
text(project.coins,95,31);
}
function drawHelper(x,y){
project.helpX = x;
project.helpY = y;
c.drawImage(images2.help,x,y,230,150);
}
function drawTxtBox(){
c.globalAlpha = 0.3;
c.fillStyle = "black";
c.fillRect(0,0,canvas.width,60);
c.globalAlpha = 1;
}
function fontInit(){
c.fillStyle = "white";
c.font = 'bold 12px sans serif';
}
function drawSword(){
if(project.swordActive){
    if(project.dir == "right"){
        c.drawImage(images.sword,p.x-40,p.y-55,190,190);
    }
    else{
        c.drawImage(images.swordR,p.x-95,p.y-55,190,190);
    }
}
else{
    c.drawImage(images.swordR,300,200,190,190);
}
}
function drawTitle(){
c.drawImage(titleIMG,20,project.titleY-140,410,250);
fontInit();
c.fillText("(c)ClassicMC 2022 ,\"i\"for info",545,470);
}
function drawSL(type,x,y,w,h){
c.globalAlpha = 0.3;
if(type == "rect"){
    c.drawImage(images.light,x,y,50,480);
}
else{
    c.drawImage(images.lightC,x,y,w,h);
}
c.globalAlpha = 1;
}
function levelReset(){
p.x = 100;
p.y = 100;
project.collected = false;
project.cc =false;
project.triggerText = false;
project.ogcoins = project.coins;
}
function redraw(){
if(project.scene == 0){
    clear();
    c.drawImage(bg,0,0,720,480);
    drawSL("circle",480,440,300,50);
    drawTitle();
}
if(project.scene == 1){
    clear();
    drawHBS();
    drawPlayer(p.x,p.y);
    drawSword();
    drawSL("rect",680,0);
    newCoin(10,420);
    drawTxtBox();
    text("Get your sword",canvas.width/2-100,30);
    drawScore();
}
if(project.scene == -1){
    clear();
    c.drawImage(info,0,0,720,480);
}
if(project.scene == 2){
    clear();
    drawHBS();
    drawPlayer(p.x,p.y);
    drawSword();
    treee = new Tree(300,100);
    treeee = new Tree(400,150);
    treeeee = new Tree(400,50);
    drawSL("eclipse",560,320,300,300);
    drawHelper(300,300);
    newCoin(200,200);
    drawTxtBox();
    if(project.triggerText){
        text("There are hidden coins.",canvas.width/2-150,30)
    }
    drawScore();
}
if(project.scene == 3){
    clear();
    drawHBS();
    anits = new Anti(400,200);
    newCoin(10,420);
    drawPlayer(p.x,p.y);
    drawSword();
    drawHelper(100,330);
    drawTxtBox();
    if(project.triggerText){
        text("Watch out for the antimatter",canvas.width/2-150,30);
    }
    drawScore();
}
}
function checkCollisions(x,y,width,height){
if(x < p.x + p.width &&
x + width > p.x &&
y < p.y + p.height &&
y + height > p.y){
    project.collected = true;
}  
}   
//Just a whole buch of garbage to get the movement working correctly
function keyPressed(evt){
if(evt.keyCode == 37){
    leftKeyPressed = true;
}
if(evt.keyCode == 39){
    rightKeyPressed = true;
}
if(evt.keyCode == 38){
    upKeyPressed = true;
}
if(evt.keyCode == 40){
    downKeyPressed = true;
}

}
function keyReleased(evt){
if(evt.keyCode == 37){
    leftKeyPressed = false;
}
if(evt.keyCode == 39){
    rightKeyPressed = false;
}
if(evt.keyCode == 38){
    upKeyPressed = false;
}
if(evt.keyCode == 40){
    downKeyPressed = false;
}

}
function playerMove(){
if(leftKeyPressed == true){
    if(p.x >= -8){
        project.dir = "left";
        p.x -= 3;
    }
}
if(rightKeyPressed == true){
    if(p.x <= 683){
        project.dir = "right";
        p.x += 3;
    }
    else{
        if(project.scene == 1 && project.swordActive ==true){
            levelReset();
            project.scene = 2;
        }
    }
}
if(upKeyPressed == true){
    if(p.y >= -14){
        p.y -= 3;
    }
}
if(downKeyPressed == true){
    if(p.y <= 406){
        p.y += 3;
    }
}
if(p.x == 685){
    if(p.y == 409){
        if(project.scene == 2){
            levelReset();
            project.scene = 3;
        }
    }
}
}
document.addEventListener('keydown',function (evt){
if(event.keyCode == 32){
    if(project.scene == 0){
        project.scene = 1;
    }
    else if(project.scene == -1){
        project.scene =0;
    }
}
if(event.keyCode == 73){
    if(project.scene == 0){
        project.scene = -1;
    }
    else{
        alert(project.ogcoins+" "+project.coins);
        alert(p.x+"<X Y>"+p.y);
        alert(project.helpX+" "+project.helpY);
        alert("TriggerText"+project.triggerText);
    }
}
if(event.keyCode == 68){
    if(!project.hitbox){
        project.hitbox = true;
    }
    else{
        project.hitbox = false;
    }
}
});
//Main game loop
window.main = function (){
window.requestAnimationFrame( main );
redraw();
document.addEventListener('keydown',keyPressed);
document.addEventListener('keyup',keyReleased);
project.titleY += Math.sin(0+(project.time*-0.5)*0.5);
project.time += 0.5;
playerMove();
checkCollisions(swordPOS.x,swordPOS.y,swordPOS.width,swordPOS.height);
if(project.collected){
    project.collected = false;
    project.swordActive = true;
}
checkCollisions(project.coinX,project.coinY,30,60);
if(project.collected){
    project.collected = false;
    project.cc = true;
    if(project.coins <= project.ogcoins){
        project.coins ++;
    }
}
if(project.scene == 2||project.scene == 3){
    checkCollisions(project.helpX+90,project.helpY+40,70,50);
    if(project.collected){
        project.collected = false;
        project.triggerText = true;
    }
}
if(project.scene == 3){
    checkCollisions(project.antiX+10,project.antiY+10,20,20);
    if(project.collected){
        project.collected = false;
        project.scene = 1
        project.coins = 0;
        redraw();
        project.swordActive = false;
        swordPOS.x = 370;
        swordPOS.y = 250;
        levelReset();
    }
}
}
main();