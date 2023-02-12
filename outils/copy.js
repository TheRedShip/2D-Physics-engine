import { drawCircle, drawLines } from "../utils.js"
import { Circle } from "../class/circle.js"
import { Wall } from "../class/wall.js"
import { subSelected } from "../uiScript.js"
import { Colors, utilsConstant} from "../constant.js"

function copyLoop(c, obj, mousepos){
    if (obj.name == "Circle") drawCircle(c, mousepos.x, mousepos.y, obj.r, obj.m,Colors.circleColor, 0.5)
    if(obj.name == "Wall"){
        let wallList = obj.getChildWalls()

        let lastPos = null;
        for(let wall of wallList){
            let distMouse = {x:mousepos.x-wall.x,y:mousepos.y-wall.y}
            let distEndStart = {x:wall.x2-wall.x,y:wall.y2-wall.y}

            if(!lastPos) lastPos = {x:wall.x+distMouse.x,y:wall.y+distMouse.y}
            let endPos = {x:lastPos.x+distEndStart.x,y:lastPos.y+distEndStart.y}

            drawLines(c,lastPos.x,lastPos.y,endPos.x,endPos.y,"rgba(0,0,0,0.5)")
            
            lastPos = endPos
        }
    }
}

function copySecondClick(obj, objects, mousepos){
    if (obj.name == "Circle"){
        let size = utilsConstant.copySize
        
        for(let i = 0; i < size[subSelected%3];i++){
            let circle = new Circle(obj.r, mousepos.x+Math.random()*size[subSelected%3], mousepos.y+Math.random()*size[subSelected%3], 0, 0, obj.m)
            circle.copy(obj)
            objects.push(circle)
        }
    }else if (obj.name == "Wall"){
        let wallList = obj.getChildWalls()

        let lastPos = null;
        for(let i=0;i<wallList.length;i++){
            let currentWall = wallList[i]

            let distMouse = {x:mousepos.x-currentWall.x,y:mousepos.y-currentWall.y}
            let distEndStart = {x:currentWall.x2-currentWall.x,y:currentWall.y2-currentWall.y}

            if(!lastPos) lastPos = {x:currentWall.x+distMouse.x,y:currentWall.y+distMouse.y}
            let endPos = {x:lastPos.x+distEndStart.x,y:lastPos.y+distEndStart.y}
            
            let newWall = new Wall(lastPos.x,lastPos.y,endPos.x,endPos.y)
            newWall.canAttach = true

            let lastWall = objects[objects.length-1]
            if(lastWall.canAttach){
                lastWall.attachedTo = newWall
                newWall.attachedBy = lastWall
            }
            objects.push(newWall)

            lastPos = endPos
        }
    }

    
        
}

export { copyLoop, copySecondClick}