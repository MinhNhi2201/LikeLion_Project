import React from 'react'
import { MessageOutlined, GlobalOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'
import { Badge, Space, Input, Avatar } from 'antd'
import "./index.css"

function AppHeader() {
    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    return (
        <div className='AppHeader'>
            <Search placeholder="search..." onSearch={onSearch} style={{ width: "35%" }} />
            <Space style={{ gap: "1.5rem" }}>
                <GlobalOutlined style={{ fontSize: 24 }} />English
                <Badge count={7} dot>
                    <MessageOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={1}>
                    <BellOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Avatar
                    src={"https://2sao.vietnamnetjsc.vn/images/2022/12/07/13/55/engfa-01.jpg"}

                />
                <SettingOutlined style={{ fontSize: 24 }} />
            </Space>
        </div>
    )
}

export default AppHeader