import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import GoogleLogin from 'react-google-login'
class NavBar extends React.Component {
    constructor(){
        super()
        this.state={
            User:'',
        }
    }
    responseGoogle=(response)=>{
     
        this.setState({User:response.profileObj});
        console.log('this is the user data',this.state.User)
        var x=response.profileObj.googleId;
     
        localStorage.setItem('document',JSON.stringify(response.profileObj));
        sessionStorage.setItem('GID',x)
        console.log('this is ',response.profileObj.googleId)
      
    }
   
    render(){
    if(this.state.User==''){

        return (
        
            <div className='HEADER'>
            
                        <nav class="navbar navbar" style={{backgroundColor:'transparent',height:'150px'}}>
                            <div class="container-fluid" style={{backgroundColor:"transperant" ,color:'orange'}}>
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle" data-toggle="collapse" style={{backgroundColor:'tomato'}} data-target="#myNavbar">
                                        <span style={{backgroundColor:'white'}} class="icon-bar"></span>
                                        <span style={{backgroundColor:'white'}} class="icon-bar"></span>
                                        <span style={{backgroundColor:'white'}} class="icon-bar"></span>                        
                                    </button>
                                    <a class="" style={{}} href="#">
                                        <div  >
                                        {/* <img src='/images/mihome.png' className='HomeIcon'  /> */}
                                          <Link to='/'>
                                                 <button className='brand' >MI</button> 
                                          </Link>
                                        
                                        </div>
                                    
                                    </a>
                                </div>
                                <div class="collapse navbar-collapse" id="myNavbar">
                                <ul class="nav navbar-nav"style={{color:''}}>
                                    <li class="active dropbtn"><a href="#">MI MOBILES</a></li>
                                    <li class="dropdown">
                                    <a  href="#">REDMI MOBILES </a>
                                  
                                    </li>
                                    <li><a href="#">POCO MOBILES</a></li>
                                   
                                </ul>
                                <ul class="nav navbar-nav navbar-right">
                                    {/* <li> <button className='btn btn-sucess' data-toggle='modal' data-target='sign-in'><a href="#"><span class="glyphicon glyphicon-user" onclick={()=>{this.LoginAccount()}}></span> Sign Up</a></button></li> */}
                                    <li>
                                    <GoogleLogin clientId="893427255421-6n9hvjmricuj4q3jkskhoe8lc03dponn.apps.googleusercontent.com" 
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}/>
                                    </li>
                    
                                    {/* <li><a href="#"><span class="glyphicon glyphicon-log-in" ></span> Login</a></li> */}
                                    
                                </ul>
                               
                                </div>
                            </div>
                        </nav>
    
              
         
         
            </div>
        )
    }
    else{
        return(
            <div className='HEADER'>
                
            <nav class="navbar navbar" style={{backgroundColor:'transparent',height:'150px'}}>
                <div class="container-fluid" style={{backgroundColor:"transperant" ,color:'orange'}}>
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" style={{backgroundColor:'tomato'}} data-target="#myNavbar">
                            <span style={{backgroundColor:'white'}} class="icon-bar"></span>
                            <span style={{backgroundColor:'white'}} class="icon-bar"></span>
                            <span style={{backgroundColor:'white'}} class="icon-bar"></span>                        
                        </button>
                        <a class="" style={{}} href="#">
                            <div  >
                            {/* <img src='/images/mihome.png' className='HomeIcon'  /> */}
                            <button className='brand' >MI</button> 
                            </div>
                        
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav"style={{color:''}}>
                    <li class="active dropbtn"><a href="#">MI MOBILES</a></li>
                                    <li class="dropdown">
                                    <a  href="#">REDMI MOBILES </a>
                                  
                                    </li>
                                    <li><a href="#">POCO MOBILES</a></li>
                    </ul>
                    <div className=''>
                        <img className='PP' src={this.state.User.imageUrl} />
                    
                   
                    </div>
                
                    </div>
                </div>
            </nav>
         </div>
)
    }
    
   
    }
}

export default NavBar
