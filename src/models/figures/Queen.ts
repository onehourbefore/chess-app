import { Figure, FigureNames } from "../Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from '../../assets/white-queen.png';
import blackLogo from '../../assets/black-queen.png';


export class Queen extends Figure {
    id: number = Math.random();
    color: Colors;
    logo: string;

    constructor(color: Colors) {
        super(color, FigureNames.QUEEN);
        this.color = color;
        this.logo = this.color === Colors.WHITE
            ? whiteLogo
            : blackLogo;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {
        this.isEmptyHorizontal(currentPosition, cells);
        this.isEmptyVertical(currentPosition, cells);
        this.isEmptyDiagonal(currentPosition, cells);
    }
};