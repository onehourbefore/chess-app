import { Figure, FigureNames } from "../Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from '../../assets/white-pawn.png';
import blackLogo from '../../assets/black-pawn.png';


export class Pawn extends Figure {
    id: number = Math.random();
    color: Colors;
    logo: string;
    isFirstStep: boolean = true;

    constructor(color: Colors) {
        super(color, FigureNames.PAWN);
        this.color = color;
        this.logo = this.color === Colors.WHITE
            ? whiteLogo
            : blackLogo;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {
        const firstStep = this.color === Colors.BLACK ? 2 : -2;
        const step = this.color === Colors.BLACK ? 1 : -1;

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.isFirstStep) {
                    const target2 = cells[currentPosition.y + firstStep][currentPosition.x];
                    const target1 = cells[currentPosition.y + step][currentPosition.x];
                    if (
                        this.isEmptyCell(target2) &&
                        this.isEmptyCell(target1)
                    ) {
                        target2.available = true;
                    }
                    if (this.isEmptyCell(target1)) {
                        target1.available = true;
                    }
                }

                if (!this.isFirstStep) {
                    const target = cells[currentPosition.y + step][currentPosition.x];
                    if (this.isEmptyCell(target)) {
                        target.available = true
                    }
                }

                if (
                    y === currentPosition.y + step &&
                    (x === currentPosition.x + 1 || x === currentPosition.x - 1) &&
                    this.isEnemyFigure(cells[y][x])
                ) {
                    const target = cells[y][x];
                    target.available = true;
                }
                
            }
        }
    }

    setFirstStep(): void {
        this.isFirstStep = false;
    }
};