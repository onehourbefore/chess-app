import React from 'react';
import cl from './Coords.module.scss';


type CoordsXProps = {
    rotate: boolean
};

type CoordsXType = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const CoordsX: React.FC <CoordsXProps> = (
    { rotate }
): JSX.Element => {
    const coordsX: CoordsXType = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    return (
        <div className={cl.root_coordsX}>
            {(rotate ? coordsX.reverse() : coordsX)
                .map ((item, i) => 
                <div
                    key={i}
                    className={cl.root_coordsX_item}
                    >{item}
                </div>
            )}
        </div>
    );
};

export default CoordsX;