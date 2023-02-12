function moveLoop(obj, mousepos){
    if(obj.name == "Wall"){
        obj.moveAttachedTo(mousepos)
        if (obj.attachedBy) obj.attachedBy.attachedTo = null;
        
    }else{
        obj.x = mousepos.x
        obj.y = mousepos.y
    }
    if(obj.physics){
        obj.vx = 0
        obj.vy = 0
    }
}

function moveSecondClick(obj,mousepos){
    let dist = {x:mousepos.x-mousepos.prevx,y:mousepos.y-mousepos.prevy}
    if(obj.physics && !obj.static && (Math.abs(dist.x) > 3 || Math.abs(dist.y) > 3)){
        obj.vx += dist.x/2
        obj.vy += dist.y/2
    }
    
}

export { moveLoop, moveSecondClick }