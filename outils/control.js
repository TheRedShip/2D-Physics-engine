import { toggleTab,subSelected } from "../uiScript.js"
import { drawLines, drawText,dist } from "../utils.js"
import { Colors } from "../constant.js"
import { currentZoom } from "../camera.js"


function controlLoop(c,obj,mousepos,currentBuild){
    if(subSelected%3==0){ 
        if(obj != -1 && obj.physics) toggleTab(obj) 
        return {oldPos:{x:0,y:0}, obj:-1}
    }
    else if(subSelected%3==1){
        let oldPos = currentBuild.oldPos


        let textPos = {x:oldPos.x+(mousepos.x-oldPos.x)/2,y:oldPos.y+(mousepos.y-oldPos.y)/2}
        let textSize = Math.max(100,100*(currentZoom**2));
        let distance = dist(oldPos.x,mousepos.x,oldPos.y,mousepos.y)

        drawText(c,textPos.x,textPos.y,textSize,String(distance.toFixed(0)) + "px")
        drawLines(c,oldPos.x,oldPos.y,mousepos.x,mousepos.y,Colors.measure,10,[10,10])

        
        return currentBuild
    }else{

    }
    
}

function controlSecondClick(){
    if(subSelected%3==1){
        return {oldPos:{x:0,y:0}, obj:-1}
    }
}

export { controlLoop,controlSecondClick }
