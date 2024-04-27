import React from 'react';
import './imageBlock.scss';

const ImageBlock = ({ imageBlock }) => {
    return (
        <div className="image-blocks">
            <img  src={"../upload/"+imageBlock.img} alt=""/>
        </div>
    );
}

export default ImageBlock;