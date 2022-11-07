import React from 'react';
import { Cell } from '../../models/Cell';
import { Colors } from '../../models/Colors';
import cl from './CellComponent.module.scss';


interface CellComponentProps {
    cell: Cell;
    handleClick: (cell: Cell) => void;
    clicked: boolean;
    rotateCell: boolean;
};

const CellComponent: React.FC <CellComponentProps> = (
    { 
        cell,
        handleClick,
        clicked,
        rotateCell,
    }
): JSX.Element => {
    const classesBeforeClick = cell.background === Colors.WHITE
        ? [cl.root, cl.root_white].join(' ')
        : [cl.root, cl.root_black].join(' ');
    const classesAfterClick = cell.background === Colors.WHITE
        ? [cl.root, cl.root_white, cl.root_clicked].join(' ')
        : [cl.root, cl.root_black, cl.root_clicked].join(' ');
    const underAttack = [cl.root, cl.root_underAttack].join(' ');

    return (
        <div
            className={
                cell.available && cell.figure
                ? underAttack
                : (clicked
                    ? classesAfterClick
                    : classesBeforeClick)
            }
            onClick={() => handleClick(cell)}
            style={{ transform: rotateCell ? 'rotate(180deg)' : '' }}
        >
            {cell.available && !cell.figure &&
                <div className={cl.root_highlight}></div>}
            {cell.figure?.logo &&
                <img
                    className={cl.root_logo}
                    src={cell.figure?.logo}
                    alt="Фигура"
                />}
        </div>
    );
};

export default CellComponent;