import React from 'react'
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import "./index.css"
function AppSideBar() {
    const navigate = useNavigate()
    const groupItem = [
        // {
        //     type: 'group', // Must have
        //     label: 'Main',
        //     children: [
        //         {
        //             key: "/dashboard",
        //             label: "Dashboard",
        //             icon: <AppstoreOutlined style={{ color: 'pink' }} />
        //         }
        //     ],
        // },
        {
            type: 'group', // Must have
            label: 'Lists',
            children: [
                // {
                //     key: "/inventory",
                //     label: "Inventory",
                //     icon: <ShopOutlined style={{ color: 'pink' }} />
                // },
                // {
                //     key: "/orders",
                //     label: "Orders",
                //     icon: <ShoppingCartOutlined style={{ color: 'pink' }} />
                // },
                {
                    key: "/users",
                    label: "Users",
                    icon: <UserOutlined style={{ color: '#d8f3f0' }} />
                }
            ],
        },
        {
            type: 'group', // Must have
            label: 'My Account',
            children: [
                {
                    key: "/profile",
                    label: "Profile",
                    icon: <ProfileOutlined style={{ color: '#d8f3f0' }} />
                },
                {
                    key: "/logout",
                    label: "Logout",
                    icon: <LogoutOutlined style={{ color: '#d8f3f0' }} />
                }
            ],
        },
    ];
    return (
        <Menu className='AppSideBar'
            onClick={(item) => {
                navigate(item.key)
            }}
            style={{ width: 200, height: "100%" }}
            defaultSelectedKeys={["/profile"]}
            mode="inline"
            items={groupItem}
        />

    )
}

export default AppSideBar