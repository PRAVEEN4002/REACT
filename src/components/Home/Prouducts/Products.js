import React,{Component} from 'react'
// import Footer from '../footer'
import ProductDisplay from './ProductsDisplay'
import './Products.css'
const url='https://miapi4002.herokuapp.com/mobiles'
class Products extends React.Component{
    constructor(){
        super()
        this.state={
            products:''
        }
    }
    componentDidMount(){
        
        
        fetch(url,{method:'GET'}).then((res)=>res.json()).then((data)=>{this.setState({products:data})})
    }
    
    
    render(){
     
     
        return(
           <React.Fragment>
              
                    <div className='example'>
                         OUR POPULAR PRODUCTS
                    </div>
                    <ProductDisplay mobiledata={this.state.products}/>
                      
                  
                   
            </React.Fragment>
        )
    }
}
export default Products