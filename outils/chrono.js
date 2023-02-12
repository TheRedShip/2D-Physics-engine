import { setDT } from "../constant.js"

function chronoLoop(mousepos,oldPos){
    let d = (mousepos.x-oldPos.x)/100
    setDT(d)
}


export { chronoLoop }