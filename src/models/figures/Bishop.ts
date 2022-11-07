import { Figure, FigureNames } from "../Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from '../../assets/white-bishop.png';
import blackLogo from '../../assets/black-bishop.png';


export class Bishop extends Figure {
    id: number = Math.random();
    color: Colors;
    logo: string;

    constructor(color: Colors) {
        super(color, FigureNames.BISHOP);
        this.color = color;
        this.logo = this.color === Colors.WHITE
            ? whiteLogo
            : blackLogo;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {
        this.isEmptyDiagonal(currentPosition, cells);
    }
};