export default class Square {
    constructor(points) {
        this.vertices = points;                 //вершины
        this.countEdges = 4;                    //количество рёбер
        this.countFaces = 1;                    //количество граней
        this.countEdgesToVertice = 2;           //количество рёбер примыкающих к вершине
        this.countPolygonsInOneFace = 2;        //количество полигонов в грани

        this.colorMesh = 0x9922FF;

        this.pointsGrid = [];
        this._getGrid();

        this.pointsMesh = [];
        this._getMesh();
    }
    _getGrid() {
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
        this.pointsMesh = [
            this.vertices[0], this.vertices[1], this.vertices[3], 
            this.vertices[2], this.vertices[1], this.vertices[3]
        ];
    }
}

