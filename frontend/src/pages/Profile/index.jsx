import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Card, Input, message, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import './index.css'
import { URL_USER } from '../../utils/API'

function Profile() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [datas, setDatas] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editing, setEditing] = useState(null)
    const userId = localStorage.getItem("userId")
    const headers = {
        "Content-Type": 'application/json',
        "token": `Bearer ${localStorage.getItem("accessToken")}`
    }

    ////////// getData //////////
    const handleGetDatas = () => {
        fetch(`${URL_USER}${userId}`,
            {
                method: "get",
                headers
            })
            .then(res => res.json())
            .then(data => {
                setDatas(data);
            });
    }
    useEffect(() => {
        handleGetDatas();
    }, []);

    ////////// Delete data //////////
    const removeItem = (item) => {
        localStorage.removeItem(item);
    }
    const handleDelete = () => {
        Modal.confirm({
            title: "Are you sure, You want to delete your account ?",
            onOk: () => {
                fetch(`${URL_USER}${userId}/delete`,
                    {
                        method: "delete",
                        headers
                    })
                    .then(response => response.json())
                    .then(data => {

                        removeItem("accessToken");
                        removeItem("userId");
                        navigate("/", { replace: true })
                    })
            }
        })
    }

    ////////// Edit data //////////
    const handleisEdit = () => {
        setIsEditing(true);
        setEditing({ ...datas });
    }
    const resetEditing = () => {
        setIsEditing(false);
        setEditing(null);
    }
    const handleEdit = (editing) => {
        const headers = {
            "Content-Type": 'application/json',
            "token": `Bearer ${localStorage.getItem("accessToken")}`
        }
        const requestOptions = {
            method: 'PUT',
            headers,
            body: JSON.stringify(
                {
                    username: editing.username,
                    email: editing.email,
                }
            )
        };
        fetch(`${URL_USER}${userId}/update`, requestOptions
        )
            .then(response => response.json())
            .then(data => {
                const newDatas = [...data];
                setDatas(newDatas)
                messageApi.open({
                    type: 'success',
                    content: 'Success',
                });
            })
        resetEditing()
    }

    ////////// get Role //////////
    let role;
    if (!datas.isAdmin) {
        role = "User"
    }
    else {
        role = "Admin"
    }
    return (
        <>
            {contextHolder}
            <div className='container-profile'>
                <Card className="container-detail"
                    actions={[
                        <DeleteOutlined key="setting"
                            style={{ color: "red" }}
                            onClick={handleDelete} />,
                        <EditOutlined key="edit"
                            style={{ color: "#42b883" }}
                            onClick={handleisEdit} />,

                    ]}>
                    <Avatar src="https://2sao.vietnamnetjsc.vn/images/2022/12/07/13/55/engfa-01.jpg"
                        size={100}
                    >
                    </Avatar>
                    <h1 style={{ fontSize: "30px" }}>{datas.username
                    } </h1>
                    <Card className="card-profile">
                        <h3>Email: </h3>
                        <p>{datas.email
                        } </p>
                    </Card>
                    <Card className="card-profile">
                        <h3>Role: </h3>
                        <p>{role}</p>
                    </Card>
                </Card>
            </div>

            <Modal
                title="Edit"
                open={isEditing}
                onCancel={() => {
                    resetEditing()
                }}
                okText="Save"
                onOk={() => {
                    handleEdit(editing);
                }}>
                <h4 style={{
                    marginTop: ".5rem"
                }}>Username</h4>
                <Input value={editing?.username}
                    onChange={(e) => {
                        setEditing((pre) => {
                            return { ...pre, username: e.target.value }
                        })
                    }} />
            </Modal>
        </>
    )
}

export default Profile