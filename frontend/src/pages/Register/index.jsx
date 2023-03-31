import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { URL_AUTH, URL_USER } from '../../utils/API';



function Register() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    // fullname: values.fullname,
                    username: values.username,
                    email: values.email,
                    // phone: values.phone,
                    password: values.password,
                }
            )
        };
        fetch(`${URL_AUTH}register`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                navigate("/", { replace: true })
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='container-form' >
            <Form
                className='form'
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                hasFeedback
                autoComplete="off"
            >
                <Typography.Title>Sign up</Typography.Title>
                {/* <Form.Item
                    label="Fullname"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                >
                    <Input style={{ height: 40 }} placeholder="type your fullname" />
                </Form.Item> */}
                <Form.Item
                    label="Username"
                    name="username"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        style={{ height: 40 }}
                        placeholder="type your username " />
                </Form.Item>

                <Form.Item
                    label="Email "
                    name="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!'
                        },
                        {
                            type: 'email',
                            message: 'Please enter correct email format!'
                        }
                    ]}
                >
                    <Input
                        style={{ height: 40 }}
                        placeholder="type your email" />
                </Form.Item>

                {/* <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your number phone!',
                        },
                    ]}
                >
                    <Input style={{ height: 40 }} placeholder="type your number phone" />
                </Form.Item> */}

                <Form.Item
                    label="Password"
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 5,
                            message: 'Password must be at least 5 characters'

                        }
                    ]}
                >
                    <Input.Password
                        style={{ height: 40 }}
                        placeholder="type your password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        style={{ height: 40 }}
                        placeholder="confirm your password " />
                </Form.Item>


                <Button
                    style={{ background: "#42b883" }}
                    type="primary"
                    htmlType="submit"
                    size='large'
                    shape="round"
                    block>
                    Sign up
                </Button>
                <div
                    style={{ marginTop: "10px" }}>
                    Already have an account ?
                    <a
                        href='/'
                        style={{ color: "#42b883" }}>
                        Log in </a>
                </div>
            </Form>
        </div>
    )
}

export default Register