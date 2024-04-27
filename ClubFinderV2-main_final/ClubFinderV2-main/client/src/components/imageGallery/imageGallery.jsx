import React from 'react';
import ImageBlock from '../imageBlock/ImageBlock';
import "./imageGallery.scss"

import { useLocation, Link } from "react-router-dom";
import { useQuery, userQueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";


const ImageGallery = ({clubId}) => {
    

    const { isLoading, error, data } = useQuery(["images", clubId], () =>
        makeRequest.get(`/images/${clubId}`).then((res) => {
            return res.data;
        })
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div> Error: {error.message}</div>;

    console.log(data.img);

    return (
        <div className="image-gallery-container">
            {data.map((imageBlock) => (
                <div key={imageBlock.id} className="image-gallery">
                    <ImageBlock imageBlock={imageBlock} />
                </div>
            ))}
        </div>
    );
}

export default ImageGallery;
