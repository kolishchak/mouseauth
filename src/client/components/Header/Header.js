import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, Input } from 'antd'
import './Header.less'

const Header = () => (
  <Layout.Header className="header">
    <Row type="flex" justify="space-between">
      <Col>
        <Row type="flex">
          <div className="header__item header__item--link">
            <Link to="/">Home</Link>
          </div>
          <div className="header__item header__item--link">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </Row>
      </Col>
      <Col>
        <Row type="flex">
          <div className="header__item header__item--search">
            <Input.Search
              placeholder="Search..."
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
          <div className="header__item header__item--link">
            <Link to="/login">Login</Link>
          </div>
        </Row>
      </Col>
    </Row>
  </Layout.Header>
)

export default Header
