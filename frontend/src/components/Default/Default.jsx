import { Layout } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import AppHeader from '../AppHeader/AppHeader'
import AppSideBar from '../AppSideBar/AppSideBar'

function Default({ children }) {
    return (
        <Layout className='default' >
            <Sider>
                <AppSideBar />
            </Sider>

            <Layout>
                <Header style={{ background: "white" }}>
                    <AppHeader />
                </Header>
                {children}
            </Layout>
        </Layout>
    )
}

export default Default