import { Figure, FigureNames } from "../Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from '../../assets/white-rook.png';
import blackLogo from '../../assets/black-rook.png';


export class Rook extends Figure {
    id: number = Math.random();
    color: Colors;
    logo: string;

    constructor(color: Colors) {
        super(color, FigureNames.ROOK);
        this.color = color;
        this.logo = this.color === Colors.WHITE
            ? whiteLogo
            : blackLogo;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {
        this.isEmptyHorizontal(currentPosition, cells);
        this.isEmptyVertical(currentPosition, cells);
    }
};