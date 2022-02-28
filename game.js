var canvas = document.getElementById("myCanvas");
            var c = canvas.getContext("2d");
            var bg = document.getElementById("bg");
            var titleIMG = document.getElementById("title");
            var images = {player:document.getElementById("player"),playerR:document.getElementById("playerR"),sword:document.getElementById("sword"),swordR:document.getElementById("swordR"),info:document.getElementById("info"),gbg:document.getElementById("gamebg"),coin:document.getElementById("coin"),light:document.getElementById("light"),lightC:document.getElementById("lightC")};
            var images2 = {help:document.getElementById("help"),tree:document.getElementById("tree"),
            antimatter:document.getElementById("antimatter")};

            let p = {x:720/2-50,y:480/2-50,width:50,height:70};
            let swordPOS = {x:370,y:280,width:35,height:60};
            let project = {time:0,dir:"right",scene:0,swordActive:false,titleY:100,collected:false,
            helpX:300,helpY:300,triggerText:false,
            antiX:0,antiY:0,hitbox:false,amount:12,antiAmount:4,tX:190,tY:100,tYP:0.05};
            const treePOS = [];
            const antiPOS = [];

            let leftKeyPresed = false;
            let rightKeyPressed = false;
            let upKeyPressed = false;
            let downKeyPressed = false;
            
            class Tree{
                constructor(x,y){
                    drawTree(swordPOS.x-x,swordPOS.y-y)
                }
            }
            class Anti{
                constructor(x,y){
                    c.drawImage(images2.antimatter,swordPOS.x-x,swordPOS.y-y,30,30);
                }
            }
            function clear(){
                c.fillStyle = "black";
                c.fillRect(0,0,720,480);
                c.drawImage(images.gbg,swordPOS.x-370,swordPOS.y-280+478,720,480);
                c.drawImage(images.gbg,swordPOS.x-370-718,swordPOS.y-280+478,720,480);
                c.drawImage(images.gbg,swordPOS.x-370+718,swordPOS.y-280+478,720,480);
                c.drawImage(images.gbg,swordPOS.x-370,swordPOS.y-280,720,480);
                c.drawImage(images.gbg,swordPOS.x-370,swordPOS.y-280-478,720,480);
                c.drawImage(images.gbg,swordPOS.x-370-718,swordPOS.y-280,720,480);
                c.drawImage(images.gbg,swordPOS.x-370-718,swordPOS.y-280-478,720,480);
                c.drawImage(images.gbg,swordPOS.x-370+719,swordPOS.y-280,720,480);
                c.drawImage(images.gbg,swordPOS.x-370+719,swordPOS.y-280-478,720,480);
            }
            function generateTree(){
                for (let step = 0; step < 2; step++) {
                    treePOS.push(getRandomInt(800))
                    treePOS.push(getRandomInt(500))
                }
                let generate = 0;
                let generateTwo =1;
                for (let step = 0; step < project.amount; step++) {
                    new Tree(treePOS[generate],treePOS[generateTwo]);
                    generate ++;
                    generateTwo ++;
                }
            }
            function generateAnti(){
                for (let step = 0; step < 2; step++) {
                    antiPOS.push(getRandomInt(800))
                    antiPOS.push(getRandomInt(500))
                }
                new Anti(antiPOS[0],antiPOS[1]);
                new Anti(antiPOS[2],antiPOS[3]);
                new Anti(antiPOS[4],antiPOS[5]);
                new Anti(antiPOS[6],antiPOS[7]);
            }
            function getRandomInt(max) {
              return Math.floor(Math.random() * max);
            }
            function drawPlayer(x,y){
                if(project.dir == "right"){
                    c.drawImage(images.player,x-65,y-30,190,130);
                }
                else{
                    c.drawImage(images.playerR,x-65,y-30,190,130);
                }
            }
            function drawHitbox(x,y,w,h){
                c.fillStyle = "white";
                c.fillRect(x,y,w,h);
            }
            function drawHBS(){
                if(project.hitbox){
                    c.globalAlpha = 0.3;
                    drawHitbox(swordPOS.x,swordPOS.y,swordPOS.width,swordPOS.height);
                    drawHitbox(p.x,p.y,p.width,p.height);
                    //Anti hitboxes
                    drawHitbox(swordPOS.x-antiPOS[0],swordPOS.y-antiPOS[1],30,30);
                    drawHitbox(swordPOS.x-antiPOS[2],swordPOS.y-antiPOS[3],30,30);
                    drawHitbox(swordPOS.x-antiPOS[4],swordPOS.y-antiPOS[5],30,30);
                    drawHitbox(swordPOS.x-antiPOS[6],swordPOS.y-antiPOS[7],30,30);
                    c.globalAlpha = 1;
                }
            }
            function text(text,x,y){
                c.globalAlpha = 0.3;
                c.fillStyle = "white";
                c.font = 'bold 24px sans serif';
                c.fillText(text,x,y);
                c.globalAlpha = 1;
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
                    c.drawImage(images.swordR,swordPOS.x-70,swordPOS.y-50,190,190);
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
            function drawTree(x,y){
                c.globalAlpha = "0.3";
                c.drawImage(images2.tree,x,y,240,210);
                c.globalAlpha = "1";
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
                    generateTree();
                    generateAnti();
                    drawTxtBox();
                }
                if(project.scene == -1){
                    clear();
                    c.drawImage(info,0,0,720,480);
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
                    if(swordPOS.x <= 1054){
                        project.dir = "left";
                        swordPOS.x += 3;
                    }
                }
                if(rightKeyPressed == true){
                    if(swordPOS.x >= -2){
                        project.dir = "right";
                        swordPOS.x -= 3;
                    }
                }
                if(upKeyPressed == true){
                    if(swordPOS.y <= 724){
                        swordPOS.y += 3;
                    }
                }
                if(downKeyPressed == true){
                    if(swordPOS.y >= -65){
                        swordPOS.y -= 3;
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
                        alert(p.x+"<X Y>"+p.y);
                        alert(project.helpX+" "+project.helpY);
                        alert("TriggerText"+project.triggerText);
                        alert(treePOS);
                        alert(swordPOS.x+"XX  YY"+swordPOS.y);
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
                //TODO debug anti collisions
                //checkCollisions(swordPOS.x-antiPOS[0],swordPOS.y-antiPOS[1],30,30);
                //if(collected){
                    //project.collected = false;
                    //alert("I be dead tho");
                //}
            }
            main();