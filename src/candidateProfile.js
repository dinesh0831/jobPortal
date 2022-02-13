import axios from "axios";
import { useState, useEffect,useCallback } from "react";
import { decodeToken, isExpired } from "react-jwt"
import { Url } from "./backend"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, } from "@mui/material"
import { Card, CardMedia, CardContent, } from "@mui/material"

function CandidateProfile() {
    const [expanded, setExpanded] = useState(false);
  
    const [applied,setApplied]=useState([])
    const token = localStorage.getItem("clone")
    const [data, setData] = useState([]);
    const myDecodedToken = decodeToken(token);
    const getPosts =useCallback( async () => {
        if (token) {
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken.user._id)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
                const { data } = await axios.get(`${Url.backendUrl}/users/${myDecodedToken.user._id}`)
                console.log(data)
                setData(data)
                setApplied(data.appliedList)
            }
            else{
                window.location.href="/login"
            }
        }
        else{
            window.location.href="/login"
        }
    },[token])

    useEffect(() => {
        getPosts()
    }, [getPosts])


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };




    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "center",margin:3 }}>
                <Card sx={{ width: 250, height: "max-content" }}>

                    <CardMedia sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 100 }} alt="green iguana">
                        <AccountCircleIcon sx={{ fontSize: 64 }} />
                    </CardMedia>

                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography><br />
                        <Typography gutterBottom variant="h6" component="div">{myDecodedToken.user.recruiter?"Recruiter":"Candidate"}</Typography>
                        <Typography variant="body2" color="text.primary">{data.email}</Typography>
                        <Typography variant="body2" color="text.primary">{data.mobileno}</Typography>
                        


                    </CardContent>

                </Card>
            </Box>
            <Box sx={{ marginLeft: 3, }}>

                <Box>
                    <Typography gutterBottom variant="h5" component="div">Applied List </Typography>
                    {applied.map((item,index) => {
                        return (
                            <Accordion key={index} expanded={expanded ===index} onChange={handleChange(index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"

                                >
                                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                                        Position For Applied:{item.position}
                                    </Typography>
                                    <Typography sx={{ marginRight: 2 }}>
                                       Company Name:{item.companyName}
                                    </Typography>
                                    

                                </AccordionSummary>
                                <AccordionDetails>
                                <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Experiance</TableCell>
                                            <TableCell align="center">{item.minimumEx}-{item.maximumEx}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                        <TableCell>Nature Of Job</TableCell>
                                        <TableCell align="center"> {item.NatureOfJob}</TableCell>

                                        </TableRow>
                                        
                                        <TableRow>
                                        <TableCell>Company Website</TableCell>
                                        <TableCell align="center"> {item.companyWebsite}</TableCell>

                                        </TableRow>
                                        <TableRow>
                                        <TableCell>Job Description</TableCell>
                                        <TableCell align="center"> {item.jobDescription}</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    
                                </Table>
                            </TableContainer>
                                    
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}

                </Box>

            </Box>
        </>
    )
}

export default CandidateProfile