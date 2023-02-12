import { subSelected } from "../uiScript.js"
import { dist, drawLines, drawSimpleCircleEmpty, drawSimpleElipseEmpty, getClickedObj} from "../utils.js"
import { G } from "../constant.js"

function attractionLoop(c,obj,mousepos,currentBuild){
    if(subSelected%3==0){
        if(obj.physics) obj.attraction = !obj.attraction;obj.trajectory=true
            
        return currentBuild = {oldPos:{x:0,y:0}, obj:-1}
    }else if(subSelected%3==1){
        if(obj.physics){
            let d = dist(obj.x,mousepos.x,obj.y,mousepos.y)
            drawSimpleCircleEmpty(c,mousepos.x,mousepos.y,d,"rgba(12, 24, 33,0.5)")

            return currentBuild
        }
    }
    // }else if(subSelected%3==2){
    //     if(obj.physics){
    //         let d = dist(obj.x,mousepos.x,obj.y,mousepos.y)
        
            
    //         return currentBuild
    //     }
    // }
}

function attractionSecondClick(obj,objects,mousepos){
    if(obj.physics){
        let newObj = getClickedObj(mousepos,objects)
        let adja =  newObj.y-obj.y
        let oppo =  newObj.x-obj.x
        
        let angle = Math.atan2(oppo,adja)+90*Math.PI/180
        let d = dist(obj.x,newObj.x,obj.y,newObj.y)

        if(subSelected%3==1){
            if(newObj.physics){
                
                let speed = Math.sqrt((G*newObj.m)/d)

                obj.vx = Math.sin(angle)*speed
                obj.vy = Math.cos(angle)*speed
                // console.log(speed)
            }
        }
    }
    // }else if(subSelected%3==2){
    //     if(newObj.physics){

    //         let speed = Math.sqrt( (G*(obj.m+newObj.m)) * (2/d - 1/ (d*1.3)) ) 

    //         obj.vx = Math.sin(angle)*speed
    //         obj.vy = Math.cos(angle)*speed
    //     }
    // }
    
}

export { attractionLoop, attractionSecondClick}