import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const Header = () => (
  <Layout.Header>
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="dashboard"><Link to="/dashboard">Dashboard</Link></Menu.Item>
    </Menu>
  </Layout.Header>
)

export default Header
