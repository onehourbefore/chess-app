import React from 'react';
import { Colors } from '../../models/Colors';
import cl from './TimerComponent.module.scss';


type TimerComponentProps = {
    currentPlayer: Colors,
    setTimeIsOver: (isOver: boolean) => void,
    timeIsOver: boolean,
}

type setIntervalType = ReturnType<typeof setInterval>;

const TimerComponent: React.FC <TimerComponentProps> = (
    {
        currentPlayer,
        setTimeIsOver,
        timeIsOver,
    }
): JSX.Element => {
    const [timeWhite, setTimeWhite] = React.useState<number>(600);
    const [timeBlack, setTimeBlack] = React.useState<number>(600);
    const timer = React.useRef<null | setIntervalType>(null);

    React.useEffect(() => {
        startTimer();
    }, [currentPlayer, timeIsOver]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        if(timeIsOver || !currentPlayer) return;

        const callback = () => {
            return currentPlayer === Colors.WHITE
            ? decrementWhiteTimer()
            : decrementBlackTimer();
        }
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setTimeBlack(decrementCallback);
    }

    function decrementWhiteTimer() {
        setTimeWhite(decrementCallback);
    }

    function decrementCallback (prev: number) {
        if(prev === 0) {
            setTimeIsOver(true);
            setTimeBlack(600);
            setTimeWhite(600);
            return prev;
        }
        return prev - 1;
    }

    return (
        <div className={cl.root}>
            <div>
                <h2 className={cl.root_title}>
                    Оставшееся<br />время
                </h2>
                <div className={cl.root_time}>
                    Белые = {timeWhite} c.
                </div>
                <div className={cl.root_time}>
                    Черные = {timeBlack} c.
                </div>
            </div>
        </div>
    );
};

export default TimerComponent;