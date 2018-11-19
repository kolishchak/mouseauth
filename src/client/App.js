import React from 'react'
import { Layout } from 'antd'
import Header from './components/Header'
import Main from './components/Main'

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header />
    <Main />
  </Layout>
)

export default App
