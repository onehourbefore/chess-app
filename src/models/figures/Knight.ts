import { Figure, FigureNames } from "../Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from '../../assets/white-knight.png';
import blackLogo from '../../assets/black-knight.png';


export class Knight extends Figure {
    id: number = Math.random();
    logo: string;
    color: Colors;

    constructor(color: Colors) {
        super(color, FigureNames.KNIGHT);
        this.color = color;
        this.logo = this.color === Colors.WHITE
            ? whiteLogo
            : blackLogo;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.validateMoves(currentPosition, x, y)) {
                    const target = cells[y][x];

                    if (
                        this.isEnemyFigure(target) ||
                        this.isEmptyCell(target)
                    ) {
                        target.available = true;
                    };
                }
            }
        }
    }

    validateMoves(
        currentPosition: Cell,
        x: number,
        y: number
        ): boolean {
        if (
            (currentPosition.y + 2 === y &&
                (currentPosition.x + 1 === x ||
                 currentPosition.x - 1 === x)) ||
            (currentPosition.y - 2 === y &&
                (currentPosition.x + 1 === x ||
                 currentPosition.x - 1 === x)) ||
            ((currentPosition.y + 1 === y ||
              currentPosition.y - 1 === y) &&
                  currentPosition.x + 2 === x) ||
            ((currentPosition.y + 1 === y ||
              currentPosition.y - 1 === y) &&
                  currentPosition.x - 2 === x)
        ) {
            return true;
        }
        return false;
    }
};
