import React from 'react'

export default function Navigation({ onRouteChange, isSignedIn }) {

    if (isSignedIn) {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                <p className="f3 link dim black underline pa3 mt0 pointer"
                    onClick={() => onRouteChange("signout")}>
                    Sign Out
                </p>
            </nav>
        )
    }
    else {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                <p className="f3 link dim black underline pa3 mt0 pointer"
                    onClick={() => onRouteChange("signin")}>
                    Sign In
                </p>
                <p className="f3 link dim black underline pa3 mt0 pointer"
                    onClick={() => onRouteChange("register")}>
                    Register
                </p>
            </nav>
        )
    }
}