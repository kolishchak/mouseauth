import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../Home'
import Dashboard from '../Dashboard'

const Main = () => (
  <Layout.Content>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Layout.Content>
)

export default Main
