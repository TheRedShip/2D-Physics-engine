import { drawCircle, drawSimpleCircle, drawLines } from "../utils.js"
import { DT, G, Colors, ballConstant } from "../constant.js"

class Circle {
    constructor(r, x, y, vx, vy, m = 1) {
        this.name = "Circle"

        this.r = r
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.m = m

        this.gravity = 0
        this.defaultGravity = ballConstant.defaultGravity
        this.friction = 0
        this.defaultFriction = ballConstant.defaultFriction

        this.contraint = undefined;

        this.trajectory = false;
        this.trajecList = []

        let colors = Colors.trajecColor.split(",")
        for (let i = 0; i < colors.length; i++) colors[i] = String(Number(colors[i]) + Math.random() * 50 - 25)
        this.trajecColor = `rgb(${colors.join(",")})`

        this.attraction = false;
        this.physics = true
        this.static = false
    }
    distFunc(mousepos) {
        // return dist(mousepos.x, this.x, mousepos.y, this.y) < this.r
        return dist(mousepos.x, this.x, mousepos.y, this.y)

    }
    copy(obj) {
        this.gravity = obj.gravity
        this.friction = obj.friction
        this.static = obj.static
        this.attraction = obj.attraction
        this.trajectory = obj.trajectory
    }
    checkBorder(screenx, screeny) {
        // if (this.x + this.vx - this.r <= 0 || this.x + this.vx + this.r >= screenx) {
        //     if (this.x + this.vx + this.r >= screenx) this.x = screenx - this.r;
        //     if (this.x + this.vx - this.r <= 0) this.x = 0 + this.r;

        //     this.vx *= -1

        //     if (this.contraint) this.vx *= 0.60
        //     if (this.friction) this.vx *= ballConstant.collisionFriction
        // }
        // if (this.y + this.vy - this.r <= 0 || this.y + this.vy + this.r >= screeny) {
        //     if (this.y + this.vy + this.r >= screeny) this.y = screeny - this.r;
        //     if (this.y + this.vy - this.r <= 0) this.y = 0 + this.r;

        //     this.vy *= -1

        //     if (this.contraint) this.vy *= 0.60
        //     if (this.friction) this.vy *= ballConstant.collisionFriction
        // }
    }
    getAttractForce(other) {
        let r = dist(this.x, other.x, this.y, other.y)
        let f = { x: this.x - other.x, y: this.y - other.y }
        let fMag = Math.sqrt(f.x ** 2 + f.y ** 2)

        let newMag = (G * this.m * other.m) / (r * r)
        console.log(newMag)
        let new_f = { x: f.x * (newMag / fMag), y: f.y * (newMag / fMag) }
        return { x: new_f.x / other.m, y: new_f.y / other.m }
    }
    attract(other) {
        let attractForce = this.getAttractForce(other)
        other.vx += attractForce.x * DT
        other.vy += attractForce.y * DT
    }
    force() {
        if (this.gravity != 0 && this.vy < Math.sqrt((2 * this.m * this.defaultGravity) / this.defaultFriction)) this.vy += this.gravity * this.m * DT
        if (this.friction > 0) {
            this.vx *= 1 - (this.friction * (this.r / 10)) * DT
            this.vy *= 1 - (this.friction * (this.r / 10)) * DT
        }
    }
    update(c, screenx, screeny) {
        this.checkBorder(screenx, screeny)


        if (!this.static) {
            this.force()
            this.x += this.vx * DT
            this.y += this.vy * DT
        }

        if (this.trajectory) {
            if (this.trajecList.length < ballConstant.lengthTrajectory) this.trajecList.push([this.x, this.y])
            else this.trajecList.shift()
        }

        this.draw(c)
    }
    draw(c) {
        drawCircle(c, this.x, this.y, this.r, this.m, Colors.circleColor)
        if (this.static) drawSimpleCircle(c, this.x, this.y, this.r / 15, Colors.staticColor)

        if (this.trajecList.length > 1) {
            for (let i = 1; i < this.trajecList.length; i++) {
                let pos = this.trajecList[i]
                let prevPos = this.trajecList[i - 1]

                drawLines(c, prevPos[0], prevPos[1], pos[0], pos[1], this.trajecColor, 3)
            }
        }

    }
    drawSelect(c) {
        c.lineWidth = 10
        c.strokeStyle = Colors.selectedColor //224, 179, 105
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        c.stroke()
        c.closePath()
    }
}

function dist(x1, x2, y1, y2) {
    return ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) ** .5
}
function ccCollision(obj1, obj2) {
    let dist = { x: obj1.x - obj2.x, y: obj1.y - obj2.y }
    let distMag = Math.sqrt(dist.x ** 2 + dist.y ** 2)
    if (distMag < obj1.r + obj2.r) {
        ccPenRes(obj1, obj2,dist,distMag)

        let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
        let distance = Math.sqrt((obj2.x - obj1.x) ** 2 + (obj2.y - obj1.y) ** 2);
        let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance }; //dir normal

        let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
        let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

        if (obj1.friction || obj2.friction) speed *= ballConstant.collisionFriction

        if (speed < 0) {

        } else {
            let impulse = 2 * speed / (obj1.m + obj2.m);

            if (!obj1.static) {
                obj1.vx -= (impulse * obj2.m * vCollisionNorm.x) * DT
                obj1.vy -= (impulse * obj2.m * vCollisionNorm.y) * DT
            }
            if (!obj2.static) {
                obj2.vx += (impulse * obj1.m * vCollisionNorm.x) * DT
                obj2.vy += (impulse * obj1.m * vCollisionNorm.y) * DT
            }
        }
    }
}

function ccPenRes(obj1, obj2,dist,distMag) {
    let pen_depth = obj1.r + obj2.r - distMag

    let pen_res;
    if (distMag == 0) {
        pen_res = { x: 0, y: 0 }
    } else {
        let DirectionNormalized = { x: dist.x / distMag, y: dist.y / distMag }
        pen_res = { x: DirectionNormalized.x * (pen_depth / 2), y: DirectionNormalized.y * (pen_depth / 2) }
    }

    if (!obj1.static) {
        obj1.x += pen_res.x * DT
        obj1.y += pen_res.y * DT
    }
    if (!obj2.static) {
        obj2.x += pen_res.x * -1 * DT
        obj2.y += pen_res.y * -1 * DT
    }
}

export { Circle, ccCollision }
