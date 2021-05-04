export default function initSceneController(canvas, objectUnderControl, camera, WIDTH_CANVAS, HEIGHT_CANVAS) {
    orbitControls(canvas, objectUnderControl, camera, WIDTH_CANVAS, HEIGHT_CANVAS);
}

function orbitControls(canvas, objectUnderControl, camera, WIDTH_CANVAS, HEIGHT_CANVAS) {
    let wheelState = {
        holdWheel : false,
        
        beginPositionX : undefined, 
        beginPositionY : undefined, 
    
        previousPositionX : undefined, 
        previousPositionY : undefined,
    
    
        coefYaw : 10,     //X
        coefPitch : 10,   //Y
    }
    
    let leftMouseButtonState = {
        holdButton : false, 
    
        beginPositionX : undefined, 
        beginPositionY : undefined, 
    
        previousPositionX : undefined, 
        previousPositionY : undefined,
    
        coef : 1,
    }

    canvas.onmousedown = function(event){
        if (event.which == 2 && !wheelState.holdWheel) {
            wheelState.beginPositionX = event.offsetX;
            wheelState.beginPositionY = event.offsetY;
            wheelState.holdWheel = true;
        }
    
        if (event.which == 1) {
            leftMouseButtonState.beginPositionX = event.offsetX; 
            leftMouseButtonState.beginPositionY = event.offsetY;
            leftMouseButtonState.holdButton = true;
        }
    }

    canvas.onmouseup = function(event) {
        if (event.which == 2 && wheelState.holdWheel) {
            wheelState.holdWheel = false;
        }
    
        if (event.which == 1 && leftMouseButtonState.holdButton) {
            leftMouseButtonState.holdButton = false;
        }
    }
    

    canvas.onwheel = function(event) {
        if (event.deltaY < 0) camera.translateZ(-1);
        if (event.deltaY > 0) camera.translateZ(+1);
    }


    canvas.onmousemove = function(event) {
        if (wheelState.holdWheel) {
            let stepX = (wheelState.beginPositionX - event.offsetX) / WIDTH_CANVAS;
            let stepY = (wheelState.beginPositionY - event.offsetY) / HEIGHT_CANVAS;
    
            if (   stepX < 0 && wheelState.previousPositionX > event.offsetX 
                || stepX > 0 && wheelState.previousPositionX < event.offsetX) {
                wheelState.beginPositionX = wheelState.previousPositionX;
            }
    
            if (   stepY < 0 && wheelState.previousPositionY > event.offsetY
                || stepY > 0 && wheelState.previousPositionY < event.offsetY){
                wheelState.beginPositionY = wheelState.previousPositionY;
            }
    
            camera.rotation.y += stepX / wheelState.coefYaw;
            camera.rotation.x += stepY / wheelState.coefPitch;
            wheelState.previousPositionX = event.offsetX; 
            wheelState.previousPositionY = event.offsetY;
        }
    
        if (leftMouseButtonState.holdButton) {
    
            let stepX = (leftMouseButtonState.beginPositionX - event.offsetX) / WIDTH_CANVAS;
            let stepY = (leftMouseButtonState.beginPositionY - event.offsetY) / HEIGHT_CANVAS;
    
            if (   stepX < 0 && leftMouseButtonState.previousPositionX > event.offsetX 
                || stepX > 0 && leftMouseButtonState.previousPositionX < event.offsetX) {
                    leftMouseButtonState.beginPositionX = leftMouseButtonState.previousPositionX;
            }
            if (   stepY < 0 && leftMouseButtonState.previousPositionY > event.offsetY
                || stepY > 0 && leftMouseButtonState.previousPositionY < event.offsetY) {
                    leftMouseButtonState.beginPositionY = leftMouseButtonState.previousPositionY;
            }
    
            camera.translateX(stepX / leftMouseButtonState.coef);
            camera.translateY(-stepY / leftMouseButtonState.coef);
    
            leftMouseButtonState.previousPositionX = event.offsetX;
            leftMouseButtonState.previousPositionY = event.offsetY;
        }
        camera.lookAt(objectUnderControl.position);
    }
}