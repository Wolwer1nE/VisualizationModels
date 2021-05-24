//[5,6,7,8]

export default class DatasetReader {
    constructor(dataset) {

        this.dataset = dataset; 
        this.structureFigurePoints = new Map();

    }

    getMeshes() {
        let meshes = this.dataset['mesh'];
        let setPoints = this.dataset['points'];

        let keysMeshes = Object.keys(meshes);

        for (let i = 0; i < keysMeshes.length; i++) 
        {
            let keysNameFigures = Object.keys(meshes[keysMeshes[i]]);
            for (let j = 0; j < keysNameFigures.length; j++) 
            {
                let figures = meshes[keysMeshes[i]][keysNameFigures[j]];
                let setFigures = [];
                for (let k = 0; k < figures.length; k++) 
                {   
                    let points = [];                 
                    for (let m = 0; m < figures[k].length; m++)
                    {
                        points.push(setPoints[figures[k][m]]);
                    }
                    setFigures.push(points);
                }
                if (setFigures.length != 0) this.structureFigurePoints.set(keysNameFigures[j], setFigures);
            }
        }
        return this.structureFigurePoints;
    }

    getNamesMeshes() {
        let meshes = this.dataset['mesh'];
        let keysMeshes = Object.keys(meshes);
        return keysMeshes;
    }
}