export default function initScene(document) {
    const canvas = document.getElementById("canvas");
    const fieldSidebarObjects    = document.getElementsByClassName("sidebarObjects")[0];
    const fieldSidebarProperties = document.getElementsByClassName("sidebarProperties")[0];
    const fieldFooter = document.getElementsByClassName("footer")[0];
    const PART_BLOCK = 6;
    const HEIGHT_FOOTER = window.innerHeight / 20;
    const MIN_HEIGHT_BLOCK_LIST_OBJECTS = window.innerHeight / 3;
    const MAX_HEIGHT_BLOCK_LIST_OBJECTS = window.innerHeight / 3;
    const MIN_HEIGHT_BLOCK_PROPERTIES_OBJECTS = window.innerHeight - MIN_HEIGHT_BLOCK_LIST_OBJECTS;
    const MAX_HEIGHT_BLOCK_PROPERTIES_OBJECTS = window.innerHeight - MAX_HEIGHT_BLOCK_LIST_OBJECTS;
    const WIDTH_CANVAS = window.innerWidth - window.innerWidth / PART_BLOCK;
    const HEIGHT_CANVAS = window.innerHeight - HEIGHT_FOOTER;

    canvas.width = WIDTH_CANVAS;
    canvas.height = HEIGHT_CANVAS;    

    //canvas.style = "display: block; background-color: #303050;"

    fieldSidebarObjects.style.background = "#320b35";
    fieldSidebarProperties.style.background = "#310062"

    fieldSidebarObjects.style.minHeight    = MIN_HEIGHT_BLOCK_LIST_OBJECTS + 'px';
    fieldSidebarObjects.style.maxHeight    = MAX_HEIGHT_BLOCK_LIST_OBJECTS + 'px';

    fieldSidebarProperties.style.minHeight = MIN_HEIGHT_BLOCK_PROPERTIES_OBJECTS + 'px'
    fieldSidebarProperties.style.maxHeight = MAX_HEIGHT_BLOCK_PROPERTIES_OBJECTS + 'px'

    fieldFooter.style.minHeight = HEIGHT_FOOTER + "px";
    fieldFooter.style.maxHeight = HEIGHT_FOOTER + "px";
    
    fieldFooter.style.minWidth = WIDTH_CANVAS;
    fieldFooter.style.maxWidth = WIDTH_CANVAS;
    
    fieldSidebarObjects.style.overflowY = 'auto'
    fieldSidebarProperties.style.overflowY = 'auto'
}
