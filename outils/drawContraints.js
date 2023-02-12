import { drawLines, getClickedObj } from "../utils.js"
import { Contraints } from "../class/contraints.js"
import { contraintConstant } from "../constant.js"

function drawContraintsLoop(c,obj, mousepos){
    if (obj.name == "Circle") {
        drawLines(c,mousepos.x,mousepos.y,obj.x,obj.y,"rgba(12, 24, 33,0.5)",undefined,contraintConstant.dashed)
    }
}

function drawContraintsSecondClick(objects,mousepos,currentObj){
    let newObj = getClickedObj(mousepos,objects)
    if (newObj!=-1 && currentObj.obj.physics && newObj.physics && newObj != currentObj.obj){
        let newContraints = new Contraints(currentObj.obj,newObj,0)
        
        currentObj.obj.contraint = newContraints
        newObj.contraint = newContraints

        objects.push(newContraints)

        return {oldPos:{x:0,y:0}, obj:-1}
    }
    return currentObj
}

export { drawContraintsLoop, drawContraintsSecondClick }