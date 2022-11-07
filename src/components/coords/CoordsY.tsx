import React from 'react';
import cl from './Coords.module.scss';


type CoordsYProps = {
    rotate: boolean;
};

type CoordsYType = ['1', '2', '3', '4', '5', '6', '7', '8'];

const CoordsY: React.FC <CoordsYProps> = (
    { rotate }
): JSX.Element => {
    const coordsY: CoordsYType = ['1', '2', '3', '4', '5', '6', '7', '8'];
    return (
        <div className={cl.root_coordsY}>
            {(rotate ? coordsY : coordsY.reverse())
                .map((coord) => 
                <div
                    key={coord}
                    className={cl.root_coordsY_item}
                    >{coord}
                </div>
            )}
        </div>
    );
};

export default CoordsY;