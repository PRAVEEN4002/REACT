import React,{Component} from 'react'
import './Buying.css'
import {Link} from 'react-router-dom'
const url='https://miapi4002.herokuapp.com/mobiles'
const iurl='https://miapi4002.herokuapp.com/images'
const CartUrl='https://miapi4002.herokuapp.com/add'
class Buying extends React.Component{
    documentData
    constructor(props){
        super(props)
        this.state={
            Product:'',
            Image:'',
            name:'Img1',
            Quantity:'1',
            Model:'',
            Color:'Color1',
            Price:'Model1',
            MobileName:'',
            MobileModel:'',
            MobliePrice:'',
            MobileImage:'',
            MobileColor:'',
            MobileQuantity:'1',
          
            Cart:{
             UserName:'',
            GoogleId:'',
            Name:'',
            Model:'',
            Color:'grenenojo',
            Price:'',
            Quantity:'',
            Image:''
        
         },
         
        }
    }


    componentDidMount(){
        this.documentData = JSON.parse(localStorage.getItem('document'));
        console.log('anki anki anki anki',this.documentData)
        var id=this.props.match.params.name
        sessionStorage.setItem('ID',id)

        fetch(`${url}?name=${id}`,{method:'GET'}).then((res)=>res.json()).then((data)=>{this.setState({Product:data})});
        fetch(`${iurl}?name=${id}`,{method:'GET'}).then((res)=>res.json()).then((data)=>{this.setState({Image:data})});

        this.setState({MobileName:id})
        
     
        // this.setState({Img:this.state.Product.Color[0].Img1})
        }

    handleQt=(data,name)=>{

                console.log("it here mr mr mr mr mrmrmrmrmrmrmrmrm",data,name)
                const value=Number(data)
                var x=Number(data)
                var Qt;
            if(name=='add'){
                this.setState({Quantity:value+1})
                x=value+1
            }
            else{
                if(value>=2){
                    this.setState({Quantity:value-1})
                    x=value-1
                }
         }
        var GID=this.documentData.googleId;                 
        this.setState({Cart:{UserName:this.documentData.name,GoogleId:GID,Name:this.props.match.params.name,Model:this.state.MobileModel,Color:this.state.MobileColor,Price:this.state.MobilePrice,Image:this.state.MobileImage,Quantity:x}})


}
    renderImages=(data,name)=>{

        //    return(
        //        <div>
        //       {data[0].Img1}
        //        </div>
        //
           if(data){
                if(name=='Img1'){
                        return data.map((item)=>{
                        return(
                            <div>
                            <img className='im-image' src={item.Img1}/>
                            </div>

                        )
                    })
                }
                else if(name=='Img2'){
                    return data.map((item)=>{
                        return(
                            <div>
                            <img   className='im-image' src={item.Img2}/>
                            </div>

                        )
                    })
                }
                else if(name=='Img3'){
                    return data.map((item)=>{
                        return(
                            <div>
                            <img  className='im-image' src={item.Img3}/>
                            </div>

                        )
                    })
                }
                else if(name=="Img4"){
                    return data.map((item)=>{
                        return(
                            <div>
                            <img className='im-image' src={item.Img4}/>
                            </div>

                        )
                    })
                }

            }

}
    handleImg=(color,value,mobileimage,mobilecolor)=>{
         this.setState({name:color}) //for setting and updating images
         this.setState({Color:value}) // for setting and updating name of the color that is text
         this.setState({MobileImage:mobileimage}) //storing data to add to cart
         this.setState({MobileColor:mobilecolor});
     var Qt=this.state.Quantity;
     var UN=this.documentData.name;
    var GID=this.documentData.googleId;  
    this.setState({Cart:{UserName:UN,GoogleId:GID,Name:this.state.MobileName,Model:this.state.MobileModel,Color:mobilecolor,Price:this.state.MobilePrice,Image:mobileimage,Quantity:Qt}})
        
     
    }
    //this function handsles price and model- stores properties and values of the model/storage and price
    handleSt=(storage,price,mobileprice)=>{  
     
           this.setState({MobileModel:storage}) // storing type of model to add to cart
            this.setState({Model:storage}) //storing property name of model for checking and displaying the model in the disply
            this.setState({Price:price})   //storing property of Price for checking and displaying the Price in the display
            this.setState({MobliePrice:mobileprice}) // storing the price of the model to add to cart
    
    var Qt=this.state.Quantity;
    var UN=this.documentData.name;
    var GID=this.documentData.googleId;  
  this.setState({Cart:{UserName:UN,GoogleId:GID,Name:this.state.MobileName,Model:storage,Color:this.state.MobileColor,Price:mobileprice,Image:this.state.MobileImage,Quantity:Qt}})
            
    }
    handleSubmit=(MobileName,MobileColor,MobileModel,MobilePrice,MobileImage,MobileQuantity)=>{
        if(this.state.GoogleId==''){
            alert("please login to continue");
        }
        fetch(CartUrl,
            {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.Cart)
            }).then(this.props.history.push('/Cart'))

    }
   
    StoreModel=(MBM,MBC,MBI,MBP)=>{
     
        this.setState({MobileColor:MBC,MobileImage:MBI,MobileModel:MBC,MobilePrice:MBP})
        var UN=this.documentData.name;
        var GID=this.documentData.googleId;  
        this.setState({Cart:{UserName:UN,GoogleId:GID,Name:this.props.match.params.name,Model:MBM,Color:MBC,Image:MBI,Price:MBP,Quantity:this.state.Quantity}})
    }

    renderData=(Product)=>{

            if(Product){
                return(
                    Product.map((item)=>{
                        if(this.state.MobileModel==''){
                            this.StoreModel(item.Model[0].Model1,item.Color[0].Color1,item.Image,item.Price[0].Model1)
                        }
                 
                        if(this.state.Color=='Color1'){
                            if(this.state.Price=='Model1'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color1}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                     
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Buy Now
                                            </div>
                                        
                                     
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit(this.state.MobileName,this.state.MobileColor,this.state.MobileModel,this.state.MobilePrice,this.state.MobileImage,this.state.MobileQuantity)}}>
                                                Add to Cart
                                            </div>
                                     
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color1}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                       
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                       
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                      
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model2'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color1}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                          
                                       
                                            <div className='btn btn-primary btn-lg dt-btn'onClick={()=>{this.handleSubmit()}}>
                                                Buy Now
                                            </div>
                               
                                        
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                    
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color1}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                        

                                        
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                    
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                   
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model3'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color1}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                  
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}> 
                                            Buy Now
                                        </div>
                                 
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                        
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color1}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                  
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                 
                               
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                           
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                        }
                        else if(this.state.Color=='Color2'){
                            if(this.state.Price=='Model1'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color2}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img1,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img1,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img1,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                        
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                     
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color2}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                    
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                 
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model2'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color2}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                   
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                    
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color2}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                     
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model3'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color2}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2' ,item.Images[0].color[0].Img1,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img1,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img1,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                     
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color2}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                     
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                      
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                        }
                        else if(this.state.Color=='Color3'){
                            if(this.state.Price=='Model1'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color3}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                    
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color3}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                  
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                    
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model2'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color3}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                    
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color3}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                    
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                   
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model3'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color3}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                 
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                    
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                    
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color3}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1' ,item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                        
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                       
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                        }
                        else if(this.state.Color=='Color4'){
                            if(this.state.Price=='Model1'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color4}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                     
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model1},&nbsp; {item.Color[0].Color4}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model1}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                     
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                  
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                   
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model2'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color4}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Price[0].Model1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Price[0].Model2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Price[0].Model3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Price[0].Model4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                           
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                   
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                            
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model2},&nbsp; {item.Color[0].Color4}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model2}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                 
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                   
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                            else if(this.state.Price=='Model3'){
                                if(item.Color[0].Color4!=null)
                                {  return(
                                        <React.Fragment>
    
                                            <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color4}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1' ,item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4','Color4',item.Images[0].color[0].Img4,item.Color[0].Color4)}}>
                                                {item.Color[0].Color4}
                                                </div>
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt' onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    {this.state.Quantity}
                                            </div>
                                            <div className='dt-quantity-bx-rt'   onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                                     
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                       
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                             
                                    </React.Fragment>
                                    )
                                }
                                else{
                                return(
                                    <React.Fragment>
                                        <div className='dt-main' onClick>
                                            <div className='dt-h1'>
                                            <h1>{item.Name}</h1>
    
                                            </div>
                                            <h4 style={{fontWeight:'lighter'}}>
                                                {item.Model[0].Model3},&nbsp; {item.Color[0].Color4}
                                            </h4>
                                            </div>
    
    
                                            <div className='dt-price'>
                                            &#8377;{item.Price[0].Model3}
                                            </div>
                                            <hr/>
                                            <ul type="square" >
                                                <li className='dt-li'>upto 10% cashback on phone pay</li>
                                                <li className='dt-li'>Cover your phone's screen against accidental & liquid damages with Mi Screen Protect. 2 claims per year!</li>
                                            </ul>
                                        {/* storagee boxes */}
                                        <div>
                                            <h2>Storage</h2>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model1,'Model1',item.Price[0].Model1)}}>
                                                    {item.Model[0].Model1}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model2,'Model2',item.Price[0].Model2)}}>
                                                {item.Model[0].Model2}
                                                </div>
                                                <div className='dt-st' onClick={()=>{this.handleSt(item.Model[0].Model3,'Model3',item.Price[0].Model3)}}>
                                                {item.Model[0].Model3}
                                                </div>
                                        </div>
    
                                            <div>
                                                {/* color boxes */}
                                                <h2>Choose Your Favourite Color</h2>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img1','Color1',item.Images[0].color[0].Img1,item.Color[0].Color1)}}  >
                                                {item.Color[0].Color1}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img2','Color2',item.Images[0].color[0].Img2,item.Color[0].Color2)}}>
                                                {item.Color[0].Color2}
                                                </button>
                                                <button className='dt-color' onClick= {()=>{this.handleImg('Img3','Color3',item.Images[0].color[0].Img3,item.Color[0].Color3)}}>
                                                {item.Color[0].Color3}
                                                </button>
    
                                                {/* <div className='dt-color-lt' onClick= {()=>{this.handleImg('Img4')}}>
                                                {item.Color[0].Color4}
                                                </div> */}
                                            </div>
    
    
    
    
                                        <h3>Quantity</h3>
                                        <div className='dt-quantity-bx'>
                                            <div className='dt-quantity-bx-lt'  onClick={()=>this.handleQt(this.state.Quantity,'sub')}>
                                                    -
                                            </div>
                                            <div className='dt-quantity-bx-lt'>
                                                    1
                                            </div>
                                            <div className='dt-quantity-bx-rt' onClick={()=>this.handleQt(this.state.Quantity,'add')}>
                                                    +
                                            </div>
                                        </div>
                         
                                        <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                            Buy Now
                                        </div>
                                      
                                            <div className='btn btn-primary btn-lg dt-btn' onClick={()=>{this.handleSubmit()}}>
                                                Add to Cart
                                            </div>
                                 
                                        
                                    </React.Fragment>
                                )
    
                                }
                            }
                        }
                       
                       
                    })
                )
            }
    }
    render(){
        console.log('HHHHHHHHHHHHHH',this.state.MobileColor)
    // console.log('it is the Image state',this.state.Image)
      console.log('bandi banid bandi bandi bandi bandi bandi',this.state.Cart.MobileColor)
       
        return(
           <React.Fragment>
               <div className='container-fluid'>
                   <div className='row'>
                       <div className='col-md-6 col-sm-12 col-xs-12'>
                              <div className='im-bx'>
                                    <div className='im-image'>
                                     {this.renderImages(this.state.Image,this.state.name)}
                                    </div>

                            </div>

                       </div>
                       <div className='col-md-6 col-sm-12 col-xs-12'>
                         <div className='dt-bx'>
                         
                           {this.renderData(this.state.Product)}
                         

                         </div>

                       </div>
                   </div>
                   <h1>{this.state.Name}</h1>
               </div>
           </React.Fragment>
        )
    }
}
export default Buying

