import React from 'react'
import Tilt from 'react-tilt'
import "./Logo.css"
import MyLogo from './agni.S( )-logo.png'

export default function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 100 }} style={{ height: 140, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img className="Logo-img" style={{ paddingTop: "5px"}}
                        src={MyLogo} alt="logo" />
                </div>
            </Tilt>
        </div>
    )
}
