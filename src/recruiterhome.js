import  axios  from "axios";
import { useState, useEffect,useCallback } from "react";
import { decodeToken, isExpired } from "react-jwt"
import { Url } from "./backend"


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box ,Paper, Table,  TableContainer, TableHead, TableRow, TableCell,Button} from "@mui/material"

function RecruiterHome() {
    const [expanded, setExpanded] = useState(false);
    const token = localStorage.getItem("clone")
    const [data,setData] = useState([]);
    const getPosts =useCallback(async () => {
        if (token) {
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
                const { data } = await axios.get(`${Url.backendUrl}/jobs/getusers/${myDecodedToken.user._id}`)
                setData(data)
                console.log(data)
            }
            else{
                window.location.href="/login"
            }
            
        }
        else{
            window.location.href="/login"
        }
    } 
    ,[token])
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getPosts()
    }, [getPosts])
    const Delete=async(Id)=>{
   
        if (token) {
            console.log(Id)
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
                await axios.delete(`${Url.backendUrl}/jobs/${Id}`)
                const { data } = await axios.get(`${Url.backendUrl}/jobs/getusers/${myDecodedToken.user._id}`)
                setData(data)
                console.log(data)
               
            }
        }
    }


    return (
        <Box sx={{ margin:3}}>
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",margin:3}}><h1>Your Company Job Lists</h1></Box>
        {data.map((item, index) => {
            return (
                <Accordion expanded={expanded === item._id} key={item._id} onChange={handleChange(item._id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '40%', flexShrink: 0 }}>
                           Position: {item.position}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Experiance:{item.minimumEx}-{item.maximumEx}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Qualification</TableCell>
                                        <TableCell align="center">{item.qualification}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                    <TableCell>Nature Of Job</TableCell>
                                    <TableCell align="center"> {item.NatureOfJob}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                    
                                    <TableCell>Company Name</TableCell>
                                    <TableCell align="center"> {item.companyName}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                    <TableCell>Company Website</TableCell>
                                    <TableCell align="center"> {item.companyWebsite}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                    <TableCell>NamJobDescription</TableCell>
                                    <TableCell align="center"> {item.jobDescription}</TableCell>

                                    </TableRow>
                                </TableHead>
                                
                            </Table>
                        </TableContainer>
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",margin:3}}>
                            <Button variant="contained" color="error" onClick={()=>Delete(item._id)}>Delete</Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>

            )

        })}
    </Box >
    )
}
export default RecruiterHome