import { dist } from "../utils.js"
import { drawCircle } from "../utils.js"
import { Circle } from "../class/circle.js"
import { Colors } from "../constant.js"

function drawCircleLoop(c,oldPos, mousepos){
    let radius = dist(oldPos.x, mousepos.x, oldPos.y, mousepos.y)
    drawCircle(c,oldPos.x, oldPos.y,radius, radius/10, Colors.circleColor, 0.5)
}

function drawCircleSecondClick(oldPos, objects, mousepos){
    let radius = dist(oldPos.x, mousepos.x, oldPos.y, mousepos.y)
    objects.push(new Circle(radius, oldPos.x, oldPos.y, 0, 0, radius/10))
                    
}

export { drawCircleLoop, drawCircleSecondClick }