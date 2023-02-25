import { SelectNums,Colors } from "./constant.js"
import { selected } from "./uiScript.js"

let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")


let currentZoom = 1;
let isDragging = false;
let dragStartPosition = { x: 0, y: 0 };
export let currentTransformedCursor;

function resetCanvas() {
	// c.save();
    // c.setTransform(1,0,0,1,0,0);
    // c.fillStyle = Colors.bgColor
    // c.fillRect(-window.innerWidth*30,-window.innerHeight*30,window.innerWidth*60, window.innerHeight*60)
    // c.restore();
}

function onMouseDown(event) {
	isDragging = true;
	dragStartPosition = getTransformedPoint(event.offsetX, event.offsetY);
}

function getTransformedPoint(x, y) {
	const originalPoint = new DOMPoint(x, y);
  return c.getTransform().invertSelf().transformPoint(originalPoint);
}

function onMouseMove(event) {
    currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY)
    resetCanvas();
    
    if (isDragging && selected == SelectNums.controlSelect) {

        c.translate(currentTransformedCursor.x - dragStartPosition.x, currentTransformedCursor.y - dragStartPosition.y);
        resetCanvas();
            
    }
}

function onMouseUp() {
	isDragging = false;
}

function onWheel(event) {
	let zoom = event.deltaY < 0 ? 1.1 : 0.9;
    
    currentZoom += Number((1-zoom).toFixed(1))
    if(currentZoom > 15){
        currentZoom = 15
        zoom = 1
    }
    c.translate(currentTransformedCursor.x, currentTransformedCursor.y);
    c.scale(zoom, zoom);
    c.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);
      
    resetCanvas();
    event.preventDefault();
}

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('wheel', onWheel);
