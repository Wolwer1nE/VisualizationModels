import {default as Polygon} from './polygon.js'

export default class ObjectOnScene {
    constructor(name, points, number = 0) {
        this.key = name;
        this.name = name + number; 
        this.points = points; 

        this.checker = undefined;
        
        this.color = "rgb(" + this._getRandom(130, 255) + "," + this._getRandom(130, 255) + "," + this._getRandom(130, 255) + ")";

        this.nameContentHTMLButton  = this.name + "button";
        this.nameContentHTMLCheckbox = this.name + "checkbox";

        this.styleContentHTML = "<font><div><input type=\"checkbox\" id=" + this.nameContentHTMLCheckbox + " name=" 
        + this.name + " checked> <label for="+this.name + ">" 
        + this.name + "</label><button id=\"" + this.nameContentHTMLButton + 
        "\" style=\"margin: 3px 3px 3px 10px; padding: 2px 2px 2px 2px\"><font style=\"\">Выбрать</font></button></div></font>"

        this.vertices = points;                 //вершины
        this.countEdges = undefined             //количество рёбер
        this.countFaces = undefined;            //количество граней
        this.countEdgesToVertice = 3;           //количесвто рёбер примыкающих к вершине
        this.countFaceSides = undefined;        //количество сторон грани

        this.countPointsPolygon = undefined      //количество точек в одном полигоне

        if (this.key == 'thetra') {
            this.countEdges = 6;
            this.countFaces = 4; 
            this.countFaceSides = 3;
            this.countPointsPolygon = 3;
        }
        
        if (this.key == 'cubes') {
            this.countEdges = 12;
            this.countFaces = 6; 
            this.countFaceSides = 4;
            this.countPointsPolygon = 4;
        }

        this.pointsObjectGrid = [];
        this._getObjectGrid();

        this.pointsObjectPoly = [];
        this._getObjectPoly();
    }

    _getObjectPoly() {
        for (let i = 0; i < this.pointsObjectGrid.length; i+= this.countPointsPolygon) {
            let listPointsPolygon = [];
            for (let j = i; j < i + this.countPointsPolygon; j++) {
                listPointsPolygon.push(this.pointsObjectGrid[i]);
            }
            this.pointsObjectPoly.push(new Polygon(listPointsPolygon));
        }
    }

    _getObjectGrid() {
        let minLengthSegment = undefined;
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {            
                let beginPosition = new Array(this.points[i][0], this.points[i][1], this.points[i][2]);
                let endPosition   = new Array(this.points[j][0], this.points[j][1], this.points[j][2]);

                if (this.countEdges == 12) {
                    let lengthSegment = this._getDistanceBetweenPoints(beginPosition, endPosition);
                    if (i == 0 || lengthSegment < minLengthSegment) {
                        minLengthSegment = lengthSegment;
                    }
                }
                this.pointsObjectGrid.push(beginPosition);
                this.pointsObjectGrid.push(endPosition);
            }
        }
        if (minLengthSegment != undefined) {
            let pointsGridCube = [];
            for(let i = 0; i < this.pointsObjectGrid.length; i+=2) {
                let firstPoint = this.pointsObjectGrid[i];
                let secondPoint = this.pointsObjectGrid[i+1];
                let distance = this._getDistanceBetweenPoints(firstPoint, secondPoint); 
                if (distance == minLengthSegment) {
                    pointsGridCube.push(firstPoint);
                    pointsGridCube.push(secondPoint);
                }
            }
            this.pointsObjectGrid = pointsGridCube;
        }
    }

    _getDistanceBetweenPoints(firstPoint, secondPoint) {
        return Math.sqrt(Math.pow(firstPoint[0] - secondPoint[0], 2) 
        + Math.pow(firstPoint[1] - secondPoint[1], 2) 
        + Math.pow(firstPoint[2] - secondPoint[2], 2));
    }

    _getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}