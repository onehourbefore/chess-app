import React from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Colors } from '../../models/Colors';
import { Figure, FigureNames } from '../../models/Figure';

import CellComponent from '../cellComponent/CellComponent';
import CoordsX from '../coords/CoordsX';
import CoordsY from '../coords/CoordsY';

import cl from './BoardComponent.module.scss';


type BoardComponentProps = {
    board: Board,
    currentPlayer: Colors | null,
    setCurrentPlayer: (activeColor: Colors) => void,
    setDownedFigure: (figure: Figure | null) => void,
};

const BoardComponent: React.FC <BoardComponentProps> = (
    { 
        board,
        currentPlayer,
        setCurrentPlayer,
        setDownedFigure,
    }
): JSX.Element => {
    const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);
    const [statusMessage, setStatusMessage] = React.useState<string>('');

    const cells = board.cells.map((row: Cell[]) => 
        row.map((cell: Cell) => 
            <CellComponent
                key={cell.id}
                rotateCell={currentPlayer === Colors.BLACK}
                handleClick={handleClick}
                cell={cell}
                clicked={
                    cell.x === selectedCell?.x && 
                    cell.y === selectedCell.y
                }
            />
        )
    );

    function isErrorClick(targetCell: Cell): boolean {
        return !!((!selectedCell && !targetCell.figure) ||
            (!selectedCell && targetCell.figure?.color !== currentPlayer));
    }

    function clickOnFigure(targetCell: Cell): void {
        board.clearAvailables();
        setSelectedCell(targetCell);
        board.highlightCells(targetCell);
    }

    function setShahStatus(isShah: { forWhite: boolean, forBlack: boolean }): void {
		if (isShah.forWhite) {
            return setStatusMessage('Шах белому королю');
        };
		if (isShah.forBlack) {
            return setStatusMessage('Шах черному королю');
        };
	}

    function setWrongMoveStatus(): void {
        setStatusMessage('Ход невозможен');
    }

    function isShahAfterMove(kingTarget?: Cell): boolean {
        if (kingTarget) kingTarget.available = false;
        if (
            (board.checkIsShah(kingTarget).forWhite &&
                currentPlayer === Colors.WHITE) ||
            (board.checkIsShah(kingTarget).forBlack &&
                currentPlayer === Colors.BLACK)
        ) {
            return true;
        }
        return false;
    }

    function cancelMove(
        selectedCell: Cell,
        targetCell: Cell,
        figureCopy: Figure | null,
    ): void {
        selectedCell && selectedCell.setFigure(targetCell.figure);
        targetCell.setFigure(figureCopy);
        setWrongMoveStatus();
        setSelectedCell(null);
        board.clearAvailables();
        return
    }

    function handleClick(cell: Cell): void {
        const figureCopy: Figure | null = JSON.parse(JSON.stringify(cell.figure));
        if (isErrorClick(cell)) return

        if (
            selectedCell &&
            selectedCell.figure &&
            (selectedCell.figure.color !== cell.figure?.color ||
                !cell.figure)
        ) {
            if (!selectedCell.moveFigure(cell)) {
                return
            }

            selectedCell.moveFigure(cell);

            if(
                cell?.figure?.name === FigureNames.KING &&
                isShahAfterMove(cell)
            ) {
                return cancelMove(selectedCell, cell, figureCopy);
            }

            if(
                cell.figure?.name !== FigureNames.KING &&
                isShahAfterMove()
            ) {
                return cancelMove(selectedCell, cell, figureCopy);
            }

            setSelectedCell(null);
            setCurrentPlayer(
                currentPlayer === Colors.WHITE
                ? Colors.BLACK
                : Colors.WHITE
            );
            setShahStatus(board.checkIsShah());
            setDownedFigure(figureCopy);
            board.clearAvailables();
        } else {
            clickOnFigure(cell);
        }
    };

    return (
        <div className={cl.root}>
            <div className={cl.root_wrapper}>
                <CoordsY rotate={currentPlayer === Colors.BLACK} />
                <div
                    className={
                    currentPlayer === Colors.BLACK
                        ? [cl.root_board, cl.root_rotate].join(' ')
                        : cl.root_board
                    }>
                    {cells}
                </div>
            </div>
            <CoordsX rotate={currentPlayer === Colors.BLACK} />
            {statusMessage &&
                <div
                    className={cl.root_statusWrapper}
                    onClick={() => setStatusMessage('')}
                >
                    <h2 className={cl.root_status}>
                        {statusMessage}
                    </h2>
                </div>}
        </div>
    );
};

export default BoardComponent;