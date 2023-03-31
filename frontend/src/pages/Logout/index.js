import { Button, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { URL_AUTH } from '../../utils/API';
import { headers } from '../../utils/API/headers';
import "./index.css"


function Logout() {
    const navigate = useNavigate()
    const removeItem = (item) => {
        localStorage.removeItem(item);
    }

    const handleLogout = () => {
        fetch(`${URL_AUTH}logout`,
            {
                method: "post",
                headers
            })
            .then(response => response.json())
            .then(data => {
                removeItem("accessToken");
                removeItem("userId");
                navigate("/", { replace: true })
            })
    }
    return (
        <div className='logout'>
            <div className='logout-form'>
                <h1 style={{ margin: "1rem" }}>Are you sure want to log out ?</h1>
                <Space>
                    <Button >Cancel</Button>
                    <Button
                        onClick={handleLogout}
                        style={{ background: "#1fc4b1", color: "#d8f3f0" }} >Log out</Button>
                </Space>
            </div>
        </div>
    )
}

export default Logout