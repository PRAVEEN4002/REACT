import React from 'react'
// import Footer from '../footer'
import Products from './Products'
import {Link} from 'react-router-dom'
import './Products.css'
const ProductsDisplay = (props) => {
    const renderProducts=({mobiledata})=>{
       
        if(mobiledata){
            return (
                mobiledata.map((item)=>{
                    console.log(item.name)
                    return(
                        <div className="maincard  " >
                                <div className="card1">
                                      <img src={item.Image} alt="Max"  className="Img"/>
                                    <div class="TextContent">
                                        <div className="Name">{item.Name}</div>
                                        <Link to={`/Buy/${item.Name}`}><div className="btn">Buy Now</div></Link>  
                                          <div className="btn">Add to Cart</div>
                                    </div>        
                                </div>
                        </div>
                    )
                })
            )
            
        }
        else{
            return(
                <div className='container' style={{textAlign:'center',alignContent:'center'}}>
                    <img src='/images/loading.gif' width='160px' height='160px'/>
                    <h1>Loading</h1>
                </div>
            )
           
        }
    }
    return (
        <React.Fragment>
           
                <div className='row '>

                {renderProducts(props)}
            
                </div>

           
         
        
        </React.Fragment>
    )
}

export default ProductsDisplay
