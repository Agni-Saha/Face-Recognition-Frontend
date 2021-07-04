import "./App.css";
import ParticleBackground from "./ParticleBackground";
import React, { Component } from "react";

import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";


const initialState = {
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = initialState

        this.onInputChange = this.onInputChange.bind(this)
        this.onButtonSubmit = this.onButtonSubmit.bind(this)
        this.loadUser = this.loadUser.bind(this)
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById("inputImage")
        const width = Number(image.width)
        const height = Number(image.height)
        console.log(width, height)
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })
    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input })

        //use this instead of clarifai.face_detect_model 
        //'a403429f2ddf4b49b307e318f00e528b'
        //if not working
        fetch("https://face-recognition-backend-3375.herokuapp.com/imageURL", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch("https://face-recognition-backend-3375.herokuapp.com/image", {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                        .catch(console.log("error while fetching image"))
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(error => console.log(error));
    }

    onRouteChange = (routeVal) => {
        if (routeVal === "signout") {
            this.setState(initialState)
        }
        else if (routeVal === "home") {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: routeVal })
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state
        return (
            <div className="App">

                <ParticleBackground style={{ height: "98vh", top: 0 }} />

                <div id="center_all">
                    <div className="center_all">
                        <Navigation isSignedIn={isSignedIn}
                            onRouteChange={this.onRouteChange} />
                        {
                            (route === "home")
                                ?
                                <div>
                                    <Logo />
                                    <Rank
                                        name={this.state.user.name}
                                        entries={this.state.user.entries}
                                    />
                                    <ImageLinkForm
                                        onInputChange={this.onInputChange}
                                        onButtonSubmit={this.onButtonSubmit}
                                    />
                                    <FaceRecognition box={box} imageUrl={imageUrl} />
                                </div>
                                :
                                (
                                    route === "register"
                                        ?
                                        <Register
                                            onRouteChange={this.onRouteChange}
                                            loadUser={this.loadUser}
                                        />
                                        :
                                        <SignIn
                                            onRouteChange={this.onRouteChange}
                                            loadUser={this.loadUser}
                                        />
                                )

                        }

                    </div>
                </div>

            </div>
        );
    }
}
export default App;