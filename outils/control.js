import { toggleTab } from "../uiScript.js"

function controlLoop(obj){
    if(obj.physics) toggleTab(obj)
}

export { controlLoop }