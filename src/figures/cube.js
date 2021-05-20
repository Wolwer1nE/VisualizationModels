export default class Cube {
    constructor(points) {
        this.vertices = points;                 //вершины
        this.countEdges = 12;                   //количество рёбер 
        this.countFaces = 6;                    //количество граней
        this.countEdgesToVertice = 3;           //количество рёбер примыкающих к вершине
        this.countPolygonsInOneFace = 4;        //количество полигонов в одной грани

        this.colorMesh = 0xFFFF99;

        this.pointsGrid = [];
        this._getGrid();
    }
    _getGrid() {
        let points = []; 
        return points; 
    }

    _getMesh() {

    }
}