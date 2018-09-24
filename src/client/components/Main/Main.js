import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Home from '../Home'
import Dashboard from '../Dashboard'
import NotFoundPage from '../NotFoundPage'

const Main = () => (
  <Layout.Content>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout.Content>
)

export default Main
