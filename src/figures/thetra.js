export default class Thetra {
    constructor(points) {
        
        this.vertices = points; 
        this.countEdges = 6;
        this.countFaces = 4; 
        this.countEdgesToVertice = 3;
        this.countPolygonsInOneFace = 1;
        this.colorMesh = 0xED5599;

        this.pointsGrid = [];
        this._getGrid();

        this.pointsMesh = [];
        console.log(this.pointsMesh)
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
            this.vertices[0], this.vertices[1], this.vertices[2], 
            this.vertices[0], this.vertices[2], this.vertices[3],
            this.vertices[0], this.vertices[3], this.vertices[1],
            this.vertices[3], this.vertices[2], this.vertices[1]
        ]
    }
}
