import React, {useState} from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index element={<Register />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Route>
    )
)

function App({routes}) {

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;