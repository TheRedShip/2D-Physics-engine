import { drawLines } from "../utils.js"
import { Wall } from "../class/wall.js"
import { subSelected } from "../uiScript.js"


function drawWallLoop(c,oldPos,objects, mousepos){
    if(subSelected%3==0){
        let pos;
        let lastObj = objects[objects.length-1]
        if(lastObj && lastObj.name == "Wall" && lastObj.canAttach){
            pos = {x:lastObj.x2,y:lastObj.y2}
        }else{
            pos = oldPos
        }
    
        drawLines(c,pos.x, pos.y, mousepos.x, mousepos.y)
    }else if(subSelected%3==1){
        let pos;
        let lastObj = objects[objects.length-1]
        
        if(lastObj && lastObj.name == "Wall"){
            if(lastObj.x != mousepos.x && lastObj.y != mousepos.y){
                if(lastObj.canAttach){
                    pos = {x:lastObj.x2,y:lastObj.y2}
                }else{
                    pos = oldPos
                }

                let new_wall = new Wall(pos.x,pos.y, mousepos.x,mousepos.y)
                lastObj.attachedTo = new_wall
                new_wall.attachedBy = lastObj

                objects.push(new_wall)
            }
        }else{
            let new_wall = new Wall(mousepos.x,mousepos.y, mousepos.x,mousepos.y)
            objects.push(new_wall)
        }
    }

}

function drawWallSecondClick(oldPos, objects, mousepos, currentObj){
    let lastObj = objects[objects.length-1]

    if(subSelected%3==0){
        let new_wall = new Wall(0,0, mousepos.x,mousepos.y)
    
        if(lastObj && lastObj.name == "Wall" && lastObj.canAttach){
            new_wall.x = lastObj.x2
            new_wall.y = lastObj.y2
            lastObj.attachedTo = new_wall
            new_wall.attachedBy = lastObj
        }else{
            new_wall.x = oldPos.x
            new_wall.y = oldPos.y
        }
        
        objects.push(new_wall)

        return currentObj
    }else if(subSelected%3==1){
        return {oldPos:{x:0,y:0}, obj:-1}
    }else{
        return {oldPos:{x:0,y:0}, obj:-1}
    }
    
}

function wallReset(objects){
    let lastObj = objects[objects.length-1]
    if(lastObj && lastObj.name == "Wall"){
        lastObj.canAttach = false
    }
}

export { drawWallLoop, drawWallSecondClick, wallReset }
