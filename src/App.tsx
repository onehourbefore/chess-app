import React from 'react';

import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Figure } from './models/Figure';

import Buttons from './components/buttons/Buttons';
import StatusComponent from './components/statusComponent/StatusComponent';
import TimerComponent from './components/TimerComponent/TimerComponent';
import BoardComponent from './components/boardComponent/BoardComponent';
import DownedFigures from './components/downedFigures/DownedFigures';

import cl from './App.module.scss';


const App = (): JSX.Element => {
	const [board, setBoard] = React.useState<Board>(new Board());
	const [currentPlayer, setCurrentPlayer] = React.useState<Colors | null>(null);
	const [downedFigure, setDownedFigure] = React.useState<Figure | null>(null);
	const [timeIsOver, setTimeIsOver] = React.useState<boolean>(false);

	React.useEffect(() => {
		setBoard(new Board().initCells());
		setCurrentPlayer(null);
		setTimeIsOver(false);
	}, []);

	function restart() {
		setBoard(new Board().initCells());
		setCurrentPlayer(null);
		setTimeIsOver(false);
		setDownedFigure(null);
	}

	function startGame() {
		setCurrentPlayer(Colors.WHITE);
	}

  	return (
    	<div className={cl.root}>
			<Buttons
				restart={restart}
				startGame={startGame} />
			<StatusComponent
				timeIsOver={timeIsOver}
				currentPlayer={currentPlayer} />
      		<div className={cl.root_boardWrapper}>
				{currentPlayer &&
					<TimerComponent
						currentPlayer={currentPlayer}
						setTimeIsOver={setTimeIsOver}
						timeIsOver={timeIsOver} />}
				<div>
					<BoardComponent
						board={board}
						currentPlayer={currentPlayer}
						setCurrentPlayer={setCurrentPlayer}
						setDownedFigure={setDownedFigure} />
					{timeIsOver && currentPlayer &&
						<div className={cl.root_hiddenBoard}></div>}
				</div>
				{currentPlayer &&
					<DownedFigures
						downedFigure={downedFigure} />}
			</div>
    	</div>
  	);
};

export default App;
