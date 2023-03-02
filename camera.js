let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

export let currentZoom = 1;
let isDragging = false;
let dragStartPosition = { x: 0, y: 0 };
export let currentTransformedCursor;

function onMouseDown(event) {
    event.preventDefault();
	console.log(event)
    if(event.buttons==2){
	    
        isDragging = true;
        dragStartPosition = getTransformedPoint(event.offsetX, event.offsetY);
    }
    
}

function getTransformedPoint(x, y) {
	const originalPoint = new DOMPoint(x, y);
  return c.getTransform().invertSelf().transformPoint(originalPoint);
}

function onMouseMove(event) {
    currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY)
    
    if (isDragging) {
        c.translate(currentTransformedCursor.x - dragStartPosition.x, currentTransformedCursor.y - dragStartPosition.y);
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
      
    event.preventDefault();
}

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('wheel', onWheel);
