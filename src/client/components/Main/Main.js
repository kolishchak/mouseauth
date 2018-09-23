import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import Dashboard from '../Dashboard'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </main>
)

export default Main
