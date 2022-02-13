
import React from "react";
import { TextField, Box,  Typography,Grid } from "@mui/material";
import axios from "axios";
import { Url } from "./backend"
import login from "./assets/login.jpg"
import { isExpired, decodeToken } from "react-jwt"
import Menubar from "./Menubar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
class postJobs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: "",
            qualification: "",
            minimum: "",
            maximum: "",
            jobDescription: "",
            NatureOfJob: "",
            companyName: "",
            companyWebsite: "",

        }

    }


    Hostjobs = async () => {
        const token = localStorage.getItem("clone")
        const { position, qualification, minimum, maximum, jobDescription, NatureOfJob, companyName, companyWebsite } = this.state
        if (token) {
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken.user._id)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
                const { data } = await axios.post(`${Url.backendUrl}/jobs/post`, {
                    position, qualification, minimum, maximum, jobDescription, NatureOfJob, userId: myDecodedToken.user._id,
                    companyName, companyWebsite
                })
                console.log(data)
                this.setState({ position: "", qualification: "", minimum: "", maximum: "", jobDescription: "", NatureOfJob: "", companyName: "", companyWebsite: "" })
                toast.success("Successfuly Posted")
            }
        }




    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })

    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.Hostjobs()
        console.log(this.state)
    }


    render() {
        return (
            <>
                <Menubar />
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                <Grid sx={{overflow:"hidden",}}>
            <form  onSubmit={this.handleSubmit} >
                <Grid sx={{margin:"5%",position:"absolute",backgroundColor:"white",width:600,borderRadius:5,padding:2,}} item>
                        
                            <Typography sx={{ fontSize: 24, fontWeight: "bold", margin: 2 }}>Post Jobs</Typography>
                           
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="position" value={this.state.position} label="Position" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="companyName" value={this.state.companyName} label="Company Name" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="companyWebsite" value={this.state.companyWebsite} label="Company Website" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="qualification" value={this.state.qualification} label="Qualification" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} type="number" name="minimum" value={this.state.minimum} label="Minimum Experience" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} type="number" name="maximum" value={this.state.maximum} label="Maximum Experience" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-basic" onChange={this.handleChange} name="NatureOfJob" value={this.state.NatureOfJob} label="Nature Of Job" variant="outlined" />
                                <TextField sx={{ margin: 1 }} id="outlined-multiline-static"

                                    multiline
                                    rows={4} onChange={this.handleChange} name="jobDescription" value={this.state.jobDescription} label="Job Description" variant="outlined" />
                                <Box sx={{ display: "flex", alignItems: "centr", justifyContent: "center", margin: 3 }}>
                                    <button>Submit</button>
                                </Box>

                                </Grid>

                                </form>
                
                <img style={{ height:"100vh",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundAttachment:"fixed", }} alt="login" src={login} />
            </Grid>
            </Box>
                <ToastContainer />
            </>
        )

    }
}
export default postJobs