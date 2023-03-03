import { subSelected } from "../uiScript.js"

function propertyLoop(obj){
    if (obj.physics) {
        if(subSelected % 3 == 0){
            if(obj.gravity){
                obj.gravity = 0
                obj.friction = 0
            }else{
                obj.gravity = obj.defaultGravity
                obj.friction = obj.defaultFriction
            }
        }else if(subSelected % 3 == 1){
            obj.static = !obj.static
            obj.vx = 0
            obj.vy = 0
        }else{
            return {oldPos:{x:0,y:0}, obj:-1}
        }
    }
}


export { propertyLoop }
