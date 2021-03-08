import React from 'react'
import {BrowserRouter,Link,Route} from 'react-router-dom'
import Home from '../Home/Home'
import Footer from '../Home/footer'
import Buying from '../Buying/Buying'
import Navbar from '../Home/NavBar/NavBar'
import Cart from '../Cart/Cart'
const Routing = () => {
    return (
     
            <BrowserRouter>
                    <Navbar/>
                    <Route exact path="/" component={Home}/>
                    <Route  path='/Buy/:name' component={Buying}/>
                    <Route path='/Cart' component={Cart}/>
                    <Footer/>
            </BrowserRouter>
      
    )
}

export default Routing
