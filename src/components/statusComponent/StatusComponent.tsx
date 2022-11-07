import React from 'react';
import { Colors } from '../../models/Colors';
import cl from './StatusComponent.module.scss';


type StatusComponentProps = {
    timeIsOver: boolean,
    currentPlayer: Colors | null,
};

const StatusComponent: React.FC <StatusComponentProps> = (
    {
        timeIsOver,
        currentPlayer

    }
): JSX.Element => {
    return (
        <>
        {timeIsOver && currentPlayer
				? <h2 className={cl.root}>
					Время вышло. {currentPlayer} проиграли.
					</h2>
				: <h2 className={cl.root}>
					{currentPlayer && `Сейчас ходят ${currentPlayer}`}
					</h2>}
        </>
    );
};

export default StatusComponent;