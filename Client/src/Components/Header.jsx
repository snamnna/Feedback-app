
import { Menu } from 'antd';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';


const Header = () => {
    const [current, setCurrent] = useState('h');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>


            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="h" >
                    <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="r" >
                    <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="l">
                    <Link to="/login">Login</Link>
                </Menu.Item>
            </Menu>
            <Outlet/>
        </>

    )
};
export default Header;