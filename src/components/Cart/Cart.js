import React,{Component} from 'react'
import './Cart.css'
const CartUrl='https://miapi4002.herokuapp.com/CartItems?GoogleId='
const CartRemove='https://miapi4002.herokuapp.com/removeItem'
class Cart extends React.Component{
  documentData
  constructor(){
      super()
      this.state={
        Cart:'',
        
      }
  }

  componentDidMount(){
    this.documentData = JSON.parse(localStorage.getItem('document'));
    console.log('anki anki anki',this.documentData)
    var GID=this.documentData.googleId;
    console.log('66666666666666666^^^^^^^^^^^^',GID)
    var CartUrl1=`${CartUrl}${GID}`;
    console.log('it is the url',CartUrl1)
    fetch(CartUrl1,{method:'GET'}).then((res)=>res.json()).then((data)=>{this.setState({Cart:data})})
    var x=0;
     localStorage.setItem('TotalPrice',x)
}


 Product=(x,y)=>{
   var product=x*y;
    var p;
  p=localStorage.getItem('TotalPrice');
  p=Number(p)+Number(product);
  localStorage.setItem('TotalPrice',p)
  console.log('this is private body',Number(p))
   return (product)
   
 }
 TotalPrice=()=>{
   var x=localStorage.getItem('TotalPrice');
   return x;
 }
 RemoveItem=(number)=>{
   
   
   
   const myDataObject ={ _id: number}
  
  fetch(CartRemove,
    {
        method:'DELETE',
        headers:{
            
            'Content-Type':'application/json'
        },
        body: JSON.stringify(myDataObject)
        
    })
    console.log(this.state.ID,'eijiijai')
    
    // console.log(`${CartRemove}${mobilename}&GoogleId=${GID}`)
  //  console.log('values in cart cart cart cart cart cart cart',this.state.Cart.Name)
  this.documentData = JSON.parse(localStorage.getItem('document'));
  console.log('anki anki anki',this.documentData)
  var GID=this.documentData.googleId;
  console.log('66666666666666666^^^^^^^^^^^^',GID)
  var CartUrl1=`${CartUrl}${GID}`;
  console.log('it is the url',CartUrl1)
  fetch(CartUrl1,{method:'GET'}).then((res)=>res.json()).then((data)=>{this.setState({Cart:data})})
  var x=0;
  localStorage.setItem('TotalPrice',x)

 }
renderCartItems=(cart)=>{
    if(cart){
      var count=0;
      return (
        cart.map((item)=>{
       
          return(

            <React.Fragment>
                 
                <div className='M-Cart col-md-8 col-lg-8 col-sm-8 col-xs-12'> 

                    <div className='Cart-bx'>
                    <img src={item.Image} className='Cart-im'/>
                      <div className='P-Name'>
                        <b> {item.Name}</b>  
                      </div>
                    </div>
                    <div className='Cart-bx ' style={{paddingTop:'40px'}}>
                            {item.Model}
                    </div>
                    <div className=' Cart-bx'  style={{paddingTop:'40px'}}>
                        &#8377;{this.Product(item.Price,item.Quantity)}
                    </div>
                    <div className='Cart-bx col-md-3'  style={{paddingTop:'40px'}}>
                      {item.Quantity}                 <button type="button" class="close" data-dismiss="modal"  onClick={()=>{this.RemoveItem(item._id)}}><span className="glyphicon glyphicon-trash remove"></span></button>
                    </div>
                
                  {/* <div className='Cart-bx'>
                    <img src={item.Image} className='Cart-im'/> 
                    <div className='P-Name'>
                        {item.Name}
                      </div>
                  </div>
                  <div className='Cart-bx'>
                    <span style={{paddingTop:'40px'}}></span> {item.Model}
                  </div> */}
           
                </div>
   
           
            </React.Fragment>
          )
        })
      )
    }

}
  render(){
     var x=localStorage.getItem('TotalPrice')
    console.log('spider hulk',x)
      return(
          <React.Fragment>
              <div className='container'>
               
                <div className='row'>
                <div className='Cart-H'>Your Shopping Cart:</div>
                  <div className='  col-md-8 col-lg-8 col-sm-8 col-xs-12'>
                    <div className='M1'>
                       <div className='row'>
                         <div className='col-md-3 col-sm-3 col-xs-3'>
                             Product
                         </div>
                         <div className='col-md-3 col-sm-3 col-xs-3'>
                              Model
                           </div>
                           <div className='col-md-3 col-sm-3 col-xs-3'>
                             Total Price
                           </div>
                           <div className='col-md-3 col-sm-3 col-xs-3'>
                              Quantity
                           </div>
                      </div>
                      
                    </div>
                  
                     {this.renderCartItems(this.state.Cart)}
                   
                  </div>
                  <div className=' col-md-4 col-lg-4 col-sm-4 col-xs-12'>
                      <div className='S-Cart'>
                        <div className='wel' style={{width:'80%',marginTop:'5px'}}>
                        <h3>TotalPrice:   &#8377;{this.TotalPrice()}/-</h3>
                        </div>
                      
                         <button className='btn btn-success'>Proceed to checkout</button>
                      </div>
                  </div>
              </div>
                
                
              </div>
      

          </React.Fragment>
      )
  }
}
export default Cart