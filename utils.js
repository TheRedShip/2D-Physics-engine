import { Particle } from "./class/particle.js"

function drawLines(c,x,y, x2, y2,color="rgb(0,0,0)",thick=5,dashed=[]){
    c.strokeStyle = color
    c.lineWidth = thick
    c.setLineDash(dashed);
    c.beginPath();
    c.moveTo(x, y)
    c.lineTo(x2,y2)
    c.stroke()
    c.closePath()
    c.setLineDash([]);

}

function dist(x1, x2, y1,y2){
    return ((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))**.5
}

function drawCircle(c, x,y,r, m,color, alpha=100){
    drawSimpleCircle(c,x,y,r,`rgba(${color},${alpha})`)
    
    let text = Math.round(m).toString()
    c.beginPath();
    c.font = `${r/2}px 'Trebuchet MS', sans-serif`;
    c.fillStyle = `rgb(80, 137, 145, ${alpha})`;
    c.fillText(text, x-c.measureText(text).width/2, y-c.measureText(text).width/2);
}

function drawSimpleCircle(c,x,y,r,color){
    c.fillStyle = color
    c.beginPath();
    c.arc(x,y,r,0,Math.PI*2)
    c.fill()
    c.closePath()
}
function drawSimpleCircleEmpty(c,x,y,r,color){
    c.strokeStyle = color
    c.lineWidth = 6
    c.beginPath();
    c.arc(x,y,r,0,Math.PI*2)
    c.stroke()
    c.closePath()
}

function drawSimpleElipseEmpty(c,x,y,rx,ry,rot,color){
    c.strokeStyle = color
    c.lineWidth = 6
    c.beginPath();
    c.ellipse(x, y, rx, ry, rot, 0, Math.PI*2)
    c.stroke()
    c.closePath()
}

function getClickedObj(mousepos,objects){
    let obj = -1;
    let distWithLastObj = 1000000
    for(let o = 0; o < objects.length; o++){
        let dist = objects[o].distFunc(mousepos)
        if(dist && dist < distWithLastObj && dist < 200){
            distWithLastObj = dist
            obj = objects[o]
        }
    }
    return obj
}

function cwClosestPoint(ball,wall){
    let wallUnit = wall.wallUnit()

    let distBallStart = {x:wall.x-ball.x,y:wall.y-ball.y}
    let dotStart = wallUnit.x*distBallStart.x+wallUnit.y*distBallStart.y
    if(dotStart>0){
        return {x:wall.x,y:wall.y}
    }

    let distBallEnd = {x:ball.x-wall.x2,y:ball.y-wall.y2}
    let dotEnd = wallUnit.x*distBallEnd.x+wallUnit.y*distBallEnd.y
    if(dotEnd>0){
        return {x:wall.x2,y:wall.y2}
    }


    let closestDist = dotStart
    let closestVec = {x:wallUnit.x*closestDist, y:wallUnit.y*closestDist}

    return {x:wall.x-closestVec.x,y:wall.y-closestVec.y}
}


export { drawLines,dist,drawCircle,drawSimpleCircle,drawSimpleCircleEmpty,drawSimpleElipseEmpty,getClickedObj,cwClosestPoint}