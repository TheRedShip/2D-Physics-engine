import { drawLines, cwClosestPoint } from "../utils.js"
import { ballConstant, Colors} from "../constant.js"

class Wall {
    constructor(x,y,x2,y2) {
        this.name = "Wall"
        this.x = x
        this.y = y
        this.x2 = x2
        this.y2 = y2

        this.r = 0

        this.attachedTo = null;
        this.attachedBy = null;

        this.canAttach = true;

        this.physics = false
    }
    wallUnit(){
        let dist = {x:this.x2-this.x,y:this.y2-this.y}
        let distMag = Math.sqrt(dist.x**2 + dist.y**2)

        return {x:dist.x/distMag, y:dist.y/distMag}
    }
    getChildWalls(){
        let wallCurent = this
        let wallList = []

        while (true){
            wallList.push(wallCurent)
            if(!wallCurent.attachedTo) break
            else wallCurent = wallCurent.attachedTo
        }

        return wallList
    }
    moveAttachedTo(pos){
        let distBetween = {x:this.x2-this.x,y:this.y2-this.y}
        this.x = pos.x
        this.y = pos.y

        this.x2 = this.x+distBetween.x
        this.y2 = this.y+distBetween.y

        if(this.attachedTo) this.attachedTo.moveAttachedTo({x:this.x2,y:this.y2})
    }

    deepCopy(objects){
        let newWall = new Wall(this.x,this.y,this.x2,this.y2)
        newWall.attachedTo = this.attachedTo
        newWall.attachedBy = this.attachedBy
        newWall.canAttach = this.canAttach

        objects.push(newWall)
        
    }
    
    distFunc(mousepos){
        let closestPoint = cwClosestPoint(mousepos,this)
        let mouseToClosest = {x:closestPoint.x-mousepos.x, y:closestPoint.y-mousepos.y}
    
        let mouseToClosestMag = Math.sqrt(mouseToClosest.x**2 + mouseToClosest.y**2)
        return mouseToClosestMag
    }
    update = function(c){
        
        this.draw(c)
    }
    draw = function(c){
        drawLines(c,this.x,this.y,this.x2,this.y2)
    }
    drawSelect(c){
        drawLines(c,this.x,this.y,this.x2,this.y2, Colors.selectedColor,10)
    }
}

function dist(ball,wall){
    let closestPoint = cwClosestPoint(ball,wall)
    let ballToClosest = {x:closestPoint.x-ball.x, y:closestPoint.y-ball.y}

    let ballToClosestMag = Math.sqrt(ballToClosest.x**2 + ballToClosest.y**2)

    if(ballToClosestMag <= ball.r) return true;
}

function cwCollision(ball,wall){
    if(dist(ball,wall)){
        cwPenRes(ball,wall)

        let closestPoint = cwClosestPoint(ball,wall)
        let ballToClosest = {x:ball.x-closestPoint.x, y:ball.y-closestPoint.y}
        let ballToClosestMag = Math.sqrt(ballToClosest.x**2 + ballToClosest.y**2)

        let normal = {x:ballToClosest.x/ballToClosestMag, y:ballToClosest.y/ballToClosestMag}
        let sepvel = ball.vx*normal.x+ball.vy*normal.y
        
        let new_sepvel = -sepvel
        let vsep_diff = sepvel-new_sepvel

        if (ball.friction > 0) vsep_diff*=ballConstant.collisionFriction

        ball.vx += normal.x*(-vsep_diff)
        ball.vy += normal.y*(-vsep_diff)
    }
}

function cwPenRes(ball, wall){
    let closestPoint = cwClosestPoint(ball,wall)
    let penVec = {x:ball.x-closestPoint.x, y:ball.y-closestPoint.y}
    let penVecMag = Math.sqrt(penVec.x**2 + penVec.y**2)
    let penVecUnit = {x:penVec.x/penVecMag, y:penVec.y/penVecMag}

    ball.x += penVecUnit.x*(ball.r-penVecMag)
    ball.y += penVecUnit.y*(ball.r-penVecMag)
}

export { Wall, cwCollision}
