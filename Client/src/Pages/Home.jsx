import React from 'react'
import {Button} from "antd";
import Login from "./Auth/Login.jsx";


const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    let token = localStorage.getItem("accessToken")

    if(!token){
        console.log("Ei tokenia")
        return (
            <>
            <h2>Lkirjaudu sisään </h2>
                <Login></Login>
            </>
        )
    }
    else {
        return (
            <>
                <div>Testi</div>
                <Button onClick={handleLogout}>Log out</Button>
            </>
        )
    }
}

export default Home