import React,{Component}from 'react'
// import Power from '../../../public/images/Power.jpg'
// import Speaker from '../../../public/images/Mi Speaker.jpg'
// import A9 from '../../../public/images/Redmi 9A.jpg'
// import NeckBand from '../../../public/images/Mi_neckBand.jpg'
// import Prime from '../../../public/images/Redmi 9 Prime.jpg'

import NavBar from '../NavBar/NavBar'

import Products from '../Prouducts/Products'
import  './carousel.css'

class Carousel extends React.Component{
    render(){
        
        return(
        <React.Fragment>
           
               
                  <div id="myCarousel" class="carousel slide" data-ride="carousel">
                        {/* <!-- Indicators --> */}
                   
                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                            <li data-target="#myCarousel" data-slide-to="4"></li>

                        </ol>

                        {/* <!-- Wrapper for slides --> */}
                        <div class="carousel-inner">
                           

                            <div class="item ">
                            <img src='/images/Power.jpg' alt="Redmi 9 Power"/>
                            </div>
                            <div className='item'>
                                <img src='/images/Redmi 9 Prime.jpg'></img>
                            </div>
                            <div class="item active">
                            <img src='images/Mi Speaker.jpg'  alt="Redmi 9A"/>
                            </div>
                            <div class="item ">
                            <img src='/images/Mi_neckBand.jpg' width="100%" alt="MI Bletooth speaker"/>
                            </div>
                        </div>

                        {/* <!-- Left and right controls --> */}
                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                   
                   
                 
                 
        </React.Fragment>
        )
    }

}
export default Carousel