import { drawSimpleCircle } from "../utils.js"

class Particle {
    constructor(x,y,vx,vy,gravity,dampening,size,lifetime,color,sizeDecrease=false){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy

        this.gravity = gravity
        this.dampening = dampening

        this.size = size
        this.maxSize = size

        this.lifetime = lifetime
        this.maxLifetime = lifetime
        this.color = color

        this.sizeDecrease = sizeDecrease
    }

    force() {
        if(this.gravity!=0) this.vy += this.gravity
        this.vx *= 1-this.dampening
        this.vy *= 1-this.dampening
    }
    update(c) {

        this.force()

        this.x += this.vx
        this.y += this.vy
        
        this.lifetime-=1

        if(this.sizeDecrease) this.size = this.lifetime*this.maxSize/this.maxLifetime

        this.draw(c)
    }
    draw(c) {
        drawSimpleCircle(c,this.x,this.y,this.size, this.color)
    }
}

export { Particle }