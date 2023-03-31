import { Button, Space, Table, Typography, Modal, message } from 'antd'
import { FrownOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { URL_USER } from '../../utils/API/index'
import "./index.css"
function Customers() {
    const bottom = 'bottomCenter'
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [datas, setDatas] = useState([])
    const [currentData, setCurrentData] = useState([])

    const headers = {
        "Content-Type": 'application/json',
        "token": `Bearer ${localStorage.getItem("accessToken")}`
    }
    ////////// get Data //////////
    const handleGetDatas = () => {
        setLoading(true)
        fetch(`${URL_USER}`, {
            method: "get",
            headers
        })
            .then(res => res.json())
            .then(data => {
                setDatas(data.filter(user => !user.isAdmin));
                setLoading(false);
            });
    }
    useEffect(() => {
        handleGetDatas();
    }, []);

    //////////  get current data  ////////// 
    const userId = localStorage.getItem("userId")

    const handleGetCurentDatas = () => {
        fetch(`${URL_USER}${userId}`,
            {
                method: "get",
                headers
            })
            .then(res => res.json())
            .then(data => {
                setCurrentData(data)
            });
    }
    useEffect(() => {
        handleGetCurentDatas();
    }, []);

    ////////// handle delete //////////
    const handleDelete = (record) => {
        const headers = {
            "Content-Type": 'application/json',
            "token": `Bearer ${localStorage.getItem("accessToken")}`
        }
        const userID = record._id;
        const username = record.username;
        Modal.confirm({
            title: "Are you sure, You want to delete this user ?",
            onOk: () => {
                fetch(`${URL_USER}${userID}/delete`,
                    {
                        method: "delete",
                        headers
                    })
                    .then(response => response.json())
                    .then(data => {
                        setDatas(datas.filter((data) => data._id !== userID))
                        messageApi.open({
                            type: 'success',
                            content: `${username} have been deleted`,
                        });

                    })
            }
        })
    };
    if (!currentData.isAdmin) {
        return (
            <div className="container-data1">
                <FrownOutlined style={{ color: "rgb(32,46,71,0.5)", fontSize: "7rem" }} />
                Sorry, You are not allowed to view this list !
            </div>)
    } else {
        return (
            <>
                {contextHolder}
                <div className='container-data2'>
                    <Typography.Title level={4}>Users</Typography.Title>
                    {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} */}
                    <Table
                        style={{ height: "500px" }}
                        loading={loading}
                        columns={
                            [
                                // {
                                //     title: "FullName",
                                //     dataIndex: "fullname",
                                //     key: 'fullname'
                                // },
                                {
                                    title: "UserName",
                                    dataIndex: "username",
                                    key: 'username'
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: 'email'
                                },
                                // {
                                //     title: "Phone",
                                //     dataIndex: "phone",
                                //     key: 'phone'
                                // },
                                {
                                    title: 'Action',
                                    key: 'x',
                                    render: (record) => {
                                        return (
                                            <Space>
                                                <Button
                                                    danger
                                                    onClick={() => { handleDelete(record) }}>Delete</Button>

                                            </Space>
                                        )
                                    }
                                },
                            ]
                        }
                        dataSource={datas}
                        pagination={{
                            pageSize: 7,
                            position: [bottom],
                        }}
                        tableLayout="fixed"
                    >
                    </Table >
                </div>
            </>

        )
    }
};

export default Customers