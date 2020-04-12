import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Plan from './components/Plan'

const App = () => 
  <Router>
    <Header />
    <Switch>
      <Route exact path='/'>
        <Hero />
        <Footer />
      </Route>
      <Route exact path='/about/team'>
        <div>ABOUT</div>
      </Route>
      <Route exact path='/about/app'>
        <div>ABOUT APP</div>
      </Route>
      <Route path='/p/'>
        <Plan />
      </Route>
      <Route path='/b/'>
        <div>Biz</div>
      </Route>
    </Switch>
  </Router>

export default App
