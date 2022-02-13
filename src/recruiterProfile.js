import axios from "axios";
import { useState, useEffect,useCallback } from "react";
import { decodeToken, isExpired } from "react-jwt"
import { Url } from "./backend"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Typography from '@mui/material/Typography';

import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell} from "@mui/material"
import { Card, CardMedia, CardContent, } from "@mui/material"

function RecruiterProfile() {
   
    const [applied, setApplied] = useState([])
    const token = localStorage.getItem("clone")
    const [data, setData] = useState([]);
    const myDecodedToken = decodeToken(token);
    const getPosts = useCallback(async () => {
        if (token) {
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            console.log(myDecodedToken.user._id)
            console.log(isMyTokenExpired)
            if (!isMyTokenExpired) {
                const { data } = await axios.get(`${Url.backendUrl}/users/${myDecodedToken.user._id}`)
                console.log(data)
                setData(data)
                setApplied(data.savedList)
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

    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "center", margin:3}}>
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
                    <Typography gutterBottom variant="h5" component="div">Candidate List </Typography>



                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">

                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>List.No</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>Position</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>E-mail</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 20 }}>Mobile No</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applied.map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{row.Name}</TableCell>
                                            <TableCell align="center">{row.appliedPosition}</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">{row.mobileNumber}</TableCell>


                                        </TableRow>
                                    )})}

                            </TableBody>
                        </Table>
                    </TableContainer>



                    
                    
                    </Box>
                    
            </Box>
            </>
         )
    }
                    
export default RecruiterProfile