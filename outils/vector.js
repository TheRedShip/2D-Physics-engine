import { drawLines,dist,drawCircle } from "../utils.js"
import { Colors } from "../constant.js"

function vectorLoop(c,obj, mousepos,objects){
    if(obj.physics && !obj.static){
        let endPosX = obj.x+(obj.x-mousepos.x)
        let endPosY = obj.y+(obj.y-mousepos.y)
        
        drawLines(c, obj.x, obj.y, endPosX, endPosY, "rgb(0, 67, 70)")
        
        

        if(obj.attraction){

            let adja = endPosY-obj.y
            let oppo = endPosX-obj.x
            let angle = Math.atan2(-oppo,adja)+90*Math.PI/180
            
            let force = dist(obj.x,endPosX, obj.y, endPosY)
            
            let vx=obj.vx+Math.cos(angle)*force/100
            let vy=obj.vy+Math.sin(angle)*force/100
            let prevX = obj.x+vx
            let prevY = obj.y+vy
            
            for(let o2 = 0; o2 < objects.length; o2++){
                let other = objects[o2]

                if(obj!=other && other.attraction){
                    for(let i = 1;i<force*2;i++){
                        if(i%5==0) drawCircle(c,prevX,prevY,obj.r,obj.m,Colors.circleColor,0.5)
                        let tempObj = {x:prevX,y:prevY,m:obj.m}
                        
                        let attractForce = other.getAttractForce(tempObj)
                        vx+=attractForce.x
                        vy+=attractForce.y
                        prevX+=vx
                        prevY+=vy
                    }
                }
            }
            
        }
    }
}

function vectorSecondClick(obj, mousepos){
    if(obj.physics && !obj.static){
        let endPosX = obj.x+(obj.x-mousepos.x)
        let endPosY = obj.y+(obj.y-mousepos.y)
        
        let adja = endPosY-obj.y
        let oppo = endPosX-obj.x
        let angle = Math.atan2(-oppo,adja)+90*Math.PI/180
        
        let force = dist(obj.x,endPosX, obj.y, endPosY)

        obj.vx += Math.cos(angle)*force/100
        obj.vy += Math.sin(angle)*force/100
    }
}

export { vectorLoop, vectorSecondClick }