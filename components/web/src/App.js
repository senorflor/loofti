import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'

const App = () => 
  <Router>
    <Header />
    <Switch>
      <Route exact path='/'>
        <Hero />
        <Footer />
      </Route>
      <Route path='/p/'>
        <div>PLAN</div>
      </Route>
      <Route path='/b/'>
        <div>Biz</div>
      </Route>
    </Switch>
  </Router>

export default App
