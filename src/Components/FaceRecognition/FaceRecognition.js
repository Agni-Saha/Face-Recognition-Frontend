import React from 'react'
import './FaceRecognition.css'

/*
https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg
https://cdn.britannica.com/32/188032-131-554FE1D7/Leonardo-DiCaprio-Revolutionary-Road-Sam-Mendes.jpg
*/

export default function FaceRecognition({ imageUrl, box }) {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={imageUrl} id="inputImage"
                    width="500px" height="auto"
                />
                <div className="bounding-box"
                    style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} >
                </div>
            </div>
        </div>
    )
}
