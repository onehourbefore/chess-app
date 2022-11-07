import React from 'react';
import { Colors } from '../../models/Colors';
import { Figure } from '../../models/Figure';
import cl from './DownedFigures.module.scss';


type DownedFiguresProps = {
    downedFigure: Figure | null,
};

const DownedFigures: React.FC <DownedFiguresProps> = (
    { downedFigure }
): JSX.Element => {
    const [downedWhite, setDownedWhite] = React.useState<Figure[] | []>([]);
    const [downedBlack, setDownedBlack] = React.useState<Figure[] | []>([]);

    function addDowned() {
        if(downedFigure?.color === Colors.WHITE) {
            setDownedWhite(prev => [downedFigure, ...prev]);
        }
        if(downedFigure?.color === Colors.BLACK) {
            setDownedBlack(prev => [downedFigure, ...prev]);
        }
    }

    React.useEffect(() => {
        addDowned();
    }, [downedFigure]);

    return (
        <div className={cl.root}>
            <h2 className={cl.root_title}>
                Потерянные фигуры
            </h2>
            <div className={cl.root_figures}>
                <div className={cl.root_figures_title}>
                    Белые:<br />
                    {downedWhite.map((figure, i)=> 
                        <div
                            key={figure.id + i}
                            className={cl.root_figures_figure}
                        >
                            <img
                                src={figure.logo}
                                alt='Белая фигура'
                            />
                        </div>)}
                </div>
            </div>
            <div className={cl.root_figures}>
                <div className={cl.root_figures_title}>
                    Черные:<br />
                    {downedBlack.map((figure, i) => 
                        <div
                            key={figure.id + i}
                            className={cl.root_figures_figure}
                        >
                            <img
                                src={figure.logo}
                                alt='Черная фигура'
                            />
                        </div>)}
                </div>
            </div>
        </div>
    );
};

export default DownedFigures;