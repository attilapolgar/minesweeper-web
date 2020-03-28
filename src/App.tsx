import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Login from './modules/authentication/pages/Login'
import Header from './modules/layout/components/Header'

function App(): ReactElement {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

function Home(): ReactElement {
  return <h2>Home</h2>
}
