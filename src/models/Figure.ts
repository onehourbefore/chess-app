import { Colors } from "./Colors";
import { Cell } from "./Cell";

export enum FigureNames {
    KING = 'Король',
    QUEEN = 'Ферзь',
    BISHOP = 'Слон',
    KNIGHT = 'Конь',
    ROOK = 'Ладья',
    PAWN = 'Пешка',
};

export class Figure {
    id: number =  Math.random();
    color: Colors;
    name: FigureNames;
    logo: string = '';

    constructor(color: Colors, name: FigureNames) {
        this.color = color;
        this.name = name;
    }

    canMove(currentPosition: Cell, cells: Cell[][]): void {}

    isEmptyVertical(currentPosition: Cell, cells: Cell[][]): void {
        const verticalCells = [];
        for (let i = 0; i < 8; i++) {
            verticalCells.push(cells[i][currentPosition.x]);
        }

        for (let i = currentPosition.y + 1; i < 8; i++) {
            const target = verticalCells[i];
            if(this.isAvailableCell(target) === 'break') break;
            if(this.isAvailableCell(target) === 'continue') continue;
        }

        for (let i = currentPosition.y - 1; i >= 0; i--) {
            const target = verticalCells[i];
            if (this.isAvailableCell(target) === 'break') break;
            if (this.isAvailableCell(target) === 'continue') continue;
        }
    }

    isEmptyHorizontal(currentPosition: Cell, cells: Cell[][]): void {
        const horizontalCells = cells[currentPosition.y];

        for (let i = currentPosition.x + 1; i < 8; i++) {
            const target = horizontalCells[i];
            if (this.isAvailableCell(target) === 'break') break;
            if (this.isAvailableCell(target) === 'continue') continue;
        }

        for (let i = currentPosition.x - 1; i >= 0; i--) {
            const target = horizontalCells[i];
            if (this.isAvailableCell(target) === 'break') break;
            if (this.isAvailableCell(target) === 'continue') continue;
        }
    }

    isEmptyDiagonal(currentPosition: Cell, cells: Cell[][]): void {
        const dy = currentPosition.y;
        const dx = currentPosition.x;

        for (let i = 1; dy + i < 8 && dx + i < 8; i++) {
            const targetUpRight = cells[dy + i][dx + i];
            if (this.isAvailableCell(targetUpRight) === 'break') break;
            if (this.isAvailableCell(targetUpRight) === 'continue') continue;
        }

        for (let i = 1; dy + i < 8 && dx - i >= 0; i++) {
            const targetUpLeft = cells[dy + i][dx - i];
            if (this.isAvailableCell(targetUpLeft) === 'break') break;
            if (this.isAvailableCell(targetUpLeft) === 'continue') continue;
        }

        for (let i = 1; dy - i >= 0 && dx + i < 8; i++) {
            const targetDownRight = cells[dy - i][dx + i];
            if (this.isAvailableCell(targetDownRight) === 'break') break;
            if (this.isAvailableCell(targetDownRight) === 'continue') continue;
        }

        for (let i = 1; dy - i >= 0 && dx - i >= 0; i++) {
            const targetDownLeft = cells[dy - i][dx - i];
            if (this.isAvailableCell(targetDownLeft) === 'break') break;
            if (this.isAvailableCell(targetDownLeft) === 'continue') continue;
        }
    }

    isEnemyFigure(target: Cell): boolean {
        return !!(target.figure &&
            this.color !== target.figure.color);
    }

    isOurFigure(target: Cell): boolean {
        return !!(target.figure &&
            target.figure.color === this.color);
    }

    isKing(target: Cell): boolean {
        return !!(target.figure &&
            target.figure.name === FigureNames.KING);
    }

    isEmptyCell(target: Cell): boolean {
        return !target.figure;
    }

    isAvailableCell(target: Cell): string {
        if (this.isOurFigure(target)) {
            return 'break'
        }
        if (this.isEmptyCell(target)) {
            target.available = true;
            return 'continue';
        }
        if (this.isEnemyFigure(target)) {
            target.available = true;
            return 'break';
        }
        
        return '';
    }

    setFirstStep(): void {}
};