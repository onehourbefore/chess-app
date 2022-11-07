import { Figure, FigureNames } from "../Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from '../../assets/white-king.png';
import blackLogo from '../../assets/black-king.png';


export class King extends Figure {
    id: number = Math.random();
    color: Colors;
    logo: string;

    constructor(color: Colors) {
        super(color, FigureNames.KING);
        this.color = color;
        this.logo = this.color === Colors.WHITE
            ? whiteLogo
            : blackLogo;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {
        const { x: kingX, y: kingY } = currentPosition;
        
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const target = cells[y][x];

                if (
                    ((y === kingY + 1 &&
                        ((x === kingX) ||
                         (x === kingX + 1) ||
                         (x === kingX - 1))) ||
                    (y === kingY - 1 &&
                        ((x === kingX) ||
                         (x === kingX + 1) ||
                         (x === kingX - 1))) ||
                    (y === kingY &&
                        ((x === kingX + 1) ||
                         (x === kingX - 1)))) &&
                    (this.isEmptyCell(target) ||
                        this.isEnemyFigure(target)) &&
                    !this.isOurFigure(target)
                ) {
                    target.available = true;
                }
            }
        }
    }
}