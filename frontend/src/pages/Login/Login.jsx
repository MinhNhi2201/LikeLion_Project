import React, { useState } from 'react'
import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginSuccess } from "../../redux/actions/auth"
import { URL_AUTH } from '../../utils/API';
import './index.css'
function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [isAuth, setIsAuth] = useState(false)
    const { accessToken } = useSelector(state => state.auth)
    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    username: values.username,
                    password: values.password,
                }
            )
        };
        dispatch(login());
        try {
            fetch(`${URL_AUTH}login`, requestOptions)
                .then(response => response.json())
                .then(data => {

                    dispatch(loginSuccess({ accessToken: data.accessToken, userId: data._id }));
                    if (Object.keys(data).length !== 0 && data !== "Incorrect password") {
                        navigate("/profile")
                    }
                    else {
                        navigate("/")
                        messageApi.open({
                            type: 'error',
                            content: 'Login error',
                        });
                    }
                }
                )
        }
        catch (error) {
            console.log(error)
            messageApi.open({
                type: 'error',
                content: 'Login error',
            });
        }

    };


    return (
        <div className='container-form'>

            {contextHolder}
            <Form className='form'
                name="basic"

                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Typography.Title>Welcome Back!</Typography.Title>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input style={{ height: 40 }} placeholder="type your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password
                        style={{ height: 40 }}
                        placeholder="type your password" />
                </Form.Item>

                <Form.Item >
                    <Button
                        style={{ background: "#42b883" }}
                        type="primary"
                        htmlType="submit"
                        size='large'
                        shape="round"
                        block>
                        Login
                    </Button>
                </Form.Item>
                <Form.Item>
                    Don't have an account ?
                    <a href='/register'
                        style={{ color: "#42b883" }}>
                        Sign up</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login