export default class ObjectOnScene {
    constructor(name, points) {
        this.name = name; 
        this.points = points; 
        this.checker = undefined;
        
        this.pointsObjectGrid = [];
        this.color = "rgb(" + this._getRandom(130, 255) + "," + this._getRandom(130, 255) + "," + this._getRandom(130, 255) + ")";

        this.nameContentHTMLButton  = this.name + "button";
        this.nameContentHTMLCheckbox = this.name + "checkbox";

        this.styleContentHTML = "<font><div><input type=\"checkbox\" id=" + this.nameContentHTMLCheckbox + " name=" 
        + this.name + " checked> <label for="+this.name + ">" 
        + this.name + "</label><button id=\"" + this.nameContentHTMLButton + 
        "\" style=\"margin: 3px 3px 3px 10px; padding: 2px 2px 2px 2px\"><font style=\"\">Выбрать</font></button></div></font>"
    }

    getObjectGrid() {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {            
                let beginPosition = new Array(this.points[i][0], this.points[i][1], this.points[i][2]);
                let endPosition   = new Array(this.points[j][0], this.points[j][1], this.points[j][2]);
    
                this.pointsObjectGrid.push(beginPosition);
                this.pointsObjectGrid.push(endPosition);
            }
        }
        return this.pointsObjectGrid;
    }

    _getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}