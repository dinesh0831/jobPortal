
import {  Box, Typography, TextField,  } from "@mui/material";
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios"
import {Url } from "./backend"
import login from "./assets/login1.jpg"
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
            email:"",
            
            password:"",
            message:""

        }
    }
    logIn=async()=>{
        const {email,password}=this.state
      const {data}=await axios.post(`${Url.backendUrl}/users/login`,{
           email,password

       })
       console.log(data)
       this.setState({message:data.message})
       if(data.message==="*successfully loggedIn")
       {   
          
           
           await localStorage.setItem("clone",data.token)
           window.location.href="/"
           
       }
   }

 
        
    
    handleChange=({target:{name,value}})=>{
        this.setState({[name]:value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.logIn()
        console.log(this.state)
        
    }

 render() {

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
            
                <Box sx={{  position: "absolute", backgroundColor: "white", borderRadius: 5, padding: 2,width:"auto" ,maxWidth:250 }} >

                    <Box sx={{ display: "flex-inline", }}>
                        <Typography sx={{ fontSize: 24, fontWeight: "bold", margin: 2 }}>LogIn</Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField sx={{ margin: 2 }} id="outlined-basic" name="email" value={this.state.email} onChange={this.handleChange} label="Email" variant="outlined" />
                            <TextField sx={{ margin: 2 }} id="outlined-basic"  name="password" value={this.state.password} onChange={this.handleChange} label="Password" variant="outlined" />
                            <Typography sx={{ textAlign: "center",margin:1,color:"red" }}>{this.state.message }</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",}}><button  variant="success">LogIn</button></Box>
                            
                        </form>
                        <Box sx={{margin:2}}>
                            <Typography sx={{textAlign:"center"}}>If you don't have account? <Link to={'/register'}>Click Here</Link> for register </Typography>
                        </Box>

                    </Box>

                </Box>
               
                <img style={{ height:"100vh",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundAttachment:"fixed", }} alt="login" src={login} />

        </Box>
    )

   } 
}
export default Login