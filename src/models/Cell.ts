import { Figure, FigureNames } from "./Figure";
import { Colors } from "./Colors";
import { Board } from "./Board";

export class Cell {
    id: number = Math.random();
    available: boolean = false;
    // координаты от 0 до 7
    x: number;
    y: number;
    figure: Figure | null = null;
    background: Colors;
    

    constructor(x: number, y: number, background: Colors) {
        this.background = background;
        this.x = x;
        this.y = y;
    }

    setFigure(figure: Figure | null): void {
        this.figure = figure;
    }

    moveFigure(target: Cell): boolean {
        if (
            (target.figure &&
                target.figure.name === FigureNames.KING) ||
            !target.available
        ) {
            return false;
        }

        if (
            this.figure &&
            this.figure.name === FigureNames.PAWN
        ) {
            this.figure.setFirstStep();
        }

        if (
            this.figure &&
            this.figure.color !== target.figure?.color
        ) {
            target.figure = this.figure;
            this.figure = null;
        }

        return true;
    }
};