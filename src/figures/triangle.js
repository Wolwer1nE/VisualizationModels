import {default as Line} from './line'

export default class Triangle {
    constructor(points) {
        this.vertices = points;                 //вершины
        this.countEdges = 3;                    //количество рёбер 
        this.countFaces = 1;                    //количество граней
        this.countEdgesToVertice = 1;           //количество рёбер примыкающих к вершине
        this.countPolygonsInOneFace = 1;        //количество полигонов в одной грани

        this.pointsGrid = [];
        this._getGrid();
        this.colorMesh = 0xFF1122;
        this.pointsMesh = [];
        this._getMesh();
    }
    _getGrid() {
        let lines = [];
        for (let i = 0; i < this.vertices.length; i++) {
            let firstPoint = this.vertices[i];
            for (let j = i + 1; j < this.vertices.length; j++) {
                let secondPoint = this.vertices[j];
                this.pointsGrid.push(firstPoint);
                this.pointsGrid.push(secondPoint);
            }
        }
    }

    _getMesh() {
        this.pointsMesh = this.vertices; 
    }
}