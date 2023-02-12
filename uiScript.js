import { setDT } from "./constant.js"

let itemList = document.getElementsByClassName("item")
let subItemList = document.getElementsByClassName("subItemConfig")

let selected = -1
let subSelected = -1

let currentObj;

let gravSwitch = document.getElementById("checkgrav")
let fricSwitch = document.getElementById("checkfric")
let staticSwitch = document.getElementById("checkstatic")
let trajectorySwitch = document.getElementById("checktrajectory")

let VX = document.getElementById("VX")
let VY = document.getElementById("VY")

let previousDT = 0
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ) {
        if (previousDT == 0) {
            previousDT = setDT(0)
        } else {
            previousDT = setDT(1)
        }
    }
}

for(let i = 0; i < itemList.length; i++){
    itemList[i].onmousedown = function () {
        if(selected == i) return
        
        itemList[i].classList.add("selected")
        if (selected != -1) itemList[selected].classList.remove("selected")

        selected = i

        return true;
    };
}

for(let i = 0; i < subItemList.length; i++){
    subItemList[i].onmousedown = function () {
        if(subSelected == i) return

        subItemList[i].classList.add("selected")
        if (subSelected != -1) subItemList[subSelected].classList.remove("selected")

        subSelected = i

        return true;
    };
}

gravSwitch.onclick = function (){
    if (currentObj){
        if(gravSwitch.checked) currentObj.gravity = currentObj.defaultGravity
        else currentObj.gravity = 0
    }
    return true;
}
fricSwitch.onclick = function (){
    if (currentObj){
        if(fricSwitch.checked) currentObj.friction = currentObj.defaultFriction
        else currentObj.friction = 0
    }
    return true;
}
staticSwitch.onclick = function (){
    if (currentObj){
        if(staticSwitch.checked) currentObj.static = true
        else currentObj.static = false
    }
    return true;
}
trajectorySwitch.onclick = function() {
    if (currentObj) {
        if (trajectorySwitch.checked) currentObj.trajectory = true
        else currentObj.trajectory = false
    }
    return true;
}

function toggleTab(obj){
    currentObj = obj

    let controlTab = document.getElementById("control")
    if(!controlTab.classList.contains("control-open")){
        controlTab.classList.remove("control-close")
        controlTab.classList.add("control-open")

        let controlTabName = document.getElementById("control-name")
        controlTabName.textContent = obj.name

        gravSwitch.checked = obj.gravity!=0
        fricSwitch.checked = obj.friction!=0
        staticSwitch.checked = obj.static
        trajectorySwitch.checked = obj.trajectory

        VX.textContent = "VX : " + obj.vx.toFixed(1)
        VY.textContent = "VY : " + obj.vy.toFixed(1)

    }else{
        controlTab.classList.remove("control-open")
        controlTab.classList.add("control-close")

    } 
}

export { selected, subSelected, toggleTab}