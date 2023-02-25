import { dist, drawLines } from "../utils.js"
import { Colors, contraintConstant, DT } from "../constant.js"

class Contraints {
    constructor(obj1,obj2,length){
        this.startObj = obj1
        this.endObj = obj2
        
        this.r = 0


        this.x = this.startObj.x
        this.y = this.startObj.y
        this.x2 = this.endObj.x
        this.y2 = this.endObj.y

        this.stiffness = contraintConstant.stiffness;

        if(!length){
            this.length = dist(this.startObj.x,this.endObj.x,this.startObj.y,this.endObj.y)
        }else{
            this.length = length;
        }
    }
    drawSelect(c){
        drawLines(c,this.startObj.x,this.startObj.y,this.endObj.x,this.endObj.y,Colors.selectedColor,10,[10,10])
    }
    wallUnit(){
        let dist = {x:this.endObj.x-this.startObj.x,y:this.endObj.y-this.startObj.y}
        let distMag = Math.sqrt(dist.x**2 + dist.y**2)

        return {x:dist.x/distMag, y:dist.y/distMag}
    }
    distFunc(mousepos){
        return false
        // let closestPoint = cwClosestPoint(mousepos,this)

        // let mouseToClosest = {x:closestPoint.x-mousepos.x, y:closestPoint.y-mousepos.y}
        // let mouseToClosestMag = Math.sqrt(mouseToClosest.x**2 + mouseToClosest.y**2)
        
        // if(mouseToClosestMag <= 1) return true;
    }
    contraintForce(){
        let dist = {x:this.endObj.x-this.startObj.x,y:this.endObj.y-this.startObj.y}
        let hypoDist = Math.sqrt(dist.x**2 + dist.y**2)

        let diff = (this.length - hypoDist) / hypoDist / this.stiffness;

        let offset = {x:dist.x * diff,y:dist.y * diff}

        let totalMass = this.startObj.m + this.endObj.m
        let m2 = this.startObj.m / totalMass
        let m1 = this.endObj.m / totalMass
        
        if (Math.abs(hypoDist-this.length) > contraintConstant.maxStiff){
            if (!this.startObj.static) {
                this.startObj.x -= offset.x * m1 * DT;
                this.startObj.y -= offset.y * m1 * DT;
            }
            if (!this.endObj.static) {
                this.endObj.x += offset.x * m2 * DT;
                this.endObj.y += offset.y * m2 * DT;
            }
        }
        if (!this.startObj.static) {
            this.startObj.vx -= offset.x * m1 * DT;
            this.startObj.vy -= offset.y * m1 * DT;
        }
        if (!this.endObj.static) {
            this.endObj.vx += offset.x * m2 * DT;
            this.endObj.vy += offset.y * m2 * DT;
        }
    }
    update(c) {
        this.contraintForce()
        this.draw(c)
    }

    draw(c){
        drawLines(c,this.startObj.x,this.startObj.y,this.endObj.x,this.endObj.y,Colors.contraintColor,undefined,contraintConstant.dashed)
    }
}

export { Contraints }
