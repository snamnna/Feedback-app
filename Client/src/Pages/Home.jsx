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

    //if(!token){
    //    console.log("Ei tokenia")
        //TODO:Navigointi vai login formi tähän suoraan jos ei ole tokenia?
    //}
    //else {
        return (
            <>
                <div>
                    <h1>Lisätään möyhemmin</h1>
                </div>
                <Button onClick={handleLogout}>Log out</Button>
            </>
        )
    //}
}

export default Home