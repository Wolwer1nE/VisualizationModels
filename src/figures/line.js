export default class Line {
    constructor(firstPoint, secondPoint) {
        this.firstPoint = firstPoint; 
        this.secondPoint = secondPoint;
    }

    isEqual(anotherLine) {
        return this.firstPoint == anotherLine.firstPoint  && this.secondPoint == anotherLine.secondPoint 
            || this.firstPoint == anotherLine.secondPoint && this.secondPoint == anotherLine.firstPoint;
    }
}