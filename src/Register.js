import React from "react"
import { Box, Typography, TextField,FormControlLabel,Radio,RadioGroup,FormLabel} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Url } from "./backend"
import register from "./assets/register.jpg"
class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",

            email: "",
            mobileno: "",

            password: "",
            recruiter:false

        }
    }
    RegisterUsers = async () => {
        const { name, mobileno, email, password,recruiter } = this.state
        const { data } = await axios.post(`${Url.backendUrl}/users/register`, {
            name, mobileno, email, password, recruiter
        })
        console.log(data.response)
        this.setState({ message: data.message })
        if (data.message === "*successfully registered") {
            this.props.history.push("/login")
        }


    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
         this.RegisterUsers()
        console.log(this.state)
    }

    render() {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                
                    <Box sx={{  position: "absolute", backgroundColor: "white",borderRadius: 5, padding: 2,width:"auto",maxWidth:500 }} >

                        <Box sx={{ display: "flex-inline", }}>
                            <Typography sx={{ fontSize: 24, fontWeight: "bold", margin: 2 }}>Register</Typography>
                            <form onSubmit={this.handleSubmit}>
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="name" value={this.state.name} label="name" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} placeholder="10-digit Mobileno" name="mobileno" value={this.state.mobileno} label="Mobile Number" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} placeholder="abc@123.com" name="email" value={this.state.email} label="Email" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} placeholder="[Aa-Zz] or [1-9] or [both] " name="password" value={this.state.password} label="Password" variant="outlined" />
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{margin: 2}}>Are you a recruiter?</FormLabel>
                                <RadioGroup
                                    row
                                    sx={{marginLeft: 2}}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel onChange={this.handleChange} name="recruiter" value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel onChange={this.handleChange} name="recruiter" value={false} control={<Radio />} label="No" />
                               
                                    
                                </RadioGroup>
                                <Box  sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <button style={{ marginLeft: 75 }} variant="success" >Register</button>
                                </Box>
                               
                            </form>


                            <Typography sx={{ textAlign: "center", margin: 1 }}>Already you have a account?  <Link to={'/login'}>Click Here</Link> for login </Typography>
                            
                           




                        </Box>

                    </Box>

              
                <img style={{height:"100vh",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundAttachment:"fixed", }} alt="register" src={register} />

            </Box>
        )
    }



}
export default Register