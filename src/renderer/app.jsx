import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from './Rooms';
import Room from './Room';
import firebase from "firebase/firebase-browser";

// import {MyComponent} from "./MyComponent";

// render( <MyComponent>hello</MyComponent>,
//     document.getElementById("app"));

const appRouting = (
    <Router history={hashHistory}>
        <Route path="/">
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="rooms" component={Rooms}>
                <Route path=":roomId" component={Room} />
            </Route>
        </Route>
    </Router>
);

if (!location.hash.length) {
    location.hash = "#/login";
}

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBiTuhCyKzugGopXoa58oWxrKuwYxOXij8",
    authDomain: "electron-chat-95782.firebaseapp.com",
    databaseURL: "https://electron-chat-95782.firebaseio.com",
    projectId: "electron-chat-95782",
    storageBucket: "electron-chat-95782.appspot.com",
    messagingSenderId: "812336582294"
  }
let x = firebase.initializeApp(config);
console.log(x);
render(appRouting, document.getElementById("app"));