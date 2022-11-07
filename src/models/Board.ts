import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { King } from "./figures/King";
import { Queen } from './figures/Queen';
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { Figure, FigureNames } from "./Figure";


export class Board {
    cells: Cell[][] = [];
    shahForBlack: boolean = false;
    shahForWhite: boolean = false;
    downedBlack: Figure[] = [];
    downedWhite: Figure[] = [];

    initCells(): Board {
        for (let y = 0; y < 8; y++) {
            this.cells[y] = [];
            for (let x = 0; x < 8; x++) {
                if ((x + y) % 2 === 0) {
                    this.cells[y].push(new Cell(x, y, Colors.WHITE));
                } else {
                    this.cells[y].push(new Cell(x, y, Colors.BLACK));
                }
            }
        }
        this.addFigures();
        return this;
    }

    addKings(): void {
        this.cells[0][4].setFigure(new King(Colors.BLACK));
        this.cells[7][4].setFigure(new King(Colors.WHITE));
    }

    addQueens(): void {
        this.cells[0][3].setFigure(new Queen(Colors.BLACK));
        this.cells[7][3].setFigure(new Queen(Colors.WHITE));
    }

    addBishops(): void {
        this.cells[0][2].setFigure(new Bishop(Colors.BLACK));
        this.cells[0][5].setFigure(new Bishop(Colors.BLACK));
        this.cells[7][2].setFigure(new Bishop(Colors.WHITE));
        this.cells[7][5].setFigure(new Bishop(Colors.WHITE));
    }

    addKnights(): void {
        this.cells[0][1].setFigure(new Knight(Colors.BLACK));
        this.cells[0][6].setFigure(new Knight(Colors.BLACK));
        this.cells[7][1].setFigure(new Knight(Colors.WHITE));
        this.cells[7][6].setFigure(new Knight(Colors.WHITE));
    }

    addRooks(): void {
        this.cells[0][0].setFigure(new Rook(Colors.BLACK));
        this.cells[0][7].setFigure(new Rook(Colors.BLACK));
        this.cells[7][0].setFigure(new Rook(Colors.WHITE));
        this.cells[7][7].setFigure(new Rook(Colors.WHITE));
    }

    addPawns(): void {
        for (let x = 0; x < 8; x++) {
            this.cells[1][x].setFigure(new Pawn(Colors.BLACK));
        };
        for (let x = 0; x < 8; x++) {
            this.cells[6][x].setFigure(new Pawn(Colors.WHITE));
        };
    }

    addFigures(): void {
        this.addKings();
        this.addQueens();
        this.addBishops();
        this.addKnights();
        this.addRooks();
        this.addPawns();
    }

    highlightCells(currentCell: Cell): void {
        if (!currentCell.figure) return;
        currentCell.figure.canMove(currentCell, this.cells);
    }

    checkIsShah(targetKing?: Cell): { forWhite: boolean, forBlack: boolean } {
        const whiteKingCell: Cell | void = targetKing ?? this.getKingCell(Colors.WHITE);
        const blackKingCell: Cell | void = targetKing ?? this.getKingCell(Colors.BLACK);

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const target = this.cells[y][x];

                if (
                    target.figure &&
                    target.figure.color === Colors.WHITE
                ) {
                    target.figure.canMove(target, this.cells);
                    if(blackKingCell?.available) {
                        return { forWhite: false, forBlack: true };
                    }
                }

                if (
                    target.figure &&
                    target.figure.color === Colors.BLACK
                ) {
                    target.figure.canMove(target, this.cells)
                    if(whiteKingCell?.available) {
                        return { forWhite: true, forBlack: false };
                    }
                }
            }
        }

        return { forWhite: false, forBlack: false };
    }

    getKingCell(kingColor: Colors): Cell | void {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const target = this.cells[y][x];

                if (
                    target.figure &&
                    target.figure.name === FigureNames.KING &&
                    target.figure.color === kingColor
                ) {
                    const kingCell: Cell = target;
                    return kingCell;
                }
            }
        }
    }

    clearAvailables(): void {
        for (let i = 0; i < 8; i++) {
            const row = this.cells[i];

            for (let j = 0; j < 8; j++) {
                const cell = row[j];
                cell.available = false;
            }
        }
    }
};