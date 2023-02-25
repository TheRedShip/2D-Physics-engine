import { ccCollision } from "./class/circle.js";
import { cwCollision } from "./class/wall.js"
import { selected } from "./uiScript.js"
import { getClickedObj } from "./utils.js";
import { Particle } from "./class/particle.js"
import * as control from "./outils/control.js" 
import * as vector from "./outils/vector.js" 
import * as drawCircle from "./outils/drawCircle.js" 
import * as copy from "./outils/copy.js" 
import * as move from "./outils/move.js" 
import * as drawWall from "./outils/drawWall.js" 
import * as drawContraints from "./outils/drawContraints.js" 
import * as property from "./outils/property.js";
import * as attraction from "./outils/attraction.js";
import * as chrono from "./outils/chrono.js";
import * as trash from "./outils/trash.js";
import { SelectNums,particleConstant,Colors } from "./constant.js"
import { currentTransformedCursor } from "./camera.js"

let canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext("2d");

canvas.addEventListener('contextmenu', (ev)=>{
    ev.preventDefault(); // this will prevent browser default behavior 
});

let mousepos = {x:0,y:0, prevx:0, prevy:0,realx:0,realy:0}
let handleMousemove = (event) => {
    mousepos.prevx = mousepos.x
    mousepos.prevy = mousepos.y

    mousepos.realx=event.clientX
    mousepos.realy=event.clientY

    mousepos.x = currentTransformedCursor.x
    mousepos.y = currentTransformedCursor.y
};
document.addEventListener('mousemove', handleMousemove);

let mouseClick = false;
let handleMouseclick = (event) => {
    event.preventDefault()
    if(event.buttons==1) mouseClick = true
    else mouseClick = false
};
document.addEventListener('mousedown', handleMouseclick);
document.addEventListener('mouseup', handleMouseclick);


function handleCollision(objects){
    for(let o = 0; o < objects.length; o++){
        let obj1 = objects[o]
        for(let o2 = o+1; o2 < objects.length; o2++){
            let obj2 = objects[o2]

            if(obj1 !== obj2){
                if(obj1.name == obj2.name && obj1.name == "Circle"){
                    ccCollision(obj1,obj2)
                }
                else if( (obj1.name == "Wall" && obj2.name == "Circle") || (obj1.name == "Circle" && obj2.name == "Wall")){
                    let ball;
                    let wall;
                    if(obj1.name == "Circle"){
                        ball = obj1
                        wall = obj2
                    }else{
                        ball = obj2
                        wall = obj1
                    }
                    cwCollision(ball,wall)
                }
            }
        }

        if(obj1.attraction){
            for(let o2 = 0; o2 < objects.length; o2++){
                let obj2 = objects[o2]

                if(obj1!=obj2 && obj2.attraction && !obj2.static){
                    obj1.attract(obj2)
                }
            }
            
        }
    }
}

let objects = []
let particles = []

let currentBuild = {oldPos:{x:0,y:0}, obj:-1}

function animate(){
    c.save();
    c.setTransform(1,0,0,1,0,0);
    c.fillStyle = Colors.bgColor
    c.fillRect(-window.innerWidth*2,-window.innerHeight*2,window.innerWidth*4, window.innerHeight*4)
    c.restore();

    for(let o = 0; o < particles.length; o++){
        particles[o].update(c)
        if(particles[o].lifetime<=0){
            particles.splice(particles.indexOf(particles[o]),1)
        }
    }
    for(let o = 0; o < objects.length; o++){
        objects[o].update(c, canvas.width, canvas.height)
    }

    if(currentBuild.oldPos.x==0) currentBuild.obj = getClickedObj(mousepos,objects)
    if(currentBuild.obj!=-1) currentBuild.obj.drawSelect(c)

    if (mouseClick){
        mouseClick = false

        if((mousepos.realx > window.innerWidth/30) && selected != -1){

            for(let i = 0; i < 50; i ++){
                particles.push(new Particle(mousepos.x,mousepos.y,10*(Math.random()-0.5),10*(Math.random()-0.5),0,particleConstant.dampening,particleConstant.size,particleConstant.lifetime,particleConstant.color,true))
            }

            if(currentBuild.oldPos.x==0){
                currentBuild.oldPos.x = mousepos.x
                currentBuild.oldPos.y = mousepos.y

                drawWall.wallReset(objects)

            }else{
                let obj = currentBuild.obj
                let oldPos = currentBuild.oldPos

                if(selected == SelectNums.attractionSelect && obj != 1){
                    attraction.attractionSecondClick(obj,objects,mousepos)
                    currentBuild = {oldPos:{x:0,y:0}, obj:-1}
                }else if(selected == SelectNums.moveSelect && obj != 1){
                    move.moveSecondClick(obj,mousepos)
                    currentBuild = {oldPos:{x:0,y:0}, obj:-1}
                }else if(selected == SelectNums.vectorSelect && obj != -1){
                    vector.vectorSecondClick(obj, mousepos)
                    currentBuild = {oldPos:{x:0,y:0}, obj:-1}
                }else if(selected == SelectNums.copySelect && obj != -1){
                    copy.copySecondClick(obj, objects, mousepos)
                }else if(selected == SelectNums.drawCircleSelect){
                    drawCircle.drawCircleSecondClick(oldPos, objects, mousepos)
                    currentBuild = {oldPos:{x:0,y:0}, obj:-1}
                }else if(selected == SelectNums.drawWallSelect){
                    currentBuild = drawWall.drawWallSecondClick(oldPos, objects, mousepos, currentBuild)
                }else if(selected == SelectNums.drawContraintsSelect && obj != -1){
                    currentBuild = drawContraints.drawContraintsSecondClick(objects, mousepos,currentBuild)
                }else if(selected == SelectNums.chronoSelect){
                    currentBuild = {oldPos:{x:0,y:0}, obj:-1}
                }
            }
        }
    }  
    if(currentBuild.oldPos.x!=0){
        let oldPos = currentBuild.oldPos
        let obj = currentBuild.obj

        if(selected == SelectNums.controlSelect && obj!=-1){
            control.controlLoop(obj)
            currentBuild = {oldPos:{x:0,y:0}, obj:-1}
        }
        else if(selected == SelectNums.propertySelect && obj!=-1){
            property.propertyLoop(obj)
            currentBuild = {oldPos:{x:0,y:0}, obj:-1}
        }
        else if(selected == SelectNums.attractionSelect && obj != -1){
            currentBuild = attraction.attractionLoop(c,obj,mousepos,currentBuild)
        }
        else if(selected == SelectNums.moveSelect && obj!=-1){
            move.moveLoop(obj,mousepos)
        }else if(selected == SelectNums.vectorSelect && obj!=-1){
            vector.vectorLoop(c, obj, mousepos, objects)
        }else if(selected == SelectNums.copySelect && obj!=-1) {
            copy.copyLoop(c, obj, mousepos)
        }else if(selected == SelectNums.drawCircleSelect){
            drawCircle.drawCircleLoop(c,oldPos, mousepos)
        }else if(selected == SelectNums.drawWallSelect){
            drawWall.drawWallLoop(c, oldPos,objects, mousepos)
        }else if(selected == SelectNums.drawContraintsSelect && obj != -1){
            drawContraints.drawContraintsLoop(c,obj, mousepos)
        }else if(selected == SelectNums.chronoSelect){
            chrono.chronoLoop(mousepos,currentBuild.oldPos)
        }else if(selected == SelectNums.trashSelect && obj != -1){
            trash.trashLoop(obj, objects)
            currentBuild = {oldPos:{x:0,y:0}, obj:-1}
        }else {
            currentBuild = {oldPos:{x:0,y:0}, obj:-1}
        }

        
    }

    handleCollision(objects)
    requestAnimationFrame(animate);

}

animate()
