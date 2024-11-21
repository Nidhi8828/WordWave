import React from "react";
import gifImage from "./IrM.gif"; 
import Hero from './Hero';
import Explore from './Explore';

function Image() {
    const image = {
        backgroundImage: `url(${gifImage})`, 
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'100%'
    };

    return <div style={image}>
            <Hero />
            <Explore />
    </div>;
}

export default Image;
